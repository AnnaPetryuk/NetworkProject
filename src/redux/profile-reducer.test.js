import profileReducer, { addPostActionCreator, deletePostActionCreator } from "./profile-reducer";

let state = {
    posts: [
        { mesID: 1, message: "Hello", likeCount: 5},
        { mesID: 2, message: "It is my first post", likeCount: 30},
        { mesID: 3, message: "Thank you", likeCount: 10},
        { mesID: 4, message: "Hi", likeCount: 17}
    ]
}

test('length of post should be incremented', () => {
    // staet test data
    let action = addPostActionCreator("some text");
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(5);
});

test('message of new post should be correct', () => {
    // staet test data
    let action = addPostActionCreator("some text");
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts[4].message).toBe("some text");
});

test('after deleting length of posts should incremented', () => {
    // staet test data
    let action = deletePostActionCreator(1);
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(3);
});

test('after deleting length should not be changed if id is incorrect', () => {
    // staet test data
    let action = deletePostActionCreator(100);
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(4);
});
