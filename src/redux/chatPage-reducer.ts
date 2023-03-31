import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, chatMessagesAPIType, StatusType} from "../api/chatPage-api";
import {Dispatch} from "redux";
import {idWithIndex} from "../Helpers/ChatPageHelper";

const SETMESSAGES = 'SETMESSAGES';
const STATUSCHANGED = 'STATUSCHANGED';
type MessagesType = chatMessagesAPIType & {id: string}
let initial = {
    messages: [] as MessagesType[],
    status: 'pending' as StatusType
}
type initialType = typeof initial;
const chatReducer = (state = initial, action: ActionsType): initialType => {
    switch (action.type) {
        case SETMESSAGES:
            const messagesPayloadWithId = action.payload.messages.map(
                (m, index) => {
                    const messageId = idWithIndex(index)
                    return (
                        {...m, id: messageId}
                    )
                })
            const wholeMessagesPayload = [...state.messages, ...messagesPayloadWithId]
            const filterMessagesBy100units =  wholeMessagesPayload.filter((m, index, array) =>
            index >= array.length - 100)
            return {
                ...state,
                messages: filterMessagesBy100units
            }
        case STATUSCHANGED:
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}
export const actions = {
    messagesReceived: (messages: chatMessagesAPIType[]) =>
        ({type: SETMESSAGES, payload: {messages}} as const),
    changeStatus: (status: StatusType) =>
        ({type: STATUSCHANGED, payload: {status}} as const)
}
let _receiveMessages: ((messages: chatMessagesAPIType[]) => void) | null = null
const receivedMessagesActionCreator = (dispatch: Dispatch) => {
    if (_receiveMessages === null) {
        _receiveMessages = (message) => {
            dispatch(actions.messagesReceived(message))
        }
    }
    return _receiveMessages
}
let _statusChanging: ((status: StatusType) => void) | null = null
const statusChangingActionCreator = (dispatch: Dispatch) => {
    if (_statusChanging === null) {
        _statusChanging = (status) => {
            dispatch(actions.changeStatus(status))
        }
    }
    return _statusChanging
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', receivedMessagesActionCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangingActionCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', receivedMessagesActionCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangingActionCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export default chatReducer;
