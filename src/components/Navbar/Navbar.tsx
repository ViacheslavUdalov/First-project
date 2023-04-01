import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import ProfileIcon from '../../common/images/account_circle_FILL0_wght400_GRAD0_opsz48 (1).png'
import UsersIcon from '../../common/images/person_FILL0_wght500_GRAD0_opsz48.png'
import messageIcon from '../../common/images/chat_FILL0_wght500_GRAD0_opsz48.png'
const Navbar = () => {
    return (
        <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/profile'
                     style={({ isActive }) => ({
                         color: isActive ? 'greenyellow' : 'white' })}>
                <img src={ProfileIcon} className={s.images} />Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/dialogs' style={({ isActive }) => ({
                color: isActive ? 'greenyellow' : 'white' })}>
                <img src={messageIcon} className={s.images}/>Messages</NavLink>
        </div>
            <div className={s.item}>
            <NavLink to='/users' style={({ isActive }) => ({
                color: isActive ? 'greenyellow' : 'white' })}>
                <img src={UsersIcon} className={s.images}/>Users</NavLink>
        </div>
            <div className={s.item}>
            <NavLink to='/chat' style={({ isActive }) => ({
                color: isActive ? 'greenyellow' : 'white' })}>
                <img src={messageIcon} className={s.images}/>Chat</NavLink>
        </div>

    </nav>
    )
}

export default Navbar;