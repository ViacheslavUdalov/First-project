import React from 'react';
import s from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";
import {NavLink} from "react-router-dom";
import {AnyAction} from "redux";

type PropsType = {}
function Header (props: PropsType) {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const dispatch = useDispatch()
    const Logout = () => {
        dispatch(logout() as unknown as AnyAction)
    }
    return <div className={s.header}>
        <img src='https://games.mail.ru/pre_0x736_resize/hotbox/content_files/game/2022/06/07/c0b5873e12fe45f3970dcfc5cd6e612b.jpg?quality=85' alt = "stormgate"/>
        <div className={s.login}>
            {isAuth ? <div>{login} - <button onClick = {Logout}>Logout</button></div> :
            <NavLink to='/login'>Login</NavLink>
            }
        </div>
    </div>
}

export default Header;