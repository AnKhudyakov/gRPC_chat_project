const userdb = require("./addNewUser");
const fs = require('fs')
const updateStatusUser = (id) => {
  const dataUsers = userdb.users.map((user) => {
    if (user.id == id && user.status == "OFFLINE") {
      user.status = "ONLINE";
      return user
    } else if (user.id == id && user.status == "ONLINE") {
      user.status = "OFFLINE";
      return user
    }
    return user;
  });
  fs.writeFileSync("./users.json", JSON.stringify(dataUsers));
  return
};

module.exports = updateStatusUser;
