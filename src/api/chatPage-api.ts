const subscribers = {
    'messages-received': [] as messageReceivedType[],
    'status-changed': [] as statusChangedType[]
}
let ws: WebSocket | null = null
type EventNameType = 'messages-received' | 'status-changed'
const closeHandler = () => {
    notifyAboutStatusChanging('pending')
    setTimeout(createChanel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifyAboutStatusChanging('pending')
}
const errorHandler = () => {
    notifyAboutStatusChanging('error')
}
const notifyAboutStatusChanging = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', openHandler)
}

function createChanel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(EventName: EventNameType, callback: messageReceivedType | statusChangedType) {
        // @ts-ignore
        subscribers[EventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[EventName] = subscribers[EventName].filter(s => s !== callback)
        }
    },
    unsubscribe(EventName: EventNameType, callback: messageReceivedType | statusChangedType) {
        // @ts-ignore
        subscribers[EventName] = subscribers[EventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}
type messageReceivedType = (message: chatMessagesAPIType[]) => void
type statusChangedType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready' | 'error'
export type chatMessagesAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}