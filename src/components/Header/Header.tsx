import React from 'react';
import styles from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";
import {NavLink} from "react-router-dom";
import {AnyAction} from "redux";
import homeIcon from '../../common/images/home_FILL0_wght500_GRAD0_opsz48.png'
import {LogoutOutlined} from "@ant-design/icons";
import loginIcon from '../../common/images/login_FILL0_wght500_GRAD0_opsz48.png'

type PropsType = {}
function Header (props: PropsType) {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const dispatch = useDispatch()
    const Logout = () => {
        dispatch(logout() as unknown as AnyAction)
    }
    return <div className={styles.header}>
        <div className={styles.location}>
            <NavLink to={'/profile'}>
                <img src={homeIcon} className={styles.images} alt =""/>
            </NavLink>
        <div className={styles.login}>
            {isAuth ? <div>{login} <button className={styles.logoutButton}
                                             onClick = {Logout}> <LogoutOutlined
                    className={styles.logoutIcon}/>Logout</button>
                   </div> :
                <div className={styles.navlink}>
            <NavLink className={styles.loginRef} to='/login'>
                <img className={styles.loginImg} src={loginIcon}/><span className={styles.span}>Login</span></NavLink>
                </div>
            }
        </div>
        </div>
    </div>
}

export default Header;