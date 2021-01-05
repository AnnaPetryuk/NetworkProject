import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import React from "react"

const MyPosts = (props) => {
    let postElements  = props.posts.map((item) => {
        return <Post key={item.mesID} message={item.message} likeCount={item.likeCount}/>
    });

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch({ type: 'ADD-POST' });
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', newText: text });
    }

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={ onPostChange } 
                              ref={ newPostElement } 
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={ addPost }>Add post</button>
                </div> 
            </div>
            <div className={styles.posts}>
                { postElements }
            </div>
        </div>
    );
}

export default MyPosts;
