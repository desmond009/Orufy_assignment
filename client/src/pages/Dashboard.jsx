import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const location = useLocation();
    const { logout } = useAuth();

    // Determine title based on path
    const getTitle = () => {
        if (location.pathname.includes('products')) return 'Products';
        return 'Home';
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.breadcrumb}>{getTitle()}</div>
                    <div className={styles.userProfile}>
                        {/* Search bar could be here too per design? No sidebar has search */}
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Search Services, Products</div>
                        <div className={styles.avatar}>
                            <img src="https://via.placeholder.com/32" alt="User" />
                        </div>
                        <button
                            onClick={logout}
                            style={{
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </header>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
