import React, { ChangeEvent } from 'react';

type PropsType = {
    status: string,
    updateStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean,
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        //alert(this.state.editMode); // false
        // Set state асинхронний метод
        this.setState({
            editMode: true
        })

        //alert(this.state.editMode); // false
        // Спочатку виконаються alert 1 і 2
        // потім setState
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
            status: this.props.status
        })
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    // Сюди приходять об'єкти попередніх пропсів і попереднього стейта
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        // Тут можна міняти стейт лише за якоїсь умови
        // Якщо не буде умови => зациклиться
        if(prevProps.status !== this.props.status) {
            debugger;
            this.setState({
                status: this.props.status
            })
        }
        
    }

    render() {
        return (
            <div>
                {!this.state.editMode 
                    ? 
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '----' }</span>
                    </div>
                    :
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>
                }
            </div>
        );
    }
    
};

export default ProfileStatus;
