import {MapingUsers} from "../Helpers/followOnUser";
import {UserType} from "../types/Types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {userAPI} from "../api/UsersAPI";
import {APIResponse} from "../api/api";

const SETUSERS = 'SETUSERS';
const SETTOTAL = 'SETTOTAL';
const CURRENTPAGE = 'CURRENTPAGE';
const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';
const ISFETCHING = 'ISFETCHING';
const FOLLOWINGDISABLE = 'FOLLOWINGDISABLE';
const SET_FILTER = 'SET_FILTER';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_TOTALFRIEND = 'SET_TOTALFRIEND';
const SET_CURRENT_USER = 'SET_CURRENT_USER';

export let initialState = {
    users: [] as Array<UserType>,
    friends: [] as Array<UserType>,
    pageSize: 30,
    totalCount: 0,
    totalFriends: 0,
    currentPage: 1,
    currentUser: null as UserType | null,
    isFetching: false,
    followingProcess: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export type initialStateType = typeof initialState;

const UsersPage = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SETUSERS: {
            return {...state, users: action.users}
        }
        case SET_FRIENDS: {
            return {
                ...state,
                friends: state.users.map((u: UserType) => {
                        if (u.followed) {
                            return {...u}
                        }
                        return u
                    }
                )
            }
        }
        case SETTOTAL: {
            return {...state, totalCount: action.count}
        }
        case SET_TOTALFRIEND: {
            return {...state, totalFriends: action.count}
        }
        case CURRENTPAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case ISFETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_FILTER: {
            return {
                ...state,
                filter: action.payload
            }
        }
        case FOLLOWINGDISABLE: {
            return {
                ...state,
                followingProcess: action.isFetching
                    ? [...state.followingProcess, action.userId]
                    : state.followingProcess.filter((id: number) => id !== action.userId)
            }
        }
        case FOLLOW: {
            return {
                ...state,
                users: MapingUsers(state.users, 'id', action.userId, {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: MapingUsers(state.users, 'id', action.userId, {followed: false})
            }
        }
        case SET_CURRENT_USER: {
            return  {
                ...state,
                currentUser: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    setUsers: (users: Array<UserType>) => ({type: SETUSERS, users} as const),
    setTotal: (totalCount: number) => ({type: SETTOTAL, count: totalCount} as const),
    setTotalFriend: (totalFriends: number) => ({type: SET_TOTALFRIEND, count: totalFriends} as const),
    setCurrentPage: (currentPage: number) => ({type: CURRENTPAGE, currentPage} as const),
    followSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
    isLoading: (isFetching: boolean) => ({type: ISFETCHING, isFetching} as const),
    followingProgress: (isFetching: boolean, userId: number) =>
        ({type: FOLLOWINGDISABLE, isFetching, userId} as const),
    setFilter: (filter: FilterType) =>
        ({type: SET_FILTER, payload: filter} as const),
    setFriends: (friends: Array<UserType>) =>
        ({type: SET_FRIENDS, friends} as const),
    setCurrentUser: (user: UserType) =>
        ({type: SET_CURRENT_USER, payload: user} as const)
}

export const getUsers = (currentPage: number, pageSize: number | null,
                         filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.isLoading(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setFilter(filter))
    let data = await userAPI.getUsersAPI(currentPage, pageSize, filter.term, filter.friend)
    dispatch(actions.isLoading(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotal(data.totalCount))
}
export const getMyFriends = (currentPage: number, pageSize: number | null, friend: boolean): ThunkType => async (dispatch) => {
    let data = await userAPI.getUsersAPI(currentPage, pageSize, '', friend)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalFriend(data.totalCount))
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    followUnfollow(dispatch, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess, userId)
    console.log('unfollowSuccess')
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    followUnfollow(dispatch, userAPI.follow.bind(userAPI), actions.followSuccess, userId)
    console.log('followSuccess')
}
const followUnfollow = async (dispatch: DispatchType,
                              APIMETHOD: (userId: number) => Promise<APIResponse>,
                              action: (userId: number) => ActionsType,
                              userId: number) => {
    dispatch(actions.followingProgress(true, userId));
    let data = await APIMETHOD(userId);
    if (data.resultCode === 0) {
        dispatch(action(userId))
    }
    dispatch(actions.followingProgress(false, userId));
}
export type FilterType = typeof initialState.filter
type ThunkType = BaseThunkType<ActionsType>
type DispatchType = Dispatch<ActionsType>
type ActionsType = InferActionsTypes<typeof actions>
export default UsersPage
