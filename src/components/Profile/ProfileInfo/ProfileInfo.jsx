import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/user.jpg";
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {
    
    let [editMode, setEditMode] = useState(false);

    if(!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            savePhoto(e.target.files[0])
        }
    }

    const goToEditMode = () => {
        setEditMode(true);
    }

    const onSubmit = (formData) => {
        console.dir(formData);
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
        // .catch(() => {
        //     setEditMode(true);
        // })

        // 
        // props.login(formData.login, formData.password, formData.rememberMe)
    }

    return (
        <div>
            {/* <div>
                <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt={"Background"}/>
            </div> */}
            <div className={styles.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="ProfileImg"/>
                {isOwner && <input type={"file"} name="file" onChange={onMainPhotoSelected}/>}
                {editMode ? 
                    <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode}/>
                }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {/* ava + description */}
            </div>
        </div>
    );
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div>
                <b>Full name </b>{profile.fullName}
            </div>
            <div>
                <b>Looking for a job </b>{profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {profile.lookingForAJob && 
                <div>
                    <b>My hard skills </b>{profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me </b>{profile.aboutMe}
            </div>
            <div>
                <b>Contacts </b>
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
        </div>      
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={styles.contact}>
            <b>{contactTitle}</b> {contactValue}
        </div>
    )
}

export default ProfileInfo;
