import React from 'react';
<<<<<<< HEAD
import styles from '../styles/components/Footer.module.css';
=======
import styles from './Footer.module.css';
>>>>>>> f3f0d0e0825c34b1acc8441949e52680faf5375f
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>Alterlearn®</span>
      <Link href="/contact"><button className={styles.button}>Contáctanos</button></Link>
      <Link href="/help"><button className={styles.button}>Ayuda</button></Link>
    </footer>
  );
}
