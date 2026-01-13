import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email);
            // Navigate to OTP with email state
            navigate('/otp', { state: { email } });
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <img src="/src/assets/runner.png" alt="Productr" className={styles.logo} />
                <div className={styles.card}>
                    <div className={styles.cardInner}>
                        <img src="/src/assets/runner.png" alt="Runner" className={styles.runnerImage} />
                        <h2 className={styles.cardText}>Uplist your product to market</h2>
                    </div>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <h3 className={styles.title}>Login to your Productr Account</h3>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email or Phone number</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter email or phone number"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Login</button>

                    <div className={styles.footer} style={{ textAlign: 'center' }}>
                        Don't have a Productr Account? <span className={styles.link} onClick={() => navigate('/signup')}>SignUp Here</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
