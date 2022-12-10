const fs = require("fs");
const getUsers = require("./getUsers");
const messagedb = JSON.parse(fs.readFileSync("./messages.json", "UTF-8"));


const sendMessage = (id, message) => {
  console.log("ID", id, message);
  const users = getUsers(id)
  const name = users[0].username
  console.log("USER WRITING", name)
  //add message to db
    messagedb.messages.push({
    id: Math.round(Math.random()*1000),
    userId: id,
    sender_username: name,
    message: message,
  })
  fs.writeFileSync("messages.json", JSON.stringify(messagedb))
  return messagedb
};

module.exports = sendMessage;