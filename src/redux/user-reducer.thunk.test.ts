import {userAPI} from "../api/UsersAPI";
import {APIResponse, ResultCodesEnum} from "../api/api";
import {follow} from "./user-reducer";

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
test('', () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(response))
    const thunk = follow(1)
    expect(dispatch).toBeCalledTimes(3)
})