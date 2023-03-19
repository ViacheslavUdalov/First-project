import {setUserProfile} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

const GETINITIALIZED = 'GETINITIALIZED';

let initial = {
    initialized: false as boolean
}
type initialType = typeof initial;
const AppReducer = (state = initial, action: ActionType): initialType => {
    switch (action.type) {
        case GETINITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}
export const actions = {
    setInitialized: () => ({type: GETINITIALIZED} as const)
}
export const initializeApp = () => (dispatch: any) => {
let promise = dispatch(setUserProfile());
    Promise.all([promise]).then(() => {
        dispatch(actions.setInitialized());
    });
}
type ActionType = InferActionsTypes<typeof actions>
export default AppReducer;
