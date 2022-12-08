const logs = require("../helpers/logs");
//const userdb = require("./addNewUser");
const fs = require("fs");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

const updateStatusUser = (id) => {
  const dataUsers = userdb.users.map((user) => {
    if (user.id == id && user.status == "OFFLINE") {
      user.status = "ONLINE";
      return user;
    } else if (user.id == id && user.status == "ONLINE") {
      user.status = "OFFLINE";
      return user;
    }
    return user;
  });
  console.log("dataUsers =", dataUsers);
  //fs.writeFileSync("./users.json", JSON.stringify({ users: dataUsers }));
  return;
};

module.exports = updateStatusUser;
