import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader";
import TimMorten from '../../../common/images/960x0.jpg';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileData from "../ProfileBlock";
import cn from 'classnames';
import ProfileDataForm from "./ProfileBlockEdit";
import {ProfileType} from "../../../types/Types";
type PropsType = {
    profile: ProfileType | null
    saveProfile: (profile: ProfileType) => {}
    savePhoto : (file: any) => void
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, saveProfile, savePhoto, isOwner, status, updateStatus}) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    const savePhotoFile = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: any) => {
        saveProfile(formData)
                setEditMode(false)
    }

    return (
        <div>
            <div className={cn(s.info)}>
                <div>
                <img className={cn(s.imgs)} src={profile.photos.large || TimMorten}/>
                    {isOwner &&
                        <input type={'file'} onChange={savePhotoFile}/>//
                    }
                <ProfileStatusWithHooks status={status} isOwner = {isOwner} updateStatus={updateStatus}/>
                </div>
                {!editMode
                    ? <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>
                    : <ProfileDataForm onSubmit={onSubmit}
                                                profile={profile}/>}

            </div>
        </div>
    )
}
export default ProfileInfo;