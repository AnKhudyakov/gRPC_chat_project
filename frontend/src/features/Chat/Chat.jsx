import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, setMessageReq } from "../../app/chatSlice";
import styles from "./Chat.module.css";
import { client } from "../Auth/Auth";
import { MessageRequest } from "../../proto/auth_pb";
import { ChatList, ChatWindow } from "../../components";
import { useSearchParams } from "react-router-dom";

export function Chat({ msgList }) {
  const [value, setValue] = useState("");
  const user = useSelector((state) => state.authPage.user);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams()
  const chatRoomId = +params.get('chatRoomId')

  //only for test then test2 send message test
  

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
        ChatList
        <ChatList />
      </div>
      <div className={styles.chatWindow}>
        <div>ChatWindow</div>
        <ChatWindow/>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="sendMessage"
          />
          <button type="submit" onClick={sendMessageHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
