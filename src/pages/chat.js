import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Chat() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', height: '100vh', border: '1px solid #ccc' }}>
            <aside style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
                <input
                    type="text"
                    placeholder="Buscar chat"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
                <div style={{ overflowY: 'auto', height: 'calc(100vh - 60px)', border: '1px solid #ddd', borderRadius: '5px' }}>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                            <p style={{ margin: '0', fontWeight: i % 2 === 0 ? 'bold' : 'normal' }}>Chat {i + 1}</p>
                            <p style={{ margin: '0', color: '#888' }}>último mensaje</p>
                        </div>
                    ))}
                </div>
            </aside>

            <main style={{ flex: 1, display: 'block', flexDirection: 'column' }}>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    padding: '20px',
                    overflowY: 'auto'
                }}>

                    <div style={{ 
                        marginRight: 'auto', 
                        background: '#efe', 
                        padding: '10px 15px', 
                        borderRadius: '15px', 
                        marginBottom: '10px', 
                        maxWidth: '50%' }}>
                        entonces te lo rebajo 500
                    </div>
                    <div style={{ 
                        marginLeft: 'auto', 
                        background: '#d1ffd1', 
                        padding: '10px 15px', 
                        borderRadius: '15px', 
                        marginBottom: '10px', 
                        maxWidth: '50%' }}>
                        vale, gracias
                    </div>
                </div>

                <footer style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '10px', 
                    borderTop: '1px solid #ccc' }}>
                    <button style={{ 
                        fontSize: '24px', 
                        marginRight: '10px' }}>+</button>
                    <input
                        type="text"
                        placeholder="Escribe tu mensaje..."
                        style={{ 
                            flex: 1, 
                            padding: '10px', 
                            borderRadius: '20px', 
                            border: '1px solid #ddd' }}
                    />
                    <button style={{ 
                        marginLeft: '10px', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none' }}>
                        Enviar
                    </button>
                </footer>
            </main>
            <Footer/>
        </div>
    );
}