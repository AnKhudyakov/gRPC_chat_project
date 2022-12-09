import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../../app/chatSlice"
import styles from "./Chat.module.css";
import { client } from "../Auth/Auth";
import { MessageRequest } from "../../proto/auth_pb"

export function Chat({msgList}) {

  const [value, setValue] = useState("")
  const user = useSelector((state) => state.authPage.user)
  const dispatch = useDispatch()

  const sendMessageHandler = (e) => {
    e.preventDefault()
    const msgReq = new MessageRequest()
    console.log(msgReq)
    msgReq.setMessage(value)
    msgReq.setId(user.id)
    client.sendMessage(msgReq, {} , (err,resp) => {})
    dispatch(setMessages({
      id: Math.round(Math.random()*1000),
      senderUsername: user.username,
      message: value,
    }))
  }


  return (
    <div className={styles.container}>
      <div className={styles.chatList}>ChatList</div>
      <div className={styles.chatWindow}>
        <div>ChatWindow</div>
        <div>
          {msgList.map((msg) => (
            <div className={styles.message} key={msg.id}>
              <div>
                Sender:{msg.senderUsername} 
              </div>
              <div>
                Message{msg.message}
              </div>
            </div>
          ))}
        </div>
        <div>
          <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          className="sendMessage"
          />
          <button 
          type="submit"
          onClick={sendMessageHandler}  
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}
