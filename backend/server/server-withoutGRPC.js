const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./database.json");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

// Verify the token
function decodeToken(token) {
  // let { head, payload, signature } = jwt.decode(token)
  // switch(payload.iss) {
  //   case "local":
  //     return jwt.verify(token, SECRET_KEY),
  //   case "https://accounts.google.com":
  //     return jwt.verify(token, GOOGLE_KEY),
  // }
  return jwt.verify(token, SECRET_KEY);
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  let counter = 0;
  userdb.users.map((user) => {
    if (user.email === email && user.password === password) {
      counter += 1;
    }
  });
  return counter;
}

// Check if the user exists in database
function isUsernameAlreadyExist(UserEmail) {
  console.log(
    "IS_EMAIL_EXIST",
    userdb.users.filter((user) => user.email === UserEmail).length
  );
  return userdb.users.filter((user) => user.email === UserEmail).length;
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;
  if (isUsernameAlreadyExist(email) > 0) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 500;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = userdb.users[data.users.length - 1].id;

    //Add new user
    data.users.push({ id: last_item_id + 1, email, password }); //add some data
    fs.writeFileSync("./users.json", JSON.stringify(data));
    res.status(200).end();
  });
});

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === 0) {
    const status = 402;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 421;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let { email } = decodeToken(req.headers.authorization.split(" ")[1]);
    req.email = email;
  } catch (err) {
    const status = 421;
    const message = "Error access_token is not valid";
    res.status(status).json({ status, message });
    return;
  }

  next();
});

//google auth, create local token and user
server.post("/auth/google", (req, res) => {
  console.log("POST_GOOGLE_REG", req);
  const { sub, email } = req.body;
  //console.log("GOOGLE_TOKEN:", credential);
  //verify google token
  //let { sub, email } = jwt.verify(
  // credential,
  // "PUBLIC_SECRET_KEY"
  //);
  console.log("GOOGLE email", email);
  if (isUsernameAlreadyExist(email) === 0) {
    //create user in userdb
    console.log("CREATE_USER");
    fs.readFile("./users.json", (err, data) => {
      if (err) {
        const status = 500;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }

      // Get current users data
      var data = JSON.parse(data.toString());

      // Get the id of last user
      var last_item_id = userdb.users[data.users.length - 1].id;

      //Add new user
      data.users.push({ id: last_item_id + 1, email, password: sub }); //add some data
      fs.writeFileSync("./users.json", JSON.stringify(data));
      res.status(200).end();
    });
  }

  //all success, create local token
  const access_token = createToken({ email });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Get chats for User
server.get("/users/chats", (req, res) => {
  console.log("GET_USER_INPROCESS");
  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 500;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    var data = JSON.parse(data.toString());
    console.log("GET_USERS", data);
    res.status(200).json({ data });
  });
});

server.use(router);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
