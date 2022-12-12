import React from 'react';
import styles from './Message.module.scss';

const Message = ({ client, text }) => {
    return (
        <div className={`${styles.message} ${client ? styles.message_client : ''}`}>
            <p className={styles.message__text}>{text}</p>
        </div>
    );
}

export default Message;
