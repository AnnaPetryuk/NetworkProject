import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from './profile-reducer';
import dialogReducer from './dialogs-reducer';
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import {reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer // обов'язково має називатись form !!!
});

type RootReducerType = typeof rootReducer; // (state: GLOBALSTATE) => (GLOABALSTATE)
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> =
  ThunkAction<R, AppStateType, unknown, A>

// Optimizations for redux chrome extension
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

// @ts-ignore
window.__store__ = store;

// Add this and comment previous for prod
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// window.store = store;

export default store;