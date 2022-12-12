import {
  LoginRequest,
  RegisterRequest,
  AuthService,
  TokenResponse,
  StreamRequest,
  StreamMessage,
  UserStreamResponse,
  User,
  MessageRequest,
} from "../proto/auth_pb";
import { AuthServiceClient } from "../proto/auth_grpc_web_pb";
import jwt_decode from "jwt-decode";
import { setUser } from "../app/authSlice";
import { setMessages, setUsers } from "../app/chatSlice";

export const client = new AuthServiceClient("http://localhost:8080");

export const gRPC = {
  Registration(data) {
    const registerReq = new RegisterRequest();
    console.log("registerReq", registerReq);
    registerReq.setUsername(data.username);
    registerReq.setPassword(data.password);
    client.register(registerReq, {}, (err, resp) => {
      if (err) throw err;
      console.log("registerResp", resp.getMessage());
    });
  },
  Login(data, dispatch) {
    //const [user, setUser] = useState({})
    const loginReq = new LoginRequest();
    //console.log("loginReq", loginReq);
    loginReq.setUsername(data.username);
    loginReq.setPassword(data.password);
    //console.log("CLIENT", client);
    client.login(loginReq, {}, (err, resp) => {
      if (err) throw err;
      console.log("RESPONSE Message", resp.getMessage());
      //console.log("RESPONSE", resp);
      //console.log(resp.getAccessToken());
      let userObjectLogin = jwt_decode(resp.getAccessToken());
      //console.log("DecodeToken", userObjectLogin);
      const id = resp.getId();
      const username = data.username;
      dispatch(setUser({ id, username }));
    });
  },
  UserChatStreams(user, dispatch) {
    const chatReq = new StreamRequest();
    chatReq.setId(user.id);

    (() => {
      //console.log("user.id", user.id);
      const chatStream = client.chatStream(chatReq);
      // console.log("chatStream", chatStream.on);
      chatStream.on("data", (response) => {
        console.log("Starting chatStream");
        console.log("STREAM_RESPONSE", response);
        const msgList = response.toObject();
        dispatch(setMessages(msgList));
        console.log("msgList", msgList);
      });
      chatStream.on("status", (status) => {
        console.log("STATUS", status);
      });
    })();

    (() => {
      const userStream = client.userStream(chatReq);

      userStream.on("data", (response) => {
        console.log("Sarting userStream");
        console.log("USER_RESPONSE", response);
        const usersList = response.toObject();
        console.log("UsersList", usersList);
        dispatch(setUsers(usersList.usersList));
      });
    })();
  },
};
