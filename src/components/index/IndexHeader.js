import React from 'react';

const HeaderLanding = () => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <h1>Alterlearn</h1>
            <div>
                <button style={{ marginRight: '10px' }}>Acceder</button>
                <button>Registrarse</button>
            </div>
        </header>
    );
};

export default HeaderLanding;
