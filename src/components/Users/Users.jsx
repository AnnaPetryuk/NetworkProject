import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import { NavLink } from "react-router-dom";
import axios from "axios";

let Users = (props) => {

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
                                <NavLink to={'/profile/' + item.id}>
                                    <img
                                        src={
                                            item.photos.small != null
                                                ? item.photos.small
                                                : userPhoto
                                        }
                                        className={styles.userPhoto}
                                    />
                                </NavLink>
                            </div>
                            <div>
                                {item.followed ? (
                                    <button onClick={() => { 
                                        axios
                                        .delete(`https://social-network.samuraijs.com/api/1.0/follow/${item.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': 'f4312565-4c71-409b-a1cf-1bf8e3ca655e'
                                            }
                                        })
                                        .then(response => {
                                            if(response.data.resultCode == 0) {
                                                props.unfollow(item.id) 
                                            }
                                        });
                                        
                                    }}>
                                        Unfollow
                                    </button>
                                ) : (
                                    <button onClick={() => { 
                                        axios
                                        .post(`https://social-network.samuraijs.com/api/1.0/follow/${item.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': 'f4312565-4c71-409b-a1cf-1bf8e3ca655e'
                                            }
                                        })
                                        .then(response => {
                                            if(response.data.resultCode == 0) {
                                                props.follow(item.id) 
                                            }
                                        });
                                    }}>
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
