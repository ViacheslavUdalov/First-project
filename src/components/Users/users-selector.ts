import {createSelector} from "reselect";
import {AppStateType} from "../../redux/redux-store";

const getUserSelector = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getUsersState = createSelector(getUserSelector, (users) => {
    return users.filter(u => true);
})
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
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