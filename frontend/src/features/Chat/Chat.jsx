import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Chat.module.css";
import { client } from "../Auth/Auth";

export function Chat() {
  return (
    <div className={styles.container}>
      <div className={styles.chatList}>ChatList</div>
      <div className={styles.chatWindow}>ChatWindow</div>
    </div>
  );
}
