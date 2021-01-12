const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
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

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messagesData.push({mesId: 6, message: body});
            return state;
        
        default:
            return state;
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


export default dialogsReducer;