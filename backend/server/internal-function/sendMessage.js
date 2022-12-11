const fs = require("fs");
const getUsers = require("./getUsers");

const sendMessage = (idFrom, idTo, message) => {
const messagedb = JSON.parse(fs.readFileSync("./messages.json", "UTF-8"));
  console.log("ID", idFrom, idTo, message);
  //const users = getUsers(id)
  //const name = users[0].username
  //console.log("USER TO", name);
  //add message to db
  messagedb.messages.push({
    id: Math.round(Math.random() * 1000),
    idFrom: idFrom,
    idTo: idTo,
    message: message,
  });
  fs.writeFileSync("messages.json", JSON.stringify(messagedb, null, "\t"));
  return messagedb;
};

module.exports = sendMessage;
