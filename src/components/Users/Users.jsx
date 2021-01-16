import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";

let Users = (props) => {
    debugger;
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
        
    let pages = [];
    for(let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map((p) => {
                    return (
                        <span
                            className={
                                props.currentPage === p &&
                                styles.selectedPage
                            }
                            onClick={(e) => {
                                props.onPageChanged(p);
                            }}
                        >
                            {p}&nbsp;
                        </span>
                    );
                })}
            </div>

            {props.users.map((item) => {
                return (
                    <div key={item.id}>
                        <span>
                            <div>
                                <img
                                    src={
                                        item.photos.small != null
                                            ? item.photos.small
                                            : userPhoto
                                    }
                                    className={styles.userPhoto}
                                />
                            </div>
                            <div>
                                {item.followed ? (
                                    <button
                                        onClick={() => {
                                            props.unfollow(item.id);
                                        }}
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            props.follow(item.id);
                                        }}
                                    >
                                        Follow
                                    </button>
                                )}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{item.name}</div>
                                <div>{item.status}</div>
                            </span>
                            <span>
                                <div>"item.location.country"</div>
                                <div>"item.location.city"</div>
                            </span>
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Users;
