import styles from "./ProfileInfo.module.css";
// import Post from "./Post/Post";

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" />
            </div>
            <div className={styles.descriptionBlock}>
                ava + description
            </div>
        </div>
    );
};

export default ProfileInfo;
