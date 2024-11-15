import React from 'react';
import styles from './SearchHeader.module.css';

export default function Header () {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Alterlearn</div>
            <input type="text" className={styles.searchBar} placeholder="Buscar..." />
            <div className={styles.buttons}>
                <button className={styles.button}>Notificaciones</button>
                <button className={styles.button}>Carro</button>
                <button className={styles.button}>Perfil</button>
            </div>
        </header>
    );
};