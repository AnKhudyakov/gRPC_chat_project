const jwt = require("jsonwebtoken");
const SECRET_KEY = "123456789";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

const getToken = (request) => {
  const { username } = request;
  const token = createToken({ username });
  //console.log("Access Token:" + token);
  return token;
};

module.exports = getToken;
