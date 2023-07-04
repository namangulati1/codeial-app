import { NavLink } from 'react-router-dom';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <NavLink to='/'>
                    <img alt='' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png'/>
                </NavLink>
            </div>
    
            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <a href='/'>
                        <img 
                        src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' 
                        alt='' 
                        className={styles.userDp}/>
                    </a>
                    <span>Naman</span>
                </div>

                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <NavLink to='/login'>Log In</NavLink>
                        </li>
                        <li>
                            <NavLink to='/'>Log out</NavLink>
                        </li>
                        <li>
                        <a href='/'>Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;