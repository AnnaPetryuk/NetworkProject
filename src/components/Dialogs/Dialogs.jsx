import { NavLink } from "react-router-dom";
import { sendMessageCreator ,updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import DialogItem from "./DialogItem/DialogItem";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let state = props.store.getState().dialogsPage;

    let newMessageBody = state.newMessageBody;
    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }
    console.dir(state.dialogsData);
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                { state.dialogsData.map((item) => {
                    return <DialogItem key={item.pathId} name={item.name} pathId={item.pathId}/>
                })}
            </div>
            <div className={styles.messages}>
                <div>
                    { state.messagesData.map((item) => {
                        return <Message key={item.mesId} message={item.message}/>
                    })}
                </div>
                <div>
                    <div><textarea placeholder="Enter message" value={newMessageBody}
                    onChange={onNewMessageChange}></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
