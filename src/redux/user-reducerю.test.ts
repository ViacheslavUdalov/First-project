import userReducer, {actions, initialStateType} from "./user-reducer";
import {UserType} from "../types/Types";

let initialState: initialStateType
beforeEach(() => {
    initialState = {
        users: [
            {
                id: 0, name: 'stormgate', followed: false, status: 'status 0',
                photos: {small: null, large: null}
            },
            {
                id: 1, name: 'SC2', "followed": false, status: 'status 1',
                photos: {small: null, large: null}
            },
            {
                id: 2, name: 'Balls', followed: true, status: 'status 2',
                photos: {small: null, large: null}
            },
            {
                id: 3, name: 'imagine', followed: true, status: 'status 3',
                photos: {small: null, large: null}
            }
        ],
        friends: [] as Array<UserType>,
        pageSize: 30,
        totalCount: 0,
        totalFriends: 0,
        currentPage: 1,
        isFetching: false,
        currentUser: null,
        followingProcess: [] as Array<number>,
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }
})
test('follow', () => {
    const newState = userReducer(initialState, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})
test('unfollow', () => {
    const newState = userReducer(initialState, actions.unfollowSuccess(3))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})
test('unfollow', () => {
    const newState = userReducer(initialState, actions.unfollowSuccess(3))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})
