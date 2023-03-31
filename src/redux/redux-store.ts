import {Action, AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import UserReducer from "./user-reducer";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import AppReducer from "./app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import chatReducer from "./chatPage-reducer";

const rootReducer = combineReducers({
    usersPage: UserReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    auth: authReducer,
    app: AppReducer,
    chatPage: chatReducer
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type BaseThunkType<ActionTypes extends Action,
    ReturnType = Promise<void>> = ThunkAction<ReturnType,
    AppStateType, unknown, ActionTypes>
export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: any[]) => infer U
} ? U : never;
export const useAppDispatch = () => useDispatch<TypedDispatch<AppStateType>>();

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export default store;
