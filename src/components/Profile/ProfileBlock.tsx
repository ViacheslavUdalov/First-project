import React from "react";
import {ProfileType} from "../../types/Types";
import { Button, Space } from 'antd';
import styles from './Profile.module.css';
type ProfileDataProps = {
    isOwner: boolean
    goToEditMode: () => void
    profile: ProfileType
}
const ProfileData: React.FC<ProfileDataProps> = ({isOwner, goToEditMode, profile}) => {
    return <div className={styles.ProfileData}>
        <div className={styles.fullName}>
       <h2> {profile.fullName}</h2>
    </div>
        <div className={styles.info}>
        <div className={styles.unitInfo}>
             {profile.aboutMe}
        </div>
        <div className={styles.unitInfo}>
            {profile.lookingForAJob ? 'Я ищу работу!' : 'Уже работаю!'}
        </div>
        <div className={styles.unitInfo}>
             {profile.lookingForAJobDescription}
        </div>
        {/*<div>*/}
        {/*    <div className={styles.contacts}>My contacts:</div> {Object.entries(profile.contacts).map(contact => {*/}
        {/*        const key= contact[0];*/}
        {/*        const value = contact[1];*/}

        {/*    return <ContactsProfile key={key} contactTitle={key} contactValue={value}/>*/}
        {/*})}*/}
        {/*</div>*/}
        </div>
        <div className={styles.ButtonEdit}>
            {isOwner &&
                <Space wrap>
                    <Button onClick={goToEditMode}>Edit</Button>
                </Space>
            }
        </div>
    </div>
}
type ContactsProfile = {
    contactTitle: string
    contactValue: string
}
const ContactsProfile: React.FC<ContactsProfile> = ({contactTitle, contactValue}) => {
    return <div className={styles.contacts}>{contactTitle}: {contactValue}</div>
}
export default React.memo(ProfileData);