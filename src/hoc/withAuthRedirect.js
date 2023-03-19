import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

export const WithAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'}/>
            return <Component {...this.props}/>
        }
    }
    let authRedirect = connect(mapStateToProps)(RedirectComponent);
    return authRedirect;
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
