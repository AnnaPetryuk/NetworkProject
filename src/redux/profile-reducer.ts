import { stopSubmit } from "redux-form";
import { profileAPI, userAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types"

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { mesID: 1, message: "Hello", likeCount: 5},
        { mesID: 2, message: "It is my first post", likeCount: 30},
        { mesID: 3, message: "Thank you", likeCount: 10},
        { mesID: 4, message: "Hi", likeCount: 17}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: 
            let newPost = { 
                mesId: 5,
                message: action.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost] as Array<PostType>,
                newPostText: ''
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.mesId)
            }
        case SET_USER_PROFILE: 
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS: 
            return {
                ...state,
                status: action.status
            }  
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => {
    return {
        type: ADD_POST,
        newPostText
    }
}

type DeletePostActionCreatorType = {
    type: typeof DELETE_POST,
    mesId: number
}

export const deletePostActionCreator = (mesId: number): DeletePostActionCreatorType => {
    return {
        type: DELETE_POST,
        mesId
    }
}

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileType => {
    return { 
        type: SET_USER_PROFILE, 
        profile
    }
}

type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string): SetStatusType => {
    return { 
        type: SET_STATUS, 
        status
    }
}

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => {
    return { 
        type: SAVE_PHOTO_SUCCESS, 
        photos
    }
}

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await userAPI.getProfile(userId);
    
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
    
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        // Обробка помилки
        // Глобальна обробка не спрацює
    }
    
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    
    if(response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile);
    
    if(response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        let messages = (response.data.messages.length > 0) ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('edit-profile', {_error: messages}))
        return Promise.reject(messages);
    }
}

export default profileReducer;