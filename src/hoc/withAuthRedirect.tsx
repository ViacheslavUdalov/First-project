import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType, useAppSelector} from "../redux/redux-store";

export const WithAuthRedirect = (Component: any) => {
    type Props = {
        isAuth: boolean
    }
    class RedirectComponent extends React.Component<Props> {

        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'}/>
            return <Component {...this.props}/>
        }
    }
    let authRedirect = connect(mapStateToProps)(RedirectComponent);
    return authRedirect;
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
