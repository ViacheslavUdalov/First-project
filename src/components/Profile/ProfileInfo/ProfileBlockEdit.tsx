import React, {useRef} from "react";
import {useForm} from "react-hook-form";
import {ProfileType} from "../../../types/Types";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from './ProfileInfo.module.css'
import {savePhoto} from "../../../redux/profile-reducer";
import {useAppDispatch} from "../../../redux/redux-store";
import uploadPhoto from '../../../common/images/upload_file_FILL0_wght500_GRAD0_opsz48.png'
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
    return <div>
        <div>
            {isOwner &&
                <div>
                    <label className={styles.label} htmlFor={'uploader'}>
                        <img className={styles.imgLabel} src={uploadPhoto}/>
                    Загрузить фото</label>
                    <input id={'uploader'} type={'file'}
                           onChange={savePhotoFile}
                           className={styles.ButtonInput}/>
                </div>
            }
        </div><form onSubmit={handleSubmit(onSubmit)}>

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
        <button className={styles.button} type={'submit'}>Save</button>

    </form>
    </div>
}
export default ProfileDataForm;