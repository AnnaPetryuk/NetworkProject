import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { mesID: 1, message: "Hello", likeCount: 5},
                { mesID: 2, message: "It is my first post", likeCount: 30},
                { mesID: 3, message: "Thank you", likeCount: 10},
                { mesID: 4, message: "Hi", likeCount: 17}
            ],
            newPostText: "AAAAAAA"
        },
        dialogsPage: {
            messagesData: [
                { mesId: 1, message: "Hi" },
                { mesId: 2, message: "Hello" },
                { mesId: 3, message: "How are you?" },
                { mesId: 4, message: "Hi" },
                { mesId: 5, message: "Hey" }
            ],      
            dialogsData: [
                { pathId: 1, name: "Svitlana" },
                { pathId: 2, name: "Sasha" },
                { pathId: 3, name: "Vova" },
                { pathId: 4, name: "Sophia" },
                { pathId: 5, name: "Tania" }
            ],
            newMessageBody: ''
        }

    },
    _callSubscriber() {
        console.log("State changed");
    },

    getState() {
        return this._state;
    },  
    subscribe(observer) {
        this._callSubscriber = observer; // Pattern observer (по цьому патерну працює addEventListener)
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        
        this._callSubscriber(this._state);
    }
}


// Для того, щоб перевірити як змінюється стан можна
// додати його у windows
window.store = store;



export default store;

// store - OOP