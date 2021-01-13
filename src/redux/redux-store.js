import { combineReducers, createStore } from "redux";
import profileReducer from './profile-reducer';
import dialogReducer from './dialogs-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer
});

let store = createStore(reducers);

window.store = store;

export default store;