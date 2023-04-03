import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {securityAPI} from "../api/securityAPI";
import {authAPI} from "../api/authMe";

const SETUSERDATE = 'SETUSERDATE';
const GET_CAPTCHA = 'GET_CAPTCHA';
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}
type initialType = typeof initialState;
const AuthReducer = (state = initialState, action: ActionsType): initialType => {
    switch (action.type) {
        case SETUSERDATE:
        case GET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
export const actions = {
    setUserData: (userId: number | null, email: string | null,
                  login: string | null, isAuth: boolean) =>
        ({type: SETUSERDATE, payload: {userId, email, login, isAuth}} as const),
    setCaptcha: (captchaURL: string | null) =>
        ({type: GET_CAPTCHA, payload: {captchaURL}} as const)
}

export const setUserProfile = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = data.data;
        dispatch(actions.setUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string,
                      rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {

    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserProfile())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptcha())
        }
    }
}
export const getCaptcha = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.SetCaptcha()
    const captchaURL = data.url
    dispatch(actions.setCaptcha(captchaURL))
}
export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserData(null, null, null, false));
    }
}
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export default AuthReducer;
