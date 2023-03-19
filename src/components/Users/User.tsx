import {NavLink} from "react-router-dom";
import MainPhoto from "../../common/images/960x0.jpg";
import React from "react";
import {UserType} from "../../types/Types";
type UserPropsType = {
    user: UserType
    followingProcess: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
const User = ({user, followingProcess, follow, unfollow}: UserPropsType) => {
    return <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small !== null ? user.photos.small : MainPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingProcess.some(id => id === user.id)}
                                      onClick={() => {
                                          unfollow(user.id)
                                      }}>Unfollow</button> :
                            <button disabled={followingProcess.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id);
                                    }}>Follow</button>
                        }
                    </div>
                    </span>
                    <span>{user.name}</span>
                    <span>{user.status}</span>
                </div>
}
export default User;