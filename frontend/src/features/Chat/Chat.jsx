import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Chat.module.css";
import { client } from "../Auth/Auth";

export function Chat(props) {
  //console.log("props", props);
  return (
    <div className={styles.container}>
      <div className={styles.chatList}>ChatList</div>
      <div className={styles.chatWindow}>
        <div>ChatWindow</div>
        <div>
          {props.msgList.map((msg) => (
            <div key={msg.id}>
              Sender:{msg.senderUsername} Message{msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
