import { connect } from "react-redux";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
        // ,
        // updateNewPostText: (text) => {
        //     let action = updateNewPostTextActionCreator(text);
        //     dispatch(action);
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
