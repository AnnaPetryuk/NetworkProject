import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import { userAPI } from "../api/user-api";
import { PhotosType, PostType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store";

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
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST': 
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
    case 'SN/PROFILE/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.mesId)
      }
    case 'SN/PROFILE/SET_USER_PROFILE': 
      return {
        ...state,
        profile: action.profile
      }
    case 'SN/PROFILE/SET_STATUS': 
      return {
        ...state,
        status: action.status
      }  
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      }
    default:
      return state;
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'SN/PROFILE/ADD_POST', newPostText } as const),
  deletePostActionCreator: (mesId: number) => ({ type: 'SN/PROFILE/DELETE_POST', mesId } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const),
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId);
    
  dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
    
  dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    let data = await profileAPI.updateStatus(status);
  
    if(data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    // Обробка помилки
    // Глобальна обробка не спрацює
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
    
  if(data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const data = await profileAPI.saveProfile(profile);
    
  if(data.resultCode === 0) {
    if(userId != null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error("userId can't be null");
    }
  } else {
    let messages = (data.messages.length > 0) ? data.messages[0] : 'Some error';
    dispatch(stopSubmit('edit-profile', {_error: messages}))
    return Promise.reject(messages);
  }
}

export default profileReducer;
