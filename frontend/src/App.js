import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  LoginRequest,
  RegisterRequest,
  RefreshRequest,
  AuthService,
  TokenResponse,
} from "./proto/auth_pb";
import { AuthServiceClient } from "./proto/auth_grpc_web_pb";
import { Auth } from "./features/Auth/Auth";
import { Login } from "./features/Login/Login";

//export const client = new AuthServiceClient("http://localhost:8080");

function App() {
  return (
    <div className="App">
      <main>
        <Auth />
        <Login />
      </main>
    </div>
  );
}

export default App;
