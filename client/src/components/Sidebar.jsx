import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiSearch, FiX } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import logo from '../assets/logo_light.png';

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <button className={styles.closeButton} onClick={onClose}>
                <FiX size={24} />
            </button>
            <div className={styles.logo}>
                <img src={logo} alt="Productr" style={{ height: '32px' }} />
            </div>

            <div className={styles.searchBox}>
                <FiSearch className={styles.icon} style={{ marginRight: '8px' }} />
                <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>

            <nav className={styles.menu}>
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
                >
                    <FiHome className={styles.icon} />
                    Home
                </NavLink>
                <NavLink
                    to="/dashboard/products"
                    className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
                >
                    <FiShoppingBag className={styles.icon} />
                    Products
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
