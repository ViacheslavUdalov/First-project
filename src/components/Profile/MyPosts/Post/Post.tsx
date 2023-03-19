import React from 'react';
import s from './Post.module.css';
type Props = {
    message: string
    likesCount: number
}
const Post = (props: Props) => {

    return (
        <div className={s.item}>
            <img src='https://funnycoon.ru/wp-content/uploads/2022/06/3988013-frostgiant_watermark_cinematic_01-scaled.jpg' alt='Tim' />
            { props.message }
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;