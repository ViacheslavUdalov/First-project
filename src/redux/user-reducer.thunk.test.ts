import {userAPI} from "../api/UsersAPI";
import {APIResponse, GetUsersType, ResultCodesEnum} from "../api/api";
import {follow, getUsers} from "./user-reducer";
import {UserType} from "../types/Types";

const dispatch = jest.fn()
const getState = jest.fn()
beforeEach(() => {
    dispatch.mockClear()
    getState.mockClear()
})
jest.mock("../api/UsersAPI")
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>
const response: APIResponse = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
let getUsersResponse: GetUsersType = {
    items:[],
    totalCount: 0,
    error: ''
}
test('Follow Thunk', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(response))
    const thunk = follow(1)
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(3)
})
test('get Users', async () => {
    userAPIMock.getUsersAPI.mockReturnValue(Promise.resolve(getUsersResponse))
    const thunk = getUsers(1, 30, {term: '', friend: null})
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(6)
})