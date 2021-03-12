import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import {maxLengthCreator, required} from "../../../utils/validators/validators"
import { TextArea } from "../../common/formsControllers/formController";

/*class MyPosts extends React.PureComponent {
    // Без цього компонента повертається 3 рази (з однаковим state)
    // Ми порівнюємо попередні пропси і поточні, якщо щось змінилось => перемалювати
    // shouldComponentUpdate(nextProps, nextState) {
    //    return nextProps != this.props || nextState != this.state;
    //}
    // PureComponent робить попередній код за нас
    // Для класових компонент

    render() {
        let postElements  = this.props.posts.map((item) => {
            return <Post key={item.mesID} message={item.message} likeCount={item.likeCount}/>
        });

        let onAddPost = (value) => {
            this.props.addPost(value.newPostText);
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
}*/

// React.memo - на основі мемоізації робить HOC
// який повертає компонент без додаткових перемалювань
// порівлює попередній стейт з поточним
const MyPosts = React.memo((props) => {
    console.log('hello')
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
})

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
