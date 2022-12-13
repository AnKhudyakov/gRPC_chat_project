import React from 'react';
import { useSelector } from 'react-redux';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import UserBlock from '../UserBlock/UserBlock';
import styles from './ChatList.module.scss'

const ChatList = () => {
    const _user = useSelector(state => state.authPage.user)
    const onlineUsers = useSelector(state => state.chatPage.users)
    const users = onlineUsers.filter(user => user.id !== _user.id)
    const [params, setParams] = useSearchParams({})
    return (
        <div className={styles.container}>
            <ul className={styles.chatList}>
                {users
                    ? users.map((user, i) => (
                        <li className={styles.chatList_item} onClick={() => setParams({chatRoomId: user.id})} key={`KEY: ${i}`}>
                            <UserBlock data={user} />
                        </li>
                    ))
                    : null
                }
            </ul>
        </div>
    );
}

export default ChatList;
