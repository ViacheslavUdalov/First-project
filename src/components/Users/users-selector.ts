import {createSelector} from "reselect";
import {AppStateType} from "../../redux/redux-store";
import users from "./Users";
import {UserType} from "../../types/Types";

const getUserSelector = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getUsersState = createSelector(getUserSelector, (users) => {
    return users.filter(u => true);
})
export const getFriends = (state: AppStateType) => {
    const res: Array<UserType> = []
    state.usersPage.users.map(u => u.followed && res.push(u)
   )
    return res
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getCurrentUser = (state: AppStateType) => {
    return state.usersPage.currentUser
}
export const getTotalCount = (state: AppStateType) => {
    return  state.usersPage.totalCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingProcess = (state: AppStateType) => {
    return state.usersPage.followingProcess
}
export const getFilter = (state: AppStateType) => {
    return state.usersPage.filter
}
export const getTotalFriend = (state: AppStateType) => {
    return state.usersPage.totalFriends
}