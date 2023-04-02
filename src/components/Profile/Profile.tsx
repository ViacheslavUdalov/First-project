import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../types/Types";
import {File} from "buffer";

type ProfilePropsType = {
    profile: ProfileType | null
    isOwner: boolean
    savePhoto: (file : File) => void
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    status: string
}
const Profile = ({profile, isOwner, savePhoto,
                     updateStatus, saveProfile, status}: ProfilePropsType) => {
   
    return (
        <div>
            <ProfileInfo profile = {profile} status = {status}
                         isOwner = {isOwner}    />
            {/*<MyPostsContainer/>*/}
        </div>
    )
}

export default Profile;