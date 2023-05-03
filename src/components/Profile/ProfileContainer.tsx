import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    Navigate,
    useParams
} from "react-router-dom";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/Types";
import {File} from "buffer";
import {getMyFriends} from "../../redux/user-reducer";

export function withRouter(Children: any) {
    return (props: any) => {

        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}
type mapStateToProps = ReturnType<typeof mapStateToProps>
type mapDispatchToProps = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    savePhoto: (file: File) => void
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type OwnProps = {
    match: any
}
type PropsType = mapStateToProps & mapDispatchToProps & OwnProps
class ProfileContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);

    }

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.MyId
            if (!userId) {
                return <Navigate to={'/login'}/>
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps:PropsType, prevState:PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}
                                        isOwner={!this.props.match.params.userId}
                        status={this.props.status}
        />
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    MyId: state.auth.userId,
    isAuth: state.auth.isAuth
});
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, getMyFriends, updateStatus,
        savePhoto, saveProfile}),
    withRouter, WithAuthRedirect)(ProfileContainer)
