const userdb = require("./addNewUser");

const findId = (username) => {
  console.log("username", username);
  console.log(
    "filter users",
    userdb.users.filter((user) => {
      user.username === "test";
    })
  );
  const id = userdb.users.filter((user) => {
    user.username === username;
  }).id;
  console.log("id", id);
  return id;
};

module.exports = findId;
