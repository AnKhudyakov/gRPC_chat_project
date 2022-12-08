import {
  LoginRequest,
  RegisterRequest,
  AuthService,
  TokenResponse,
} from "../proto/auth_pb";
import { AuthServiceClient } from "../proto/auth_grpc_web_pb";

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
  PostLogin(data) {},
};
