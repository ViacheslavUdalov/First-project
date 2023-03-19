import React from "react";
import {useForm} from "react-hook-form";
import {ProfileType} from "../../../types/Types";
import {Input} from "../../../common/FormControls";
type ProfileDataFormProps = {
    profile: ProfileType
    onSubmit: (formData: any) => void
}
const ProfileDataForm: React.FC<ProfileDataFormProps>
    = ({profile, onSubmit}) => {
    const { register, handleSubmit } = useForm({
        defaultValues : {
            aboutMe: profile.aboutMe,
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: profile.contacts
        }
    })
     // console.log(profile.contacts)
    return <form onSubmit={handleSubmit(onSubmit)}>
       <input type='submit'/>
        <div>
            about Me:  <input  {...register("aboutMe", { required: true }) } />
        </div>
        <div>
            Full Name: <input {...register("fullName", { required: true }) } />
        </div>
        <div>
            looking For A Job:
            <input type={'checkbox'} {...register("lookingForAJob", { required: true }) } />
        </div>
        <div>
            looking For A Job Description:
            <textarea {...register("lookingForAJobDescription", { required: false }) } />
        </div>
        <div>
            {Object.entries(profile.contacts).map((contact) => {
                const key = contact[0]
                const value = contact[1]
                // console.log(`${key}: ${value}`);
                return <div key={key}>
                    {/*{key}: <input placeholder={key} {...register("contacts." + key,*/}
                    {/*{ required: false }) } />*/}
                  <Input label={"contacts." + key} register={register} required={false}  placeholder={key}/>
                </div>
            })}
        </div>
    </form>
}
export default ProfileDataForm;