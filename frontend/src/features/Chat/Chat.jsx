import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, setMessageReq } from "../../app/chatSlice";
import styles from "./Chat.module.css";
import { client } from "../Auth/Auth";
import { MessageRequest } from "../../proto/auth_pb";
import { ChatList, ChatWindow } from "../../components";
import { useSearchParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs"
import { useRef } from "react";
import { useEffect } from "react";

export function Chat({ msgList }) {
  const [value, setValue] = useState("");
  const user = useSelector((state) => state.authPage.user);
  const messages = useSelector((state) => state.chatPage.messages);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams()
  const chatRoomId = +params.get('chatRoomId')
  const chatWindow = useRef()

  //only for test then test2 send message test
  
  useEffect(() => {
    const block = chatWindow.current
    if (!block) return
    block.scrollTop = block.scrollHeight

  }, [chatWindow.current, messages, chatRoomId])
  const sendMessageHandler = (e) => {
    e.preventDefault();
    if(value === '') return
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
    setValue('')
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
        <ChatWindow data={chatWindow} />
        {!chatRoomId ?
          (
            <h1 style={{color: "var(--color-dark-gray)"}}>Please choose a chat room</h1>
          ): 
          <form className={styles.sendMessage} action="" onSubmit={sendMessageHandler}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={styles.msgInput}
            />
            <button className={styles.msgBtn} disabled={value === ''} type="submit"  onSubmit={sendMessageHandler}>
              Send
            </button>
          </form>
        }
      </div>
    </div>
  );
}
