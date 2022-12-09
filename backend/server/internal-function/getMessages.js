const fs = require("fs");
const logs = require("../helpers/logs");

const messagedb = JSON.parse(fs.readFileSync("./messages.json", "UTF-8"));

const getMessages = (id) => {
  //console.log(logs.data, "ID", id);
  //find message with userId
  const messages = messagedb.messages.filter((message) => {
    return message.userId == id;
  });
  //console.log(logs.data, "Messages_current_USER", messages);
  return messages;
};

module.exports = getMessages;
