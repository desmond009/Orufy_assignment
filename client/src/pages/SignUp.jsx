import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css'; // Reusing Login styles

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, name);
            navigate('/otp', { state: { email } });
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Signup failed');
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
                <h3 className={styles.title}>Create your Productr Account</h3>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className={styles.button}>Sign Up</button>

                    <div className={styles.footer} style={{ textAlign: 'center' }}>
                        Already have an account? <span className={styles.link} onClick={() => navigate('/login')}>Login Here</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
