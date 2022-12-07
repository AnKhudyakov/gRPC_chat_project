const fs = require("fs");

const messagedb = JSON.parse(fs.readFileSync("./messages.json", "UTF-8"));

const getMessages = (id) => {
  console.log("ID", id);
  //find message with userId
  const messages = messagedb.messages.filter((message) => {
    return message.userId == id;
  });
  console.log("Messages_current_USER", messages);
  return messages;
};

module.exports = getMessages;
