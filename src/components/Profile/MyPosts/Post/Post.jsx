import React from 'react';
import styles from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={styles.item}>
            <img src="https://w7.pngwing.com/pngs/816/892/png-transparent-instagram-graphy-odnoklassniki-blog-avatar-instagram-thumbnail.png" />
            
            {props.message}
            
            <div>
                <span>{props.likeCount}</span>
            </div> 
        </div>
    );
}

export default Post;
