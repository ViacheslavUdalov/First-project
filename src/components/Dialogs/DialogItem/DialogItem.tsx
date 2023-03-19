import React from "react";
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
type PropsType = {
    id: number
    name: string
}
const DialogItem = ({id, name}: PropsType) => {
    let path = '/dialogs/' + id;
    return (

        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}
export default DialogItem;