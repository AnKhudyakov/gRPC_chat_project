//const userdb = require("./addNewUser");
const fs = require("fs");
const getUsers = (id) => {
  //find user with status ONLINE
  const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  const users = userdb.users.filter((user) => {
    return user.id == id && user.status == "ONLINE";
  });
  return users;
};

module.exports = getUsers;
