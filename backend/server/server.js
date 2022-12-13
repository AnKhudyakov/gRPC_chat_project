const assert = require("assert");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const getToken = require("./internal-function/getToken");
const addNewUser = require("./internal-function/addNewUser");
//const isAuthenticated = require("./internal-function/isAuthenticated");
const getMessages = require("./internal-function/getMessages");
const updateStatusUser = require("./internal-function/updateStatusUser");
const sendMessage = require("./internal-function/sendMessage");
const PROTO_PATH = __dirname + "/proto/auth.proto";
const PORT = 9090;
//const findId = require("./internal-function/findId");
const _ = require("lodash");
const logs = require("./helpers/logs");
//const { ClientDuplexStreamImpl } = require("@grpc/grpc-js/build/src/call");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const auth = protoDescriptor.auth;
const Users = require("./bd").Users;
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
  const isAuthenticated = Users.findUser(username, password);
  if (!isAuthenticated) {
    callback(new Error("Incorrect email or password"));
  }
  // find Id
  const { id } = Users.findId(username);
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
  if (!id) return call.end();
  console.log(logs.data, "ID_USER_STREAM:", id);
  // change Status Online
  Users.UpdateStatus(id);
  const online = Users.findOnline();
  call.write({ users: online });

  if (userStreamClients.get(id) === undefined) {
    userStreamClients.set(id, call);
  }
  //send usersList all the users in Map
  for (let [userId, userCall] of userStreamClients) {
    if (userId != id) {
      console.log(logs.data, "usersNew:", online);
      userCall.write({ users: online });
    }
  }
  call.on("cancelled", () => {
    userStreamClients.delete(id);
  });
}

function doChatStream(call) {
  //id == idTo
  const { id } = call.request;
  console.log(logs.data, "ID_CHAT_STREAM:", id);
  if (!id) return call.end();

  if (msgStreamClients.get(id) === undefined) {
    msgStreamClients.set(id, call);
  }
  // get messages list
  // const messages = getMessages(id);
  const messages = getMessages(id);
  for (const [userId, userCall] of msgStreamClients) {
    if (userId == id) {
      //send msg reciver
      console.log(logs.data, "messages:", messages);
      userCall.write({ messages: messages });
    }
  }
  call.on("cancelled", () => {
    msgStreamClients.delete(id);
  });
}

function doSendMessage(call, callback) {
  //id == idTo
  const { idFrom, idTo, message } = call.request;

  const messagedb = sendMessage(idFrom, idTo, message);
  console.log("MsgsDB with last msg", messagedb);

  for (let [userId, userCall] of msgStreamClients) {
    if (userId == idTo) {
      const callTo = msgStreamClients.get(userId);
      doChatStream(callTo);
    }
  }

  callback(null);
}
function getServer() {
  const server = new grpc.Server();
  server.addService(auth.AuthService.service, {
    Register: doRegistration,
    Login: doLogin,
    UserStream: doUserStream,
    ChatStream: doChatStream,
    SendMessage: doSendMessage,
  });
  return server;
}
main();
