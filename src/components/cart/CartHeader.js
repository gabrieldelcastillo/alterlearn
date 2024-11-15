import React from 'react';
import styles from './CartHeader.module.css';
import Link from 'next/link';

export default function CartHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Alterlearn</div>
            <input type="text" className={styles.searchBar} placeholder="Buscar..." />
            <div className={styles.buttons}>
                <button className={styles.button}>Notificaciones</button>
                <button className={styles.button}>Perfil</button>
            </div>
        </header>
    );
};