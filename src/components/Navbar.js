import { Link, NavLink } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';



const Navbar = () => {
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const auth = useAuth();

    const handleUserClick = () => {
        setSearchText('');
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await searchUsers(searchText);
            if(response.success) {
                setResults(response.data.users);
            }
        };
        if(searchText.length > 2){
            fetchUsers();
        } else {
            setResults([])
        }

    }, [searchText])

    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <NavLink to='/'>
                    <img alt='' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png'/>
                </NavLink>
            </div>

            <div className={styles.searchContainer}>
                <img className={styles.searchIcon} src='https://cdn-icons-png.flaticon.com/128/3031/3031293.png' alt=''/>
                <input 
                placeholder='Search Users' 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                /> 
                {results.length > 0 && <div className={styles.searchResults}>
                    <ul>
                        {results.map(user => <li className={styles.searchResultsRow} key={`user-${user._id}`}>
                            <NavLink to={`/user/${user._id}`} onClick={handleUserClick}>
                                <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt=''/>
                                <span>{user.name}</span>
                            </NavLink>
                        </li>)}
                    </ul>
                </div>}
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