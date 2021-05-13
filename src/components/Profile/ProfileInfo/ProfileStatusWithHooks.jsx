import React, { useEffect, useState } from 'react';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    
    // Запускає після того, коли функція отрисуется
    useEffect(() => {
        setStatus(props.status);
        // якщо змінюється props.status => перемалюй компоненту
    }, [props.status]) // пустой масив => отрисуется 1 раз // так указывать нельзя

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode
                ? 
                <div>
                    <b>Status: </b>
                    <span onDoubleClick={activateEditMode}>{props.status || '----' }</span>
                </div>
                :
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;
