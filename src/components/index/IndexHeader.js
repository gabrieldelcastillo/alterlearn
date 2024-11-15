import React from 'react';
import Link from 'next/link';

export default function HeaderLanding() {
    return (
        <header style={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            position: 'revert',
            width: '100%',
            textAlign: 'center'}}>

            <h1 style={{
                fontSize: '3em',
                fontWeight: 'bold',
                color: '#333'
            }}>Alterlearn</h1>

            <div style={{
                display: 'flex',
                gap: '10px',
            }}>
                <Link href="/access">
                    <button style={{
                        padding: '8px 12px',
                        fontSize: '0.9em',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius:'4px'}}>Acceder</button></Link>
                <Link href="/register">
                    <button style={{
                        padding: '8px 12px',
                        fontSize: '0.9em',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius:'4px'
                    }}>Registrarse</button></Link>
            </div>
        </header>
    );
};