import {APIResponse, instance, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

export type MeResponseType = {
        id: number
        email: string
        login: string
}
type LoginResponseDataType = {
        userId: number
}
export const authAPI = {
    me() {
        return instance.get<APIResponse<MeResponseType>>('auth/me').then((res) => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false,
          captcha: null | string = null) {
                return instance.post<APIResponse<LoginResponseDataType,
            ResultCodesEnum | ResultCodeForCaptcha>>('auth/login',
            {email, password, rememberMe, captcha}).then((res) => res.data)
    },
    logout() {
        return instance.delete('auth/login')
    }
}