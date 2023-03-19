import React from "react";
import {Navigate} from "react-router-dom";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {AppStateType, useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {login} from "../../redux/auth-reducer";

type Props = {}
function LoginForm(props: Props) {
    const {register, handleSubmit} = useForm();
    const captchaURL = useAppSelector((state: AppStateType) => state.auth.captchaURL)
    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        dispatch(login(data.email, data.password,
            data.rememberMe, data.captcha))
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder={'email'} {...register("email", {required: true, maxLength: 25})} />
            <input placeholder={'password'} {...register("password", {required: true, maxLength: 20})} />
            <input type={'checkbox'} {...register("rememberMe", {required: true})} />
            {captchaURL &&
                <img src={captchaURL}/>
            }
            {captchaURL && <input {...register("captcha",
                {required: false, maxLength: 20})} />}
            <input type={'submit'}/>
        </form>
    </div>
}
const Login: React.FC = (props) => {
    const isAuth = useAppSelector((state: AppStateType) => state.auth.isAuth)
    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <div>Login</div>
            <LoginForm />
        </div>
    )
}
export default Login
