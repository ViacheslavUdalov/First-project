import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {actions} from "../../redux/dialogs-reducer";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import React from "react";

const mapStateToProps = (state: AppStateType) => ({
    dialogs: state.dialogsPage
} )
export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    WithAuthRedirect)
(Dialogs);