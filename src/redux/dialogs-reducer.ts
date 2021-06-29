const SEND_MESSAGE = "SEND-MESSAGE";

type Dialog = {
    pathId: number,
    name: string
}

type Message = {
    mesId: number,
    message: string
}

let initialState = {
    messagesData: [
        { mesId: 1, message: "Hi" },
        { mesId: 2, message: "Hello" },
        { mesId: 3, message: "How are you?" },
        { mesId: 4, message: "Hi" },
        { mesId: 5, message: "Hey" },
    ] as Array<Message>,
    dialogsData: [
        { pathId: 1, name: "Svitlana" },
        { pathId: 2, name: "Sasha" },
        { pathId: 3, name: "Vova" },
        { pathId: 4, name: "Sophia" },
        { pathId: 5, name: "Tania" },
    ] as Array<Dialog>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
    state = initialState,
    action: any
): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messagesData: [
                    ...state.messagesData,
                    { mesId: 6, message: body },
                ],
            };
        default:
            return state;
    }
};

type SendMessageCreatorActionType =  {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => {
    return {
        type: SEND_MESSAGE,
        newMessageBody,
    };
};

export default dialogsReducer;
