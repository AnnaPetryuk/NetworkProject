import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/user.jpg";

const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto}) => {
    if(!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            {/* <div>
                <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt={"Background"}/>
            </div> */}
            <div className={styles.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="ProfileImg"/>
                {isOwner && <input type={"file"} name="file" onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {/* ava + description */}
            </div>
        </div>
    );
};

export default ProfileInfo;
