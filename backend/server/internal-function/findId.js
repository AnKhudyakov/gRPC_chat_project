const userdb = require("./addNewUser");

const findId = (username) => {
  console.log("username", username);
  //
  const [{ id }] = userdb.users.filter((user) => {
    return user.username == username;
  });

  //console.log("id", id);
  return id;
};

module.exports = findId;
