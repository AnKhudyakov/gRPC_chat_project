const logs = require("../helpers/logs");
//const userdb = require("./addNewUser");
const fs = require("fs");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

const findId = (username) => {
  const [{ id }] = userdb.users.filter((user) => {
    return user.username == username;
  });

  return id;
};

module.exports = findId;
