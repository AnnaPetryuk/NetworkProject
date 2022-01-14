import { Dispatch } from "react";
import { userAPI } from "../api/user-api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> // array of users id
}

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes> 

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count
            }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SN/USERS/FOLLOING_IN_PROGRESSS':
            return {
                ...state,
                // @ts-ignore
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId]
                : [ state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return state;
    }
}

export const actions = {
  followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
  unfollowSucces: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (count: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count } as const),
  toggleIsFetching: (isFetching: boolean) =>({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/FOLLOING_IN_PROGRESSS', isFetching, userId } as const),
}

//thunk creator with closure for getting parameters
export const getUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));

    let data = await userAPI.getUsers(page, pageSize);
        
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setUsers(data.items));
  }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes ) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
          
    let response = await apiMethod(userId);

    if(response.data.resultCode === 0) {
      dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
  }

export const follow = (userId: number): ThunkType  => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccess);
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSucces);
  }
}

export default usersReducer;