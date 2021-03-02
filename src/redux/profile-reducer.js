import { userAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
        { mesID: 1, message: "Hello", likeCount: 5},
        { mesID: 2, message: "It is my first post", likeCount: 30},
        { mesID: 3, message: "Thank you", likeCount: 10},
        { mesID: 4, message: "Hi", likeCount: 17}
    ],
    newPostText: "AAAAAAA",
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: 
            let newPost = { 
                mesId: 5,
                message: state.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT: 
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE: 
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostTextActionCreator = (text) => {
    return { 
        type: UPDATE_NEW_POST_TEXT, 
        newText: text 
    }
}

export const setUserProfile = (profile) => {
    return { 
        type: SET_USER_PROFILE, 
        profile
    }
}

export const getUserProfile = (userId) => (dispatch) => {
    userAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
        });
}

export default profileReducer;