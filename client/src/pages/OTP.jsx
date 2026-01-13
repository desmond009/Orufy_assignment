import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css'; // Reusing Login styles for consistent layout

const OTP = () => {
    const { state } = useLocation();
    const { verifyOtp } = useAuth();
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp(state?.email, otp.join(""));
        } catch (error) {
            console.error(error);
            alert("Invalid OTP");
        }
    };

    if (!state?.email) {
        return <div>Error: No email provided. <button onClick={() => navigate('/login')}>Go to Login</button></div>;
    }

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
                <h3 className={styles.title}>Verify OTP</h3>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Enter OTP</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {otp.map((data, index) => {
                                return (
                                    <input
                                        className={styles.input}
                                        type="text"
                                        name="otp"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        onChange={e => handleChange(e.target, index)}
                                        onKeyDown={e => handleKeyDown(e, index)}
                                        ref={el => inputRefs.current[index] = el}
                                        style={{ textAlign: 'center', width: '48px', height: '48px', padding: '0' }}
                                    />
                                );
                            })}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'red', marginTop: '0.5rem' }}>Please enter a valid OTP</p>
                    </div>

                    <button type="submit" className={styles.button}>Enter your OTP</button>

                    <div className={styles.footer} style={{ textAlign: 'center' }}>
                        Didn't receive OTP ? <span className={styles.link}>Resend in 20s</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTP;
