import {actions, initialStateType} from "./profile-reducer";
import {Posts, ProfileType} from "../types/Types";
import profile from "../components/Profile/Profile";
import ProfileReducer from "./profile-reducer";

let state: initialStateType;
beforeEach(() => {
    state = {
        posts: [
            {id: 1, message: 'hello', likesCount: 12},
            {id: 2, message: 'ok. let.s go', likesCount: 128}
        ] as Array<Posts>,
            profile:  null as ProfileType | null,
            status: ''
    }
})
test('add Post Action Creator', () => {
    let newState = ProfileReducer(state, actions.addPost('assavss'))
    expect(state.posts.length).toBe(2)
})