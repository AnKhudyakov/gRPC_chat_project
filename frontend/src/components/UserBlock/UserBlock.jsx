import React from 'react';
import styles from './UserBlock.module.scss'
const UserBlock = ({ data, profile = false }) => {
    const { username, id, lastMess = null} = data

    const Content = () => {
        return !profile ? (
            <div className={styles.person}>
                <div className={styles.person__info}>
                    <span className={styles.name}>{username} </span>
                    <span className={styles.id}>ID: {id}</span>
                </div>
                <div className={styles.person__lastMess}>
                    {lastMess}
                </div>
            </div>
        ) : (
            <div className={styles.person + ' ' + styles.profile}>
                <div className={styles.person__info}>
                    <span className={styles.name}>{username} </span>
                    <span className={styles.id}>ID: {id}</span>
                </div>
            </div>
        )
    }
    
    return <Content/>
}

export default UserBlock;
