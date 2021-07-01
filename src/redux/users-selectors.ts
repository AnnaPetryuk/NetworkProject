// import { createSelector } from "reselect";

import { AppStateType } from "./redux-store"

export const getAllUsers = (state: AppStateType) => {
    return state.usersPage.users
}

// Приклад селектора
// export const getAllUsersSuper = (state) => {
//     return getAllUsers(state).filter(u => true);
// }

// export const getAllUsersSuperSelector = createSelector(getAllUsers, (users) => {
//     return users.filter(u => true);
// });

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}