import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {AppStateType, useAppDispatch} from "../../redux/redux-store";
import {sendMessageSuccess, startMessagesListening, stopMessagesListening} from "../../redux/chatPage-reducer";
import {useSelector} from "react-redux";
import {chatMessagesAPIType} from "../../api/chatPage-api";
import anonimUser from '../../common/images/anonymous-user.webp'
import styles from './ChatPage.module.css'
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import ChatPageTopPage from "./ChatPageTopPage";
function ChatPage() {
    return < div>
        <Chat/>
    </div>
}

function Chat() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])
    const status = useSelector((state: AppStateType) => {
        return state.chatPage.status
    })
    return <div>
        {status === 'error' && <div>Some error is there.</div>}
        <div className={styles.allMessages}>
            <ChatPageTopPage />
            <div className={styles.messagesBorder}>
        <Messages/>
            </div>
        </div>
        <ChatForm/>
    </div>
}

function Messages() {
    const messages = useSelector((state: AppStateType) => state.chatPage.messages)
    const [isAuthScroll, setAutoScroll] = useState(true)
    const messagesRef = useRef<HTMLDivElement>(null)
const onScrollChanged = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
    const whatTheScrollIs = element.scrollHeight - element.scrollTop
    const currentValue = Math.abs(whatTheScrollIs - element.clientHeight)
    if (currentValue < 300) {
        if(!isAuthScroll) {
            setAutoScroll(true)
        }
    }
    else {
        if (isAuthScroll) {
            setAutoScroll(false)
        }
    }
}
useEffect(() => {
if (isAuthScroll) {
    messagesRef.current?.scrollIntoView()
}
}, [messages])
    return <div className={styles.message}
                style={{height: '700px', overflowY:'auto', width: '100%', overflowX: 'hidden'}}
                onScroll={onScrollChanged}>
        {messages.map((m) =>
            <Message message={m} key={m.id}/>)}
        <div ref={messagesRef}>
        </div>
    </div>
}

type MessageType = {
    message: chatMessagesAPIType
}

function Message({message}: MessageType) {
    return <div className={styles.flex} >
        <img src={message.photo || anonimUser} alt={message.userName}
           className={styles.uniqImg}/>
        <div className={styles.name}>
        <b>{message.userName} - userId = {message.userId}</b>
        <br   />
            <div className={styles.message}>
        {message.message}
            </div>
        </div>
    </div>
}

function ChatForm() {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chatPage.status)
    const dispatch = useAppDispatch()
const TextAreaValue = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
}
const sendMessageInChat = () => {
    if(!message) {
        alert(`you can't send empty message`)
        return
    }
    const data = new Date()
    const time = String(
        data.getHours() + ":" + data.getMinutes()
    )
    const messageWithTime =  `${message} (${time})`
    dispatch(sendMessageSuccess(messageWithTime))
    setMessage('')
}
const onKeySend = (event: any) => {
       if (event.code === 'Enter')  {
sendMessageInChat()
       }
}
return <div className={styles.sendMessage}>
    <Input size="large" placeholder='Вы можете написать сообщение...' prefix={<UserOutlined />}
           value={message}
           className={styles.textArea}
           onChange={TextAreaValue}
    onKeyPress={onKeySend}/>
    <button disabled={status !== 'ready'} onClick={sendMessageInChat} className={styles.sendIcon}>Отправить
    </button>
</div>
}
export default compose<React.ComponentType>(WithAuthRedirect)(ChatPage)