import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, setMessageReq } from "../../app/chatSlice";
import styles from "./Chat.module.css";
import { client } from "../Auth/Auth";
import { MessageRequest } from "../../proto/auth_pb";
import { ChatList, ChatWindow } from "../../components";
import { useSearchParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs"

export function Chat({ msgList }) {
  const [value, setValue] = useState("");
  const user = useSelector((state) => state.authPage.user);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams()
  const chatRoomId = +params.get('chatRoomId')

  //only for test then test2 send message test
  

  const sendMessageHandler = (e) => {
    e.preventDefault();
    const msgReq = new MessageRequest();
    console.log(msgReq);
    msgReq.setMessage(value);
    msgReq.setIdfrom(user.id);
    msgReq.setIdto(chatRoomId);
    //msgReq.setId(user.id);
    client.sendMessage(msgReq, {}, (err, resp) => {});
    dispatch(
      setMessages({
        id: Math.round(Math.random() * 1000),
        idfrom: user.id,
        idto: chatRoomId,
        message: value,
      })
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.chatList}>
        <div className={styles.userInfo}>
          <h5 className={styles.userInfoTitle}>gRPC Chat</h5>
          <h5 className={styles.userInfoName}>{user.username}</h5>
          <button className={styles.userInfoBtn}>Logout</button>
        </div>
        <ChatList />
      </div>
      <div className={styles.chatWindow}>
        <div className={styles.chatHeader}>
          <h4 className={styles.chatTitle}>Chat</h4>
          <BsThreeDots className={styles.chatSettings}/>
        </div>
        <ChatWindow/>
        <div className={styles.sendMessage}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.msgInput}
          />
          <button className={styles.msgBtn} type="submit" onClick={sendMessageHandler}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
