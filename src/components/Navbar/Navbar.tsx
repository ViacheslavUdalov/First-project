import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/profile'
                     style={({ isActive }) => ({
                         color: isActive ? 'greenyellow' : 'white' })}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/dialogs' style={({ isActive }) => ({
                color: isActive ? 'greenyellow' : 'white' })}>Messages</NavLink>
        </div>
            <div className={s.item}>
            <NavLink to='/users' style={({ isActive }) => ({
                color: isActive ? 'greenyellow' : 'white' })}>Users</NavLink>
        </div>

    </nav>
    )
}

export default Navbar;