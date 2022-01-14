import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { FormAction } from 'redux-form';

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

export type InititialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const dialogsReducer = (
    state = initialState,
    action: ActionsType
): InititialStateType => {
    switch (action.type) {
        case "SN/DIALOG/SEND_MESSAGE":
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

export const actions = {
  sendMessageCreator: (newMessageBody: string) =>
    ({ type: "SN/DIALOG/SEND_MESSAGE", newMessageBody } as const),
};

export default dialogsReducer;
