import { NavLink } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';

const Navbar = () => {
    const auth = useAuth();

    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <NavLink to='/'>
                    <img alt='' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png'/>
                </NavLink>
            </div>
    
            <div className={styles.rightNav}>
                {auth.user && <div className={styles.user}>
                    <NavLink to='/settings'>
                        <img 
                        src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' 
                        alt='' 
                        className={styles.userDp}/>
                    </NavLink>
                    <span>{auth.user.name}</span>
                </div>}

                <div className={styles.navLinks}>
                    <ul>
                    {auth.user ? 
                    <>
                        <li onClick={auth.logout}>Log out</li>
                    </> : 
                    <>
                        <li>
                            <NavLink to='/login'>Log In</NavLink>
                        </li>
                        <li>
                            <NavLink to='/register'>Register</NavLink>
                        </li>
                    </>
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;