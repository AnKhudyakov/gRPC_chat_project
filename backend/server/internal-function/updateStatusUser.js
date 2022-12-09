const logs = require("../helpers/logs");
//const userdb = require("./addNewUser");
const fs = require("fs");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

const updateStatusUser = (id) => {
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
  console.log("dataUsers =", users);
  fs.writeFileSync("./users.json", JSON.stringify(users));
  return;
};

module.exports = updateStatusUser;
