import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';
import Link from 'next/link';

export default function Init() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'space-between' }}>
      {/* Header */}
      <header style={{ padding: '20px', width: '100%', textAlign: 'center', borderBottom: '1px solid #ccc' }}>
        <h1>ALTERLEARN</h1>
      </header>

      {/* Main content with buttons */}
      <main style={{ flex: 1, display: 'flex', width: '100%' }}>
        {/* Botón de Publicar Recurso */}
        <div style={{ flex: 1 }}>
          <Link href="/publish" passHref>
            <button style={{ width: '100%', height: '100%', padding: '50px', fontSize: '24px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
              Publicar Recurso
            </button>
          </Link>
        </div>

        {/* Botón de Buscar Recursos */}
        <div style={{ flex: 1 }}>
          <Link href="/search" passHref>
            <button style={{ width: '100%', height: '100%', padding: '50px', fontSize: '24px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
              Buscar Recursos
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '20px', width: '100%', textAlign: 'center', borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'space-evenly' }}>
        <button>Contáctanos</button>
        <button>Ayuda</button>
      </footer>
    </div>
  );
}
