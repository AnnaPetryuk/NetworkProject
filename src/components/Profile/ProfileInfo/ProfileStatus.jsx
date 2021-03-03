import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode() {
        alert(this.state.editMode); // false
        
        // Set state асинхронний метод
        this.setState({
            editMode: true
        })

        alert(this.state.editMode); // false
        // Спочатку виконаються alert 1 і 2
        // потім setState
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode 
                    ? 
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
                    </div>
                }
                
                
            </div>
        );
    }
    
};

export default ProfileStatus;
