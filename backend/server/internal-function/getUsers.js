const userdb = require("./addNewUser");

const getUsers = (id) => {
  //find user with status ONLINE
  const users = userdb.users.filter((user) => {
    user.id == id && user.status == "ONLINE";
  });
  return users;
};

module.exports = getUsers;
