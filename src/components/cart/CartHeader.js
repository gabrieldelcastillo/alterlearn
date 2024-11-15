import React from 'react';
import styles from './CartHeader.module.css';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Alterlearn</div>
            <input type="text" className={styles.searchBar} placeholder="Buscar..." />
            <div className={styles.buttons}>
                <button className={styles.button}>Notificaciones</button>
                <Link href="/chat"><button className={styles.button}>Chats</button></Link>
                <button className={styles.button}>Perfil</button>
            </div>
        </header>
    );
};

export default Header;