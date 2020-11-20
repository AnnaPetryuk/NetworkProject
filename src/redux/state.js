let rerenderEntireTree = () => {
    console.log("State changed");
};

let state = {
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
}

// Для того, щоб перевірити як змінюється стан можна
// додати його у windows
window.state = state;

export const addPost = () => {
    let newPost = { 
        mesId: 5,
        message: state.profilePage.newPostText,
        likeCount: 0
    };

    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export const updateNewPostText = (newPostText) => {
    state.profilePage.newPostText = newPostText;
    rerenderEntireTree(state);
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer; // Pattern observer (по цьому патерну працює addEventListener)
}

export default state;

// store - OOP