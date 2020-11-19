import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                { props.state.dialogsData.map((item) => {
                    return <DialogItem key={item.pathId} name={item.name} pathId={item.pathId}/>
                })}
            </div>
            <div className={styles.messages}>
                { props.state.messagesData.map((item) => {
                    return <Message key={item.mesId} message={item.message}/>
                })}
            </div>
        </div>
    );
};

export default Dialogs;
