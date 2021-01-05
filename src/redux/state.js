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
            ] 
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

    addPost () {
        let newPost = { 
            mesId: 5,
            message: this._state.profilePage.newPostText,
            likeCount: 0
        };
    
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    updateNewPostText(newPostText) {
        this._state.profilePage.newPostText = newPostText;
        this._callSubscriber(this._state);
    }
    // ,
    // dispatch(action) {
    //     if(action.type === 'ADD-POST') {
    //         let newPost = { 
    //             mesId: 5,
    //             message: this._state.profilePage.newPostText,
    //             likeCount: 0
    //         };
        
    //         this._state.profilePage.posts.push(newPost);
    //         this._state.profilePage.newPostText = '';
    //         this._callSubscriber(this._state);
    //     } else if(action.type === 'UPDATE-NEW-POST-TEXT') {
    //         this._state.profilePage.newPostText = newPostText;
    //         this._callSubscriber(this._state);
    //     }
    // }
}



// Для того, щоб перевірити як змінюється стан можна
// додати його у windows
window.store = store;



export default store;

// store - OOP