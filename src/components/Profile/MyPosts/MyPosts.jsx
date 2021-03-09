import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import {maxLengthCreator, required} from "../../../utils/validators/validators"
import { TextArea } from "../../common/formsControllers/formController";


const MyPosts = (props) => {
    let postElements  = props.posts.map((item) => {
        return <Post key={item.mesID} message={item.message} likeCount={item.likeCount}/>
    });

    let onAddPost = (value) => {
        props.addPost(value.newPostText);
    }

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={styles.posts}>
                { postElements }
            </div>
        </div>
    );
}

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={TextArea} placeholder={"Post message"}
                    validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div> 
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)

export default MyPosts;
