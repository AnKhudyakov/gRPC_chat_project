const logs = require("../helpers/logs");
//const userdb = require("./addNewUser");
const fs = require("fs");

const updateStatusUser = (id) => {
  const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
  const dataUsers = userdb.users.map((user) => {
    if (user.id == id && user.status == "OFFLINE") {
      user.status = "ONLINE";
      return user;
    } 
    return user;
  });
  const users = {
    users: dataUsers
  }
  fs.writeFileSync("./users.json", JSON.stringify(users));
  const usersOnline = users.users.filter(user => user.status === "ONLINE")
  return usersOnline;
};

module.exports = updateStatusUser;
