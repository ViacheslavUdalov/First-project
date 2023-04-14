import {PhotosType, Posts, ProfileType} from "../types/Types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {ProfileAPI} from "../api/ProfileAPI";
import {getMyFriends, getUsers} from "./user-reducer";
import {userAPI} from "../api/UsersAPI";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO';
export type initialStateType = typeof initialState;

let initialState = {
    posts: [
        {id: 1, message: 'hello', likesCount: 12},
        {id: 2, message: 'ok. let.s go', likesCount: 128}
    ] as Array<Posts>,
    profile: null as ProfileType | null,
    status: ''
}
const ProfileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case SAVE_PHOTO: {
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default: {
            return state
        }
    }
}
export const actions = {
    addPost: (newPostText: string) => ({type: ADD_POST, newPostText} as const),

    setProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),

    setStatus: (status: string) => ({type: SET_STATUS, status: status} as const),

    savePhotoSuccess: (photos: PhotosType) => ({type: SAVE_PHOTO, photos} as const)
}

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.profileRequest(userId)
    dispatch(actions.setProfile(data))
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.savePhotoReady(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.userId;
    let data = await ProfileAPI.updateProfile(profile);
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getProfile(userId));
        } else {
            throw new Error(`userId can't be null`)
        }
    } else {
        return Promise.reject(data.messages[0]);
    }
}
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export default ProfileReducer;