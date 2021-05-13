import React from 'react';
import { reduxForm } from 'redux-form';
import { CreateField, Input, TextArea } from '../../common/formsControllers/formController';

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            { error && <div>
                {error}
            </div>}
            <div>
                <b>Full name </b>
                {CreateField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job </b>
                { CreateField('','lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My hard skills </b>
                {CreateField('Hard skills', 'lookingForAJobDescription', [], TextArea)}
            </div>
            <div>
                <b>About me </b>
                {CreateField('About me', 'aboutMe', [], TextArea)}
            </div>
            <div>
                <b>Contacts </b>
                {Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key}>
                            <b>{key}</b>
                            {CreateField(key, 'contacts.' + key, [], Input)}
                        </div>
                    )
                })}
            </div>
        </form>      
    )
} 

const ProfileReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileReduxForm;
