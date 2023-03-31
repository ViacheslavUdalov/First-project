import React, {ChangeEvent, ChangeEventHandler, useEffect, useRef, useState} from "react";
import {AppStateType, useAppDispatch} from "../../redux/redux-store";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatPage-reducer";
import {useSelector} from "react-redux";
import {chatMessagesAPIType} from "../../api/chatPage-api";
import {set} from "react-hook-form";

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
    }, [])
    const status = useSelector((state: AppStateType) => {
        return state.chatPage.status
    })
    return <div>
        {status === 'error' && <div>Some error is there.</div>}
        <Messages/>
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
    return <div style={{height: '400px', overflowY:'auto', width: '400px', overflowX: 'hidden'}} onScroll={onScrollChanged}>
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
    return <div style={{width: '400px'}}>
        <img src={message.photo} alt={message.userName} style={{height: '30px'}}/>
        <b>{message.userName} - userId = {message.userId}</b>
        <br />
        {message.message}
        <hr />
    </div>
}

function ChatForm() {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chatPage.status)
    const dispatch = useAppDispatch()
    const TextAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value)
    }
    const sendMessageSuccess = () => {
        if(!message) {
            alert(`you can't send empty message`)
        return
        }
        const data = new Date()
        const time = String(
            data.getHours() + ":" + data.getMinutes()
        )
        const messageWithTime =  `${message} (${time})`
        dispatch(sendMessage(messageWithTime))
        setMessage('')
    }
    return <div>
        <textarea onChange={TextAreaValue} value={message}/>
        <button onClick={sendMessageSuccess} >GOGO</button>
    </div>
}
export default ChatPage