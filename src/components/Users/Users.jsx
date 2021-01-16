import axios from 'axios';
import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.jpg'

class Users extends React.Component {

    // Якщо конструктор нічого не роботить окрім
    // Коду, що нижче, він не потрібен
    /*constructor(props) {
        super(props);
    }*/

    // Calls when component is rendered
    // Hook for ajax requests
    // Hook for all side effects
    // DOM is ready
    componentDidMount() {
        axios
            .get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    // Hook for rerender componenrs
    componentDidUpdate() {

    }
    
    render() {
        return (
            <div> 
                { 
                    this.props.users.map(item => {
                        return <div key={item.id}>
                            <span>
                                <div>
                                    <img src={item.photos.small != null ? item.photos.small : userPhoto} className={styles.userPhoto}/>
                                </div>
                                <div>
                                    { item.followed ?
                                        <button onClick={() => { this.props.unfollow(item.id)}}>Unfollow</button>
                                        :
                                        <button onClick={() => { this.props.follow(item.id)}}>Follow</button>
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
        )
    }
}

export default Users;