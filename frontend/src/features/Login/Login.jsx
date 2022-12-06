import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../app/authSlice";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import {
  LoginRequest,
  RegisterRequest,
  AuthService,
  TokenResponse,
} from "../../proto/auth_pb";
import { client } from "../Auth/Auth";
import { Chat } from "../Chat/Chat";
import jwt_decode from "jwt-decode";

export function Login() {
  const user = useSelector((state) => state.authPage.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    console.log(e);
    const loginReq = new LoginRequest();
    console.log("loginReq", loginReq);
    loginReq.setUsername(e.username);
    loginReq.setPassword(e.password);
    console.log("CLIENT", client);
    client.login(loginReq, {}, (err, resp) => {
      if (err) throw err;
      console.log("RESPONSE Message", resp.getMessage());
      console.log("RESPONSE", resp);
      console.log(resp.getAccessToken());
      let userObjectLogin = jwt_decode(resp.getAccessToken());
      console.log("DecodeToken", userObjectLogin);
      dispatch(setUser(userObjectLogin.username));
    });
  };

  return (
    <div className={styles.container}>
      {!user ? (
        <div>
          <div>Login</div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
              <input
                className={styles.input}
                placeholder="enter username"
                {...register("username", { required: true })}
              />
              {errors.username && errors.username.type == "required" && (
                <p className={styles.error}>Please enter username</p>
              )}
            </div>
            <div>
              <input
                className={styles.input}
                type="password"
                placeholder="enter password"
                {...register("password", { required: true })}
              />
              {errors.password && errors.password.type == "required" && (
                <p className={styles.error}>Please enter password</p>
              )}
            </div>
            <div>
              <input
                className={styles.input}
                type="submit"
                placeholder="Submit"
              />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <Chat />
        </div>
      )}
    </div>
  );
}
