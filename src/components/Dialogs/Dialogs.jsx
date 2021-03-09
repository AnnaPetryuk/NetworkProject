import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import DialogItem from "./DialogItem/DialogItem";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let state = props.dialogPage;
    
    let addNewMessage = (value) => {
        props.sendMessage(value.newMessageBody);
    }

    if(!props.isAuth) {
        return <Redirect to={"/login"}/>
    }
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
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
};

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogMessageForm'})(AddMessageForm);

export default Dialogs;
