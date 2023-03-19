import {InferActionsTypes} from "./redux-store";

const ADDMESSAGE = 'ADDMESSAGE';
type DialogsType = {
    id: number,
    name: string
}
type MessagesType = {
    id: number,
    message: string
}
let initialState = {
    dialogs: [
        {id: 1, name: 'Maru'},
        {id: 2, name: 'Serral'},
        {id: 3, name: 'TYTY'},
        {id: 4, name: 'Innovation'},
        {id: 5, name: 'sOs'},
        {id: 6, name: 'Stats'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'diedie'},
        {id: 2, message: 'hihi'},
        {id: 3, message: 'wowow'},
        {id: 4, message: 'isi two'},
        {id: 5, message: 'ready to go'},
        {id: 6, message: 'my assimilator'}
    ] as Array<MessagesType>
}
export type initialStateType = typeof initialState
const dialogsReducer = (state = initialState,
                        action: ActionType): initialStateType => {
    switch (action.type) {
        case ADDMESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: body}],
            }
        }
        default: {
            return state;
        }
    }
}
export const actions = {
   addMessage: (newMessageBody:string) => ({type:ADDMESSAGE, newMessageBody} as const)
}
type ActionType = InferActionsTypes<typeof actions>
export default dialogsReducer;