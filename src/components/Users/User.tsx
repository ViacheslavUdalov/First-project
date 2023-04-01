import {NavLink} from "react-router-dom";
import React from "react";
import {UserType} from "../../types/Types";
import styles from './Users.module.css'
import emptyIcon from '../../common/images/anonymous-user.webp'
import {Button, Space} from 'antd';

type UserPropsType = {
    user: UserType
    followingProcess: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
const User = ({user, followingProcess, follow, unfollow}: UserPropsType) => {
    return <div className={styles.wholeUser}>
                <div>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small !== null ? user.photos.small : emptyIcon}
                            className={styles.userImg}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ?
                            <Space>
                                <Button type="primary" danger
                                        disabled={followingProcess.some(id => id === user.id)}
                                        onClick={() => {
                                            unfollow(user.id)
                                        }}>Удалить из друзей</Button>
                            </Space>:
                            <Space>
                                <Button type="primary"
                                        disabled={followingProcess.some(id => id === user.id)}
                                        onClick={() => {
                                            follow(user.id);
                                        }}>Добавить в друзья</Button>
                            </Space>
                        }
                    </div>
                    </div>
        <div>
                    <h3 className={styles.userName}>{user.name}</h3>
                    <span className={styles.userStatus}>{user.status}</span>
        </div>
                </div>
}
export default User;
// <button disabled={followingProcess.some(id => id === user.id)}
//         onClick={() => {
//             unfollow(user.id)
//         }}>Удалить из друзей</button>