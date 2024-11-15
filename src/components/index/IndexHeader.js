import React from 'react';

export default function HeaderLanding () {
    return (
        <header style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '1rem', 
            borderColor: "black"}}>
            <h1 style={{fontSize: '1.8em'}}>Alterlearn</h1>
            <div>
                <button style={{ marginRight: '10px' }}>Acceder</button>
                <button>Registrarse</button>
            </div>
        </header>
    );
};