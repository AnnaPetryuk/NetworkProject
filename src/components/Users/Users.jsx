import React from "react";
import User from "./User/User";

let Users = ({users, ...props}) => {
    return (
        <div>
            {/* <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                pageSize={pageSize} onPageChanged={onPageChanged} /> */}
            <div>
                { users.map((item) => {
                    return <User user={item} 
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                        key={item.id}/>
                })}
            </div>
        </div>
    );
};

export default Users;
