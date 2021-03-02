import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt={"Background"}/>
            </div>
            <div className={styles.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + description
            </div>
        </div>
    );
};

export default ProfileInfo;
