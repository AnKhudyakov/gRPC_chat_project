const fs = require("fs");
const logs = require("../helpers/logs");

const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

// Check if the user exists in database
function isUsernameAlreadyExist(UserName) {
  console.log(
    logs.data,
    "IS_USERNAME_EXIST",
    userdb.users.filter((user) => user.username === UserName).length
  );
  return userdb.users.filter((user) => user.username === UserName).length;
}

const addNewUser = (request) => {
  const { username, password } = request;
  console.log(logs.data, "REQUEST", request);
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
    //console.log(logs.data, "dataUsers", dataUsers);
    // Get the id of last user
    const last_item_id = dataUsers.users.length;
    //console.log("ID", last_item_id);
    //Add new user
    dataUsers.users.push({
      id: last_item_id + 1,
      username,
      password,
      status: "OFFLINE",
    }); //add some data
    fs.writeFileSync("./users.json", JSON.stringify(dataUsers));
    //console.log(logs.info, "Added new user");
  });

  return true;
};

module.exports = addNewUser;
//module.exports = userdb;
