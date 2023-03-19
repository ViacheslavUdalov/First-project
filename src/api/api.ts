import axios from "axios";
import {UserType} from "../types/Types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "62cccde2-b4f1-4a7a-a0be-73094ff4a37b"
    }
})
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
export type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponse<D = {}, RC = ResultCodesEnum | ResultCodeForCaptcha > = {
    data: D
    messages: Array<string>
    resultCode: RC
}