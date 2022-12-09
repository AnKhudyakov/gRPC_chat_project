import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  //const [msgList, setMsgList] = useState([]);
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
    const chatReq = new StreamRequest();
    (() => {
      chatReq.setId(user.id);
      //console.log("user.id", user.id);
      const chatStream = client.chatStream(chatReq);
      //console.log("chatStream", chatStream.on);
      //console.log("Starting chatStream");
      chatStream.on("data", (response) => {
        console.log("STREAM_RESPONSE", response);
        const msgList = response.toObject();
        //setMsgList((prev) => [...prev, msgList]);
        dispatch(setMessages(msgList));
        console.log("msgList", msgList);
      });
      chatStream.on("status", (status) => {
        console.log("STATUS", status);
      });
      // setMsgList((prev) => [...prev, msgList]);
      // dispatch(setMessages(msgList));
    })();

    (() => {
      const userListStream = client.userStream(chatReq);
      console.log("Starting userStream");
      userListStream.on("data", (response) => {
        console.log("STREAM_RESPONSE_USER", response);
        const { usersList } = response.toObject();
        console.log("usersList", usersList);
        //dispatch(setUsers(usersList));
      });
    })();
  }, [user]);

  return (
    <div className={styles.container}>
      {!user ? (
        <div>
          <div>Login</div>
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
                className={styles.input}
                type="submit"
                placeholder="Submit"
              />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <Chat msgList={msgList} />
        </div>
      )}
    </div>
  );
}
