const assert = require("assert");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const getToken = require("./internal-function/getToken");
const addNewUser = require("./internal-function/addNewUser");
const isAuthenticated = require("./internal-function/isAuthenticated");
const getUsers = require("./internal-function/getUsers");
const getMessages = require("./internal-function/getMessages");
const updateStatusUser = require("./internal-function/updateStatusUser");
const PROTO_PATH = __dirname + "/proto/auth.proto";
const PORT = 9090;
const findId = require("./internal-function/findId");
const _ = require("lodash");
const logs = require("./helpers/logs");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const auth = protoDescriptor.auth;

const msgStreamClients = new Map();
const userStreamClients = new Map();

function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(logs.supreme, `Your server as started on port ${port}`);
      server.start();
    }
  );
  // runStreams();
}

function doRegistration(call, callback) {
  //console.log(call);

  //add new User
  const user = addNewUser(call.request);
  // if user in db
  if (!user) {
    callback(new Error("User already existed"));
  }
  //create new Token
  const token = getToken(call.request);
  //response
  callback(null, {
    message: call.request.username + "! Your registation Success!",
  });
}

function doLogin(call, callback) {
  const { username, password } = call.request;
  //Authenticated user
  if (isAuthenticated({ username, password }) === 0) {
    callback(new Error("Incorrect email or password"));
  }
  // find Id
  const id = findId(username);
  //create new Token
  const token = getToken(call.request);
  // response
  callback(null, {
    message: "You logined as " + call.request.username,
    id,
    access_token: token,
  });
}
function doUserStream(call) {
  const { id } = call.request;
  console.log(logs.data, "ID_USER_STREAM:", id);
  if (!id) return call.end();
  // change Status Online
  updateStatusUser(id);
  // get Users list
  const users = getUsers(id);
  console.log(logs.data, "Updated user status", users);
  call.write({ users });
}

function doChatStream(call) {
  const { id } = call.request;
  console.log(logs.data, "ID_CHAT_STREAM:", id);
  if (!id) return call.end();
  // change Status Online
  //updateStatusUser(id);
  // get Users list
  const messages = getMessages(id);
  //console.log(messages);
  //console.log(call);
  for (let [userId, userCall] of msgStreamClients) {
    if (userId != id) {
      for (let msg of messages) {
        console.log(logs.data, "messages:", msg);
        userCall.write(msg);
      }
    }
  }
  if (msgStreamClients.get(id) === undefined) {
    msgStreamClients.set(id, call);
    console.log("MAPMSGS", msgStreamClients);
  }

  // findUser (id, (user)=>{
  //   updateStatusUser(id)
  //   getMessages(id)
  // })
}

function getServer() {
  const server = new grpc.Server();
  server.addService(auth.AuthService.service, {
    Register: doRegistration,
    Login: doLogin,
    UserStream: doUserStream,
    ChatStream: doChatStream,
  });
  return server;
}
/*
function runStreams() {
    listenMainRoomChatUpdate((data, channel) => {
      const msg = JSON.parse(data)
      for (const [, stream] of userIdToMsgStream) {
        stream.write(msg);
      }
    });
    listenUserUpdateEvent(() =>
      listUsers((err, users) => {
        if (err) throw err;
        for (const [, stream] of userIdToUserListStream) {
          stream.write({ users });
        }
      })
    );
  }
*/

main();
