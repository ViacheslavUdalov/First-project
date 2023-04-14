import React from "react";
import {Navigate} from "react-router-dom";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {AppStateType, useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {login} from "../../redux/auth-reducer";
import styles from './Login.module.css'
type Props = {}
function LoginForm(props: Props) {
    const {register, handleSubmit} = useForm();
    const captchaURL = useAppSelector((state: AppStateType) => state.auth.captchaURL)
    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        dispatch(login(data.email, data.password,
            data.rememberMe, data.captcha))
    }
    return <div >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
                className={styles.inputs} placeholder={'email'}
                {...register("email", {required: true, maxLength: 25})} /> <br />
            <input className={styles.inputs} placeholder={'password'}
                   {...register("password", {required: true, maxLength: 20})} />
            <div className={styles.checkbox}>
            <input type={'checkbox'} {...register("rememberMe", {required: true})}
            className={styles.check}/>
            Remember me
            </div>
            {captchaURL &&
                <img src={captchaURL}/>
            }
            {captchaURL && <input {...register("ogcaptcha",
                {required: false, maxLength: 20})} />}
            <input type={'submit'} className={styles.button}/>
        </form>
    </div>
}
const Login: React.FC = (props) => {
    const isAuth = useAppSelector((state: AppStateType) => state.auth.isAuth)
    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={styles.loginBlock}>
            <div className={styles.login}>Login</div>
            <LoginForm />
        </div>
    )
}
export default React.memo(Login);
