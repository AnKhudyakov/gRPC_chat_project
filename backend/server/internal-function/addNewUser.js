const fs = require("fs");
const logs = require("../helpers/logs");
const Users = require("../bd").Users;

const addNewUser = (request) => {
  const { username, password } = request;

  const foundId = Users.findId(username);
  console.log("FoundId", foundId);
  //if exist user
  if (foundId) return;
  //create users from db
  Users.create({ username, password, status: "OFFLINE" });
  //check all users from db
  Users.all();

  return true;
};

module.exports = addNewUser;
