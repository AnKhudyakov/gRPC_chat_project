const fs = require("fs");
const logs = require("../helpers/logs");
const Users = require("../bd").Users;

const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

// Check if the user exists in database
function isUsernameAlreadyExist(UserName) {
  return userdb.users.filter((user) => user.username === UserName).length;
}

const addNewUser = (request) => {
  const { username, password } = request;

  const foundId = Users.findId(username);
  console.log("FoundId", foundId);
  //if exist user
  if (foundId) return;
  //create users from db
  Users.create({ username, password, status: "OFFLINE" });
  //check all users from db
  Users.all();

  /*
  if (isUsernameAlreadyExist(username) > 0) {
    return;
  }

  
  fs.readFile("./users.json", (err, data) => {
    // if (err) {
    //   const status = 500;
    //   const message = err;
    //   res.status(status).json({ status, message });
    //   return;
    // }

    // Get current users data
    const dataUsers = JSON.parse(data.toString());
    // Get the id of last user
    const last_item_id = dataUsers.users.length;
    //Add new user
    dataUsers.users.push({
      id: last_item_id + 1,
      username,
      password,
      status: "OFFLINE",
    }); //add some data
    fs.writeFileSync("./users.json", JSON.stringify(dataUsers));
    //console.log(logs.info, "Added new user");
  });*/

  return true;
};

module.exports = addNewUser;
