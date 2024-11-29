import React from "react";
import Image from "next/image";
import Link from "next/link";
import access from '/src/public/access.png';
import cart from '/src/public/cart.png'

export default function NoUserHeader() {
    return (
        <header style={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            position: 'revert',
            width: '100%',
            textAlign: 'center',
            marginTop: '-30px'
        }}>
            
            <h1 style={{
                fontSize: '3em',
                fontWeight: 'bold',
                color: '#333',
            }}>Alterlearn</h1>

            <input type='text' placeholder='Buscar recurso' style={{
                flexGrow: '1', 
                margin: '0 20px', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px'}}></input>

            <Link href="/cart"><Image src={cart} width={35}/></Link>
            <Link href="/access"><Image src={access} width={35}/></Link>

        </header>
    );
};