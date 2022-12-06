const assert = require("assert");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const getToken = require("./internal-function/getToken");
const addNewUser = require("./internal-function/addNewUser");
const isAuthenticated = require("./internal-function/isAuthenticated");
const PROTO_PATH = __dirname + "/proto/auth.proto";
const PORT = 9090;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const auth = protoDescriptor.auth;

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
      console.log(`Your server as started on port ${port}`);
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
    access_token: token,
  });
}

function doLogin(call, callback) {
  const { username, password } = call.request;
  //Authenticated user
  if (isAuthenticated({ username, password }) === 0) {
    callback(new Error("Incorrect email or password"));
  }
  //create new Token
  const token = getToken(call.request);
  // response
  callback(null, {
    message: "You logined as " + call.request.username,
    access_token: token,
  });
}

function getServer() {
  const server = new grpc.Server();
  server.addService(auth.AuthService.service, {
    Register: doRegistration,
    Login: doLogin,
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
