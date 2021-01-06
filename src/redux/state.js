const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE'

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
        if(action.type === ADD_POST) {
            let newPost = { 
                mesId: 5,
                message: this._state.profilePage.newPostText,
                likeCount: 0
            };
        
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state); // повідомляємо, що змінився state
        } else if(action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if(action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber(this._state);
        } else if(action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = '';
            this._state.dialogsPage.messagesData.push({mesId: 6, message: body})
            this._callSubscriber(this._state);
        }
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostTextActionCreator = (text) => {
    return { 
        type: UPDATE_NEW_POST_TEXT, 
        newText: text 
    }
}

export const sendMessageCreator = () => {
    return {
        type: SEND_MESSAGE
    }
}

export const updateNewMessageBodyCreator = (body) => {
    return { 
        type: UPDATE_NEW_MESSAGE_BODY, 
        body: body 
    }
}



// Для того, щоб перевірити як змінюється стан можна
// додати його у windows
window.store = store;



export default store;

// store - OOP