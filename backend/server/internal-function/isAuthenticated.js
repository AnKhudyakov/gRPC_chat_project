//const fs = require("fs");
const userdb = require("./addNewUser");
//const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

const isAuthenticated = ({ username, password }) => {
  let counter = 0;
  userdb.users.map((user) => {
    if (user.username === username && user.password === password) {
      counter += 1;
    }
  });
  //console.log("ISAUTH:", counter);
  return counter;
};
module.exports = isAuthenticated;
