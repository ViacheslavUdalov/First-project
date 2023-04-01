import React from "react";
import {ProfileType} from "../../types/Types";
import { Button, Space } from 'antd';
type ProfileDataProps = {
    isOwner: boolean
    goToEditMode: () => void
    profile: ProfileType
}
const ProfileData: React.FC<ProfileDataProps> = ({isOwner, goToEditMode, profile}) => {
    return <div>
        {isOwner &&
            <Space wrap>
            <Button onClick={goToEditMode}>Edit</Button>
            </Space>
        }
        <div>
            About me: {profile.aboutMe}
        </div>
        <div>
            fullName: {profile.fullName}
        </div>
        <div>
            looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
            looking for a job: {profile.lookingForAJobDescription}
        </div>
        <div>
            contacts: {Object.entries(profile.contacts).map(contact => {
                const key= contact[0];
                const value = contact[1];

            return <ContactsProfile key={key} contactTitle={key} contactValue={value}/>
        })}
        </div>
    </div>
}
type ContactsProfile = {
    contactTitle: string
    contactValue: string
}
const ContactsProfile: React.FC<ContactsProfile> = ({contactTitle, contactValue}) => {
    return <div>{contactTitle}: {contactValue}</div>
}
export default ProfileData;