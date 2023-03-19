import userReducer, {actions, FilterType, initialStateType} from "./user-reducer";

let state: initialStateType;

beforeEach(() => {
        state = {
            users: [
                {
                    id: 0, name: 'slava', status: "jfpsafafposaf",
                    photos: {small: null, large: null}, followed: false
                },
                {
                    id: 1, name: 'kostian', status: "stormgate",
                    photos: {small: null, large: null}, followed: false
                },
                {
                    id: 2, name: 'sergo', status: "sfafa",
                    photos: {small: null, large: null}, followed: true
                },
                {
                    id: 3, name: 'dima', status: "12551515",
                    photos: {small: null, large: null}, followed: true
                }
            ],
            pageSize: 30,
            totalCount: 0,
            currentPage: 1,
            isFetching: false,
            followingProcess: [],
            filter: {
                term: '',
                friend: null as null | boolean
            }
        }
    }
)
test('follow should work', () => {
const newState = userReducer(state, actions.followSuccess(1));
    expect(newState.users[0].followed).toBeFalsy();
})