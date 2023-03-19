import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {actions} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => ({
    posts: state.profilePage.posts
})
const MyPostContainer = connect(mapStateToProps, {addPost: actions.addPost})(MyPosts);
export default MyPostContainer;