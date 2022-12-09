import {
  LoginRequest,
  RegisterRequest,
  AuthService,
  TokenResponse,
} from "../proto/auth_pb";
import { AuthServiceClient } from "../proto/auth_grpc_web_pb";
import jwt_decode from "jwt-decode";
import { setUser } from "../app/authSlice";

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
      //user = setUser({ id, username });
      dispatch(setUser({ id, username }));
    });
  },
};
