import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileData from "../ProfileBlock";
import cn from 'classnames';
import ProfileDataForm from "./ProfileBlockEdit";
import {ProfileType} from "../../../types/Types";
import {useAppDispatch} from "../../../redux/redux-store";
import {saveProfile} from "../../../redux/profile-reducer";
import emptyIcon from '../../../common/images/anonymous-user.webp'

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string

}

const ProfileInfo: React.FC<PropsType> = ({profile, isOwner, status}) => {
    let [editMode, setEditMode] = useState(false)
    const dispatch = useAppDispatch()
    if (!profile) {
        return <Preloader/>
    }
    const onSubmit = (formData: any) => {
        dispatch(saveProfile(formData))
                setEditMode(false)
    }
    return (
        <div>
            <div className={cn(s.info)}>
                <div>
                <img className={cn(s.imgs)} src={profile.photos.large || emptyIcon}/>

                <ProfileStatusWithHooks status={status} isOwner = {isOwner} />
                </div>
                {!editMode
                    ? <div className={s.ProfileData}><ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>
                    </div>
                    : <ProfileDataForm onSubmit={onSubmit}
                                                profile={profile}
                    isOwner = {isOwner}/>}

            </div>
        </div>
    )
}
export default ProfileInfo;