import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileData from "../ProfileBlock";
import cn from 'classnames';
import ProfileDataForm from "./ProfileBlockEdit";
import {ProfileType, UserType} from "../../../types/Types";
import {useAppDispatch, useAppSelector} from "../../../redux/redux-store";
import {saveProfile} from "../../../redux/profile-reducer";
import emptyIcon from '../../../common/images/anonymous-user.webp'
import styles from "../Profile.module.css";
import {actions, follow, getMyFriends, unfollow} from "../../../redux/user-reducer";
import {getCurrentPage, getCurrentUser, getFriends, getTotalFriend, getUsersState} from "../../Users/users-selector";
import {NavLink} from "react-router-dom";
import {Button, Pagination, PaginationProps, Space} from "antd";

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string

}

const ProfileInfo: React.FC<PropsType> = ({profile, isOwner, status}) => {
    let [editMode, setEditMode] = useState(false)
    const friends = useAppSelector(getFriends)
    const totalFriends = useAppSelector(getTotalFriend)
    const currentPage = useAppSelector(getCurrentPage)
    const pageSize = 10
    const users = useAppSelector(getUsersState)
    const currentUser = useAppSelector(getCurrentUser)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getMyFriends(currentPage, pageSize, true))
    }, [])
    useEffect(() => {
        dispatch(actions.setCurrentUser(currentUser))
        console.log(currentUser)
    }, [currentUser?.followed])
    useEffect(() => {
        dispatch(actions.setCurrentUser(currentUser))
        console.log(currentUser)
    }, [])
    const onPageChanged: PaginationProps['onChange'] = (pageNumber: number) => {
        dispatch(getMyFriends(pageNumber, pageSize, true))
    }
    if (!profile) {
        return <Preloader/>
    }
    const onSubmit = (formData: any) => {
        dispatch(saveProfile(formData))
        setEditMode(false)
    }
    const Unfollow = (userId: number) => {
        dispatch(unfollow(userId))
        console.log('unfollowing')
    }
    const Follow = (userId: number) => {
        dispatch(follow(userId))
        console.log('following')
    }
    const SetCurrentUser = (user: UserType) => {
        dispatch(actions.setCurrentUser(user))
        console.log(currentUser)
    }
    // console.log(currentUser)
    return (
        <div>
            <div className={cn(s.info)}>
                <div>
                    <img className={cn(s.imgs)} src={profile.photos.large || emptyIcon}/>
                    <ProfileStatusWithHooks status={status} isOwner={isOwner}/>
                </div>
                {!editMode
                    ? <div className={s.ProfileData}><ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>
                    </div>
                    : <ProfileDataForm onSubmit={onSubmit}
                                       profile={profile}
                                       isOwner={isOwner}/>
                }
            </div>
            {!isOwner && currentUser &&
                <div className={styles.buttons}>
                                     <span className={styles.YourFriend}>
                            {currentUser.followed ? <span>Ваш друг</span> :
                                <span>Не ваш друг</span>}
</span>
                    {currentUser.followed ?
                        <Space>
                            <Button type="primary" danger
                                    onClick={() => {
                                        Unfollow(currentUser.id)
                                    }}>Удалить из друзей</Button>
                        </Space>
                   :
                        <Space>
                            <Button type="primary"
                                    onClick={() => {
                                        Follow(currentUser.id)
                                    }}>Добавить в друзья</Button>
                        </Space>
                    }
                </div>
            }
            {!friends && <Preloader/>}
            <div className={styles.Friends}>
                {isOwner && users.map((followedUser: UserType) =>
                        followedUser.followed &&
                        <div key={followedUser.id}>
                            <>
                                {!friends ? <Preloader/> :
                                    <div className={styles.OneFriendList}>
                                        <div>
                                            <NavLink to={'/profile/' + followedUser.id}
                                                     onClick={() => SetCurrentUser(followedUser)}
                                                     className={styles.navLink}>
                                                <img src={followedUser.photos.large ? followedUser.photos.large : emptyIcon}
                                                     style={{width: '30px', borderRadius: '50%'}}/>
                                                <span className={styles.name}>
                {followedUser.name}
                                </span>
                                            </NavLink>
                                            <span className={styles.status}>
                            {followedUser.status}
                                        </span>
                                        </div>
                                        <div className={styles.buttons}>
                                     <span className={styles.YourFriend}>
                            {followedUser.followed ? <span>Ваш друг</span> :
                                <span>Больше не ваш друг</span>}
</span>
                                            {followedUser.followed ?
                                                <Space className={styles.followed}>
                                                    <Button type="primary" danger
                                                            onClick={() => {
                                                                Unfollow(followedUser.id)
                                                            }}
                                                    >Удалить из друзей</Button>
                                                </Space> :
                                                <Space>
                                                    <Button type="primary"
                                                            onClick={() => {
                                                                Follow(followedUser.id)
                                                            }}>Добавить в друзья</Button>
                                                </Space>
                                            }
                                        </div>
                                    </div>
                                }
                                <hr/>
                            </>
                        </div>
                )
                }
                {isOwner &&
                    <div className={styles.paginator}>
                        <Pagination
                            total={totalFriends}
                            pageSize={pageSize}
                            defaultCurrent={currentPage}
                            onChange={onPageChanged}/>
                    </div>
                }
            </div>
        </div>
    )
}
export default React.memo(ProfileInfo);