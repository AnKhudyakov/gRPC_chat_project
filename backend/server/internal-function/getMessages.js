const messagedb = require("./addNewUser");

const getMessages = (id) => {
  //find message with userId
  const messages = messagedb.messages.filter((message) => {
    message.userId == id;
  });
  return messages;
};

module.exports = getMessages;
