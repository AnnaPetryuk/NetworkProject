const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: []
    // users: [
    //     { id: 1, photoUrl: 'https://avatarfiles.alphacoders.com/101/thumb-101498.jpg', followed: true, fullName: "Anna", status: 'I am happy', location: {city: 'Kyiv', country: 'Ukraine'}},
    //     { id: 2, photoUrl: 'https://avatarfiles.alphacoders.com/101/thumb-101498.jpg', followed: true, fullName: "Anna", status: 'I am a boss', location: {city: 'Lviv', country: 'Ukraine'}},
    //     { id: 3, photoUrl: 'https://avatarfiles.alphacoders.com/101/thumb-101498.jpg', followed: false, fullName: "Anna", status: 'I am happy', location: {city: 'Odessa', country: 'Ukraine'}},
    //     { id: 4, photoUrl: 'https://avatarfiles.alphacoders.com/101/thumb-101498.jpg', followed: true, fullName: "Anna", status: 'I am a boss', location: {city: 'Kyiv', country: 'Ukraine'}}
    // ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.userId) {
                        return {...item, followed: true}
                    }
                    return item;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.userId) {
                        return {...item, followed: false}
                    }
                    return item;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}

export const followAC = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
}

export const unfollowAC = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
}

export const setUsersAC = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export default usersReducer;