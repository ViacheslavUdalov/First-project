import profileReducer, {addPost} from "./profile-reducer";

let initialState = {
    posts: [
        {id: 1, message: 'hello', likesCount: 12},
        {id: 2, message: 'ok. let.s go', likesCount: 128}
    ]
};

describe('reducer test', () => {
    it('should be added', () => {
        const Action = addPost('Hello');
        const result = profileReducer(initialState, Action);
        expect(result.posts.length).toEqual(3);
    });
})