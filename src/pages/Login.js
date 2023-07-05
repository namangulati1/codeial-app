import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setloggingIn] = useState(false);
    const { addToast } = useToasts();
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setloggingIn(true);
        if(!email || !password){
            return addToast('Please enter both email and password', {
                appearance: 'error',
            })
        }
        const response = await auth.login(email, password);

        if(response.success){
            addToast('Successfully logged in', {
                appearance: 'success',
            })
        }
        else{
            addToast(response.message, {
                appearance: 'error',
            })
        }
        setloggingIn(false);
    };
    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);
    return (
    <form className={styles.loginForm} onSubmit={handleSubmit}> 
        <span className={styles.loginSignupHeader}>Log In</span>
        
        <div className={styles.field}>
            <input 
            type='email' 
            placeholder='Email'  
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className={styles.field}>
            <input 
            type='password' 
            placeholder='Password'  
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className={styles.field}>
            <button disabled={loggingIn}>
                {loggingIn ? 'Logging In...' : 'Login'}
            </button>
        </div>
    </form>
)};

export default Login;