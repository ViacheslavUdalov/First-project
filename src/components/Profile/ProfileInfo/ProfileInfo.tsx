import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileData from "../ProfileBlock";
import cn from 'classnames';
import ProfileDataForm from "./ProfileBlockEdit";
import {ProfileType, UserType} from "../../../types/Types";
import {AppStateType, useAppDispatch, useAppSelector} from "../../../redux/redux-store";
import {saveProfile} from "../../../redux/profile-reducer";
import emptyIcon from '../../../common/images/anonymous-user.webp'
import styles from "../Profile.module.css";
import {actions, getUsers} from "../../../redux/user-reducer";
import User from "../../Users/User";
import {getUsersState} from "../../Users/users-selector";

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string

}

const ProfileInfo: React.FC<PropsType> = ({profile, isOwner, status}) => {
    let [editMode, setEditMode] = useState(false)
    const users = useAppSelector(getUsersState)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUsers(null, null, {term: '', friend: true}))
    }, [])
    if (!profile) {
        return <Preloader/>
    }

    const onSubmit = (formData: any) => {
        dispatch(saveProfile(formData))
        setEditMode(false)
    }
    // const result: UserType[] = []
    //     users.map((u: UserType) => {
    //             if (u.followed === true) {
    //                 result.push(u)
    //                 return result
    //             }
    //             return
    //         }
    //     )
    //  console.log(result)
    return (
        <div>
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
                                           isOwner={isOwner}/>}
                </div>
            </div>
            <div className={styles.Friends}>

                {users.map((followedUser: UserType) =>
                    <>
                    <div>

                    <img src={followedUser.photos.large ? followedUser.photos.large :emptyIcon}
                         style={{width: '30px'}}/>
                {followedUser.name}
                    </div>
                    </>
                )
                }
            </div>
        </div>
    )
}
export default ProfileInfo;