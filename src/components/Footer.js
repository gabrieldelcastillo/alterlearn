import React from 'react';
import styles from '../styles/Footer.module.css';
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
