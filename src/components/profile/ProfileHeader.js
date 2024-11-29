import React from 'react';
import styles from './ProfileHeader.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Alterlearn</div>
            <input type="text" className={styles.searchBar} placeholder="Buscar..." />
            <div className={styles.buttons}>
                <button style={{border: 'none', backgroundColor: 'transparent'}}>
                </button>
            </div>
        </header>
    );
};

export default Header;