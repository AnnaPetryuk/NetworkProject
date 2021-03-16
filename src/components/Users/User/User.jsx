import React from "react";
import styles from "../Users.module.css";
import userPhoto from "../../../assets/images/user.jpg";
import { NavLink } from "react-router-dom";

let User = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div className={styles.user}>
            <NavLink to={'/profile/' + user.id}>
                <img
                    src={
                        user.photos.small != null
                            ? user.photos.small
                            : userPhoto
                    }
                    alt="ProfileImg"
                    className={styles.userPhoto}
                />
            </NavLink>
            <div className={styles.userInfo}>
                <div>{user.name}</div>
                <div>{user.status}</div>
                <div>
                    {user.followed ? (
                        <button className={styles.userButton} disabled={followingInProgress.some(id => id === user.id)} 
                                    onClick={() => { unfollow(user.id)}}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button className={styles.userButton} disabled={followingInProgress.some(id => id === user.id)} 
                                    onClick={() => { follow(user.id)}}
                        >
                            Follow
                            </button>
                        )}
                </div>
            </div>    
        </div>
    )
};

export default User;
