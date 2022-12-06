import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../app/authSlice";
import styles from "./Auth.module.css";
import { useForm } from "react-hook-form";
import {
  LoginRequest,
  RegisterRequest,
  AuthService,
  TokenResponse,
} from "../../proto/auth_pb";
import { AuthServiceClient } from "../../proto/auth_grpc_web_pb";

export const client = new AuthServiceClient("http://localhost:8080");

export function Auth() {
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
    const registerReq = new RegisterRequest();
    console.log("registerReq", registerReq);
    registerReq.setUsername(e.username);
    registerReq.setPassword(e.password);
    //console.log(client);
    client.register(registerReq, {}, (err, resp) => {
      if (err) throw err;
      console.log("RESPONSE", resp.getMessage());
      //const id = resp.getId();
      //setUser({ id, name, avatar });
    });
  };

  return (
    <div className={styles.container}>
      {!user ? (
        <div>
          <div>Registation</div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <div></div>
      )}
    </div>
  );
}
