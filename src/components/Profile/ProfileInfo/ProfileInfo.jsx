import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from "./ProfileInfo.module.css";
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/* <div>
                <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt={"Background"}/>
            </div> */}
            <div className={styles.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={'test'}/>
                {/* ava + description */}
            </div>
        </div>
    );
};

export default ProfileInfo;
