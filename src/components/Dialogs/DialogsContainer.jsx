import { sendMessageCreator ,updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state = props.store.getState().dialogPage;
    
    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    }

    let onNewMessageChange = (body) => {
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }
    console.dir(state.dialogsData);
    return (
        <Dialogs 
            updateNewMessageBody={onNewMessageChange}
            sendMessage={onSendMessageClick}
            dialogPage={state}
        />
    );
};

export default DialogsContainer;
