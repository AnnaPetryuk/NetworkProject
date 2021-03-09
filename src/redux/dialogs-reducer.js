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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: 
            let body = action.newMessageBody;
            return {
                ...state,
                messagesData: [ ...state.messagesData, {mesId: 6, message: body} ]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
}

export default dialogsReducer;