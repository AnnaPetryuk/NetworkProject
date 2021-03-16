import React from "react";
import User from "./User/User";
import styles from "./Users.module.css";

let Users = ({users, ...props}) => {
    return (
        <div className={styles.userContainer}>
            { users.map((item) => {
                return <User user={item} 
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow}
                    key={item.id}/>
            })}
        </div>
    );
};

export default Users;
