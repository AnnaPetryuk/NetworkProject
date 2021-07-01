import React from "react";
import { UserType } from "../../types/types";
import User from "./User/User";
import styles from "./Users.module.css";

type PropsType = {
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({users, ...props}) => {
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
