import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {useForm} from "react-hook-form";
import {TextArea} from "../../../common/FormControls";
import {Posts} from "../../../types/Types";
type MyTextPostType = {
    MyTextPost: string
}
type MyPostFormType = {
    sendPost: (newPostText: any) => void
}
const MyPostForm = ({sendPost}: MyPostFormType) => {
    const { register, handleSubmit, formState: { errors } }= useForm();

    return  <div>
        <form onSubmit={handleSubmit(sendPost)}>
              <TextArea label='MyPost' placeholder={''} register= {register} required={false}/>
            {/*{errors.MyPost && <span>{errors.MyPost.message}</span>}*/}
            <input type='submit'/>
        </form>
    </div>
}
type mapPropsType = {
    posts: Array<Posts>
}
type mapDispatchType = {
    addPost: (newPostText: string) => void
}
type MyPostsPropsType = mapPropsType & mapDispatchType
const MyPosts = ({posts, addPost}: MyPostsPropsType) => {
    let postsElement = posts.map(p => <Post message={p.message}
                                                  likesCount={p.likesCount} key={p.id}/>)
    let sendPost = (data: MyTextPostType) => {
        addPost(data.MyTextPost);
        // console.log()
    }
        return (
            <div className={s.allInfo}>
                <h3>My posts</h3>

                <div className={s.posts}>
                    {postsElement}
                </div>
                <MyPostForm sendPost={sendPost}/>
            </div>
        )
};
export default React.memo(MyPosts);