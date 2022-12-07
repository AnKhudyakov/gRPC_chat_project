const userdb = require("./addNewUser");

const updateStatusUser = (id) => {
  const dataUsers = userdb.users.map((user) => {
    if (user.id == id && user.status == "OFFLINE") {
      user.status = "ONLINE";
    } else if (user.id == id && user.status == "ONLINE") {
      user.status = "OFFLINE";
    }
  });
  fs.writeFileSync("./users.json", JSON.stringify(dataUsers));
  return;
};

module.exports = updateStatusUser;
