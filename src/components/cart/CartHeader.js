import React from 'react';
<<<<<<< HEAD
import styles from '../styles/components/Header.module.css';
=======
import styles from './CartHeader.module.css';
import Link from 'next/link';
>>>>>>> f3f0d0e0825c34b1acc8441949e52680faf5375f

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Alterlearn</div>
            <input type="text" className={styles.searchBar} placeholder="Buscar..." />
            <div className={styles.buttons}>
                <button className={styles.button}>Notificaciones</button>
<<<<<<< HEAD
                <button className={styles.button}>Carro</button>
=======
                <Link href="/chat"><button className={styles.button}>Chats</button></Link>
>>>>>>> f3f0d0e0825c34b1acc8441949e52680faf5375f
                <button className={styles.button}>Perfil</button>
            </div>
        </header>
    );
};

export default Header;