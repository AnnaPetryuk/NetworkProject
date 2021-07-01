import { Dispatch } from "react";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { userAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { AppStateType } from "./redux-store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const FOLLOING_IN_PROGRESSS = 'FOLLOING_IN_PROGRESSS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id
}

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case FOLLOING_IN_PROGRESSS:
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

type ActionsTypes = FollowSuccess | UnfollowSuccessType | 
                    SetUserType | SetCurrentPageType | 
                    SetTotalUsersCount | ToggleIsFetchingType | 
                    ToggleFolloingProgressType;

type FollowSuccess = {
    type: typeof FOLLOW,
    userId: number
}

export const followSuccess = (userId: number): FollowSuccess => {
    return {
        type: FOLLOW,
        userId
    }
}

type UnfollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessType => {
    return {
        type: UNFOLLOW,
        userId
    }
}

type SetUserType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUserType => {
    return {
        type: SET_USERS,
        users
    }
}

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

type SetTotalUsersCount = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}

export const setTotalUsersCount = (count: number): SetTotalUsersCount => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count
    }
}

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

type ToggleFolloingProgressType = {
    type: typeof FOLLOING_IN_PROGRESSS,
    isFetching: boolean,
    userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFolloingProgressType => {
    return {
        type: FOLLOING_IN_PROGRESSS,
        isFetching,
        userId
    }
}

// type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> 

//thunk creator with closure for getting parameters
export const getUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await userAPI.getUsers(page, pageSize);
        
        dispatch(toggleIsFetching(false));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setUsers(data.items));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccess | UnfollowSuccessType ) => {
    dispatch(toggleFollowingProgress(true, userId));
        
    let response = await apiMethod(userId);

    if(response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType  => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    }
}

export default usersReducer;