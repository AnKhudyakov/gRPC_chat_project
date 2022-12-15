import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../app/authSlice";
import { setMessages, setUsers } from "../../app/chatSlice";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
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
} from "../../proto/auth_pb";
import { client } from "../Auth/Auth";
import { Chat } from "../Chat/Chat";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { gRPC } from "../../api/gRPC";

export function Login() {
  const msgList = useSelector((state) => state.chatPage.messages);
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
    //console.log(e);
    gRPC.Login(e, dispatch);
  };

  useEffect(() => {
    if (!user) return;
    console.log("USER", user);
    gRPC.UserChatStreams(user, dispatch);
  }, [user]);

  return (
    <div className={styles.wrapper_img}>
      <div className={styles.back_img}>
        <div className={styles.container}>
          {!user ? (
            <div className={styles.wrapper}>
              <h2>gRPC Chat</h2>
              <div className={styles.title}>Login</div>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div>
                  <input
                    defaultValue={"test"}
                    className={styles.input}
                    placeholder="enter username"
                    {...register("username", { required: true })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <p className={styles.error}>Please enter username</p>
                  )}
                </div>
                <div>
                  <input
                    defaultValue={"test"}
                    className={styles.input}
                    type="password"
                    placeholder="enter password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className={styles.error}>Please enter password</p>
                  )}
                </div>
                <div>
                  <input
                    className={styles.button}
                    type="submit"
                    placeholder="Submit"
                  />
                </div>
              </form>
              <div>
                Don't have an account? <Link to="registration">Register</Link>
              </div>
            </div>
          ) : (
            <div>
              <Chat msgList={msgList} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
