import React from 'react';

class ProfileStatus extends React.Component {

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

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
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
