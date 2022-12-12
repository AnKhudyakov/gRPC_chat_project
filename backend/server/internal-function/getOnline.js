const fs = require("fs");
const logs = require("../helpers/logs");


const getOnline = () => {
  const db = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  const { users } = db;
  const usersOnline = users.filter((user) => user.status === "ONLINE");
  return usersOnline;
};
module.exports = getOnline;
