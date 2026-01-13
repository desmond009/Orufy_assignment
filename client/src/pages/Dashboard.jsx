import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiSettings, FiUser, FiSearch, FiLogOut, FiChevronDown, FiMenu } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Determine title based on path
    const getTitle = () => {
        if (location.pathname.includes('products')) return 'Products';
        return 'Home';
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setShowDropdown(false);
        logout();
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
            )}

            <div className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.breadcrumb}>
                        <button className={styles.menuButton} onClick={toggleSidebar}>
                            <FiMenu size={24} />
                        </button>
                        <FiSearch className={styles.searchIcon} />
                        {getTitle()}
                    </div>
                    <div className={styles.userProfile}>
                        <div className={styles.searchBar}>
                            <FiSearch className={styles.searchInputIcon} />
                            <input
                                type="text"
                                placeholder="Search Services, Products"
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className={styles.userInfoWrapper} ref={dropdownRef}>
                            <div
                                className={styles.userInfo}
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <div className={styles.avatar}>
                                    <FiUser size={18} />
                                </div>
                                <div className={styles.userDetails}>
                                    <div className={styles.userName}>{user?.name || user?.email || 'User'}</div>
                                    <div className={styles.userEmail}>{user?.email}</div>
                                </div>
                                <FiChevronDown
                                    className={`${styles.dropdownIcon} ${showDropdown ? styles.dropdownIconOpen : ''}`}
                                />
                            </div>
                            {showDropdown && (
                                <div className={styles.dropdown}>
                                    <button
                                        className={styles.logoutButton}
                                        onClick={handleLogout}
                                    >
                                        <FiLogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <div className={styles.content}>
                    <Outlet context={{ searchTerm }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
