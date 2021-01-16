import axios from 'axios';
import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.jpg'

const Users = (props) => {
    /* Не правильно нарушається правило 
    чистої презентаційної функції*/
    if(props.users.length === 0) {
        axios
            .get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                props.setUsers(response.data.items);
            });
    }
    // props.setUsers(
        //     [
        //         { id: 1, photoUrl: 'https://avatarfiles.alphacoders.com/101/thumb-101498.jpg', followed: true, fullName: "Anna", status: 'I am happy', location: {city: 'Kyiv', country: 'Ukraine'}},
        //         { id: 2, photoUrl: 'https://avatarfiles.alphacoders.com/101/thumb-101498.jpg', followed: true, fullName: "Anna", status: 'I am a boss', location: {city: 'Lviv', country: 'Ukraine'}},
        //         { id: 3, photoUrl: 'https://avatarfiles.alphacoders.com/101/thumb-101498.jpg', followed: false, fullName: "Anna", status: 'I am happy', location: {city: 'Odessa', country: 'Ukraine'}},
        //         { id: 4, photoUrl: 'https://avatarfiles.alphacoders.com/101/thumb-101498.jpg', followed: true, fullName: "Anna", status: 'I am a boss', location: {city: 'Kyiv', country: 'Ukraine'}}
        //     ]
        // )
    
    return (
        <div> 
            { 
                props.users.map(item => {
                    return <div key={item.id}>
                        <span>
                            <div>
                                <img src={item.photos.small != null ? item.photos.small : userPhoto} className={styles.userPhoto}/>
                            </div>
                            <div>
                                { item.followed ?
                                    <button onClick={() => { props.unfollow(item.id)}}>Unfollow</button>
                                    :
                                    <button onClick={() => { props.follow(item.id)}}>Follow</button>
                                }
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
                }) 
            } 
        </div>
    );
}

export default Users;