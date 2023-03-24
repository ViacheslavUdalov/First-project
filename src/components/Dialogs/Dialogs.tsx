import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type PropsDialogsForm = {
    onSubmit: (messageText: any) => void
}

const DialogsForm = ({onSubmit}: PropsDialogsForm) => {
    const { register, handleSubmit, formState: {errors } } = useForm();

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('message')}/>
            {errors.message && <span>there are some errors here</span>}
    <button>addMessage</button>
        </form>
        </div>
    }
    type DialogsType = {
         addMessage: (messageText: string) => void
    }
export type addMessageType = {
    message: string
}
const Dialogs: React.FC<DialogsType> = (props) => {
    const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogs)
    const messages = useSelector((state: AppStateType) => state.dialogsPage.messages)

    let dialogsElements =
        dialogs.map(d => <DialogItem id={d.id} name={d.name} key={d.id}/>)
    let messagesElements =
        messages.map(m => <Message message={m.message} key={m.id}/>)

    const onSubmit = (values: addMessageType) => {
        props.addMessage(values.message)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
            </div>
            <DialogsForm onSubmit={onSubmit}
            />
        </div>
    )
}

export default React.memo(Dialogs);