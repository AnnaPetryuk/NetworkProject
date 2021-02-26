import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'

const Header = (props) => {
    return (
        <header className={styles.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Oikya_Front_Logo.png"/>

            <div className={styles.loginBlock}>
                { props.isAuth ? props.login :
                <NavLink to={'/login'}>Login</NavLink>
            }
            </div>
        </header>
    );
}

export default Header;