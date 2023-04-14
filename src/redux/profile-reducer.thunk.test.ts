import {ProfileAPI, savePhotoReadyType} from "../api/ProfileAPI";
import {APIResponse, ResultCodesEnum} from "../api/api";
import {Contacts, PhotosType, ProfileType} from "../types/Types";
import {getProfile, savePhoto} from "./profile-reducer";

const dispatch = jest.fn()
const getState = jest.fn()
beforeEach(() => {
    dispatch.mockClear()
    getState.mockClear()
})
jest.mock("../api/ProfileAPI")
const ProfileAPIMock = ProfileAPI as jest.Mocked<typeof ProfileAPI>
const response: APIResponse = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
let profile: ProfileType = {
    userId: 1,
    lookingForAJob: true,
    lookingForAJobDescription: '',
    aboutMe: '',
    fullName: '',
    contacts: {
        github: '',
        vk: '',
        facebook: '',
        instagram: '',
        twitter: '',
        website: '',
        youtube: '',
        mainLink: ''
    },
    photos: {
        small: '',
        large: ''
    }
}

test('', async () => {
    ProfileAPIMock.profileRequest.mockReturnValue(Promise.resolve(profile))
    const thunk = getProfile(1)
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
})
