import React, {Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Navigate, Route, Routes, useParams} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import Preloader from "./common/preloader";
import {initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import ChatPage from "./components/ChatPage/ChatPage";
export function withRouter(Children: any) {
    return (props: any) => {

        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
type MapDispatchPropsType = {
    initializeApp: () => void

}
type mapStatePropsType = {
    initialized: boolean
}
class App extends React.Component<mapStatePropsType & MapDispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'/profile'} />}/>
                        <Route path='/profile/:userId?' element={<Suspense fallback={<div>Loading...</div>}>
                            <ProfileContainer />
                        </Suspense>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/chat' element={<ChatPage/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        )
    }
}
const mapStoreToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStoreToProps, {initializeApp}))(App);
const MainApp = () => {
    return <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}
export default MainApp

