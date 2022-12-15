import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Message } from "../";
import styles from "./ChatWindow.module.scss";
const ChatWindow = ({data}) => {
  const messages = useSelector((state) => state.chatPage.messages);
  const _user = useSelector((state) => state.authPage.user);
  const [params, setParams] = useSearchParams();
  const chatRoomId = +params.get("chatRoomId");
  return (
    <div className={styles.wrapper} >
      <div className={styles.img}>
        <div className={styles.container} ref={data}>
          {messages.map((data) => {
            if (data.idfrom === chatRoomId && data.idto === _user.id)
              return <Message key={data.id} text={data.message} />;
            if (data.idfrom === _user.id && data.idto === chatRoomId)
              return <Message key={data.id} text={data.message} client />;
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default connect()(ChatWindow);
