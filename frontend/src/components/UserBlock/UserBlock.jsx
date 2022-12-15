import React from 'react';
import styles from './UserBlock.module.scss'
const UserBlock = ({ data, profile = false }) => {
    const { username, id, active} = data

    const Content = () => {
        return !profile ? (
            <div className={`${styles.person} ${active ? styles.person_active : ''}`}>
                <div className={styles.img_container}>
                    <img src="/blank-profile-picture.png" alt="profile picture" />
                </div>
                <div className={styles.person__info}>
                    <span className={styles.name}>{username}</span>
                    <span className={styles.id}>#{id}</span>
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
