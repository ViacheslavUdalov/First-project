import React from "react";
import {useForm} from "react-hook-form";
import {ProfileType} from "../../../types/Types";
import {Input} from "../../../common/FormControls";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from './ProfileInfo.module.css'
import {Button, Space} from "antd";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {savePhoto} from "../../../redux/profile-reducer";
import {useAppDispatch} from "../../../redux/redux-store";
type ProfileDataFormProps = {
    profile: ProfileType
    onSubmit: (formData: any) => void
    isOwner: boolean
}
const ProfileDataForm: React.FC<ProfileDataFormProps>
    = ({profile, onSubmit, isOwner}) => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit } = useForm({
        defaultValues : {
            aboutMe: profile.aboutMe,
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: profile.contacts
        }
    })
    const savePhotoFile = (e: any) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }
     // console.log(profile.contacts)
    return <form onSubmit={handleSubmit(onSubmit)}>
<div>
    {isOwner &&
        <input type={'file'} onChange={savePhotoFile}/>//
    }
</div>
        <div className={styles.box}>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '85%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField className={styles.inputsInformation} id="outlined-basic" label="aboutMe" variant="outlined"
                       {...register("aboutMe", { required: true }) }
            />
            <TextField id="outlined-basic" label="fullName" variant="outlined"
                       {...register("fullName", { required: true }) }
            />
            <TextField id="outlined-basic" label="lookingForAJob" variant="outlined"
                       {...register("lookingForAJob", { required: false }) }
            />
            <TextField id="outlined-basic" label="lookingForAJobDescription" variant="outlined"
                       {...register("lookingForAJobDescription", { required: false }) }
            />
        </Box>
        </div>
        {/*<div>*/}
        {/*    about Me:  <input  {...register("aboutMe", { required: true }) } />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    Full Name: <input {...register("fullName", { required: true }) } />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    looking For A Job:*/}
        {/*    <input type={'checkbox'} {...register("lookingForAJob", { required: true }) } />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    looking For A Job Description:*/}
        {/*    <textarea {...register("lookingForAJobDescription", { required: false }) } />*/}
        {/*</div>*/}
        <div className={styles.box}>
            {Object.entries(profile.contacts).map((contact) => {
                const key = contact[0]
                const value = contact[1]
                // console.log(`${key}: ${value}`);
                return <div key={key}>
                    {/*{key}: <input placeholder={key} {...register("contacts." + key,*/}
                    {/*{ required: false }) } />*/}
                  {/*<Input label={"contacts." + key} register={register} required={false}  placeholder={key}/>*/}
                    <div>{key}: <TextField id="outlined-basic" label={"contacts." + key} variant="outlined"/></div>
                </div>
            })}
        </div>
        {/*<input type='submit'/>*/}
        <button className={styles.button} type={'submit'}>Save</button>

    </form>
}
export default ProfileDataForm;