import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from './profile-reducer';
import dialogReducer from './dialogs-reducer';
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer // обов'язково має називатись form !!!
});

// Optimizations for redux chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

// Add this and comment previous for prod
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// window.store = store;

export default store;