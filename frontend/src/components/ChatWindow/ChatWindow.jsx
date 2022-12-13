import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {Message} from '../'
import styles from './ChatWindow.module.scss'
const ChatWindow = () => {
    const messages = useSelector(state => state.chatPage.messages)
    const _user = useSelector(state => state.authPage.user)
    const [params, setParams] = useSearchParams()
    const chatRoomId = +params.get('chatRoomId')
    console.log("messages: ", messages)
    useEffect(() => console.log('REDUX UPDATE'), [messages])
    return (
        <div className={styles.container}>
            {messages.map(data => {
                if(data.idfrom === chatRoomId && data.idto === _user.id) return <Message key={data.id} text={data.message}/>
                if (data.idfrom === _user.id && data.idto === chatRoomId) return <Message key={data.id} text={data.message} client />
                return null
            })}
        </div>
    );
}

export default connect()(ChatWindow);
