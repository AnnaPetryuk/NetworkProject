import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {
    if(!profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/* <div>
                <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt={"Background"}/>
            </div> */}
            <div className={styles.descriptionBlock}>
                <img src={profile.photos.large} alt="ProfileImg"/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {/* ava + description */}
            </div>
        </div>
    );
};

export default ProfileInfo;
