import React from 'react';
import styles from './CartHeader.module.css';
import Link from 'next/link';
import Image from 'next/image';
import notifications from '/src/public/notifications.png'
import access from '/src/public/access.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Alterlearn</div>
            <input type="text" className={styles.searchBar} placeholder="Buscar..." />
            <div className={styles.buttons}>
                <button style={{border: 'none', backgroundColor: 'transparent'}}>
                    <Image src={notifications} width={35}/>
                </button>
                <Link href="/profile"><Image src={access} width={35}/></Link>
            </div>
        </header>
    );
};

export default Header;