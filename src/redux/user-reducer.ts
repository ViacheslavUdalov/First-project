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


export let initialState = {
    users: [] as Array<UserType>,
    pageSize: 30,
    totalCount: 0,
    currentPage: 1,
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
        case SETTOTAL: {
            return {...state, totalCount: action.count}
        }
        case CURRENTPAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case ISFETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_FILTER: {
            return {...state,
                filter: action.payload}
        }
        case FOLLOWINGDISABLE: {
            return {
                ...state,
                followingProcess: action.isFetching
                    ? [...state.followingProcess, action.userId]
                    : state.followingProcess.filter(id => id !== action.userId)
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
        default: {
            return state;
        }
    }
}

export const actions = {
    setUsers: (users: Array<UserType>) => ({type: SETUSERS, users} as const),
    setTotal: (totalCount: number) => ({type: SETTOTAL, count: totalCount} as const),
    setCurrentPage: (currentPage: number) => ({type: CURRENTPAGE, currentPage} as const),
    followSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
    isLoading: (isFetching: boolean) => ({type: ISFETCHING, isFetching} as const),
    followingProgress: (isFetching: boolean, userId: number) =>
        ({type: FOLLOWINGDISABLE, isFetching, userId} as const),
    setFilter: (filter: FilterType) =>
        ({type: SET_FILTER, payload: filter} as const)
}

export const getUsers = (currentPage: number, pageSize: number,
                         filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.isLoading(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter))
    let data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(actions.isLoading(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotal(data.totalCount))
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    followUnfollow(dispatch, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess, userId)
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    followUnfollow(dispatch, userAPI.follow.bind(userAPI), actions.followSuccess, userId)
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
export default UsersPage;
