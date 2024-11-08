import React from 'react';
import Link from 'next/link';

export default function Publish() {
    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #ccc' }}>
                <h1>Alterlearn</h1>
                <div>
                    <button>Profile</button>
                    <Link href="/cart">
                        <button>Cart (0)</button>
                    </Link>
                </div>
            </header>

            {/* Main content */}
            <main style={{ display: 'flex', marginTop: '20px' }}>
                {/* Left section for file upload and image previews */}
                <section style={{ flex: 1, marginRight: '20px' }}>
                    <button style={{ display: 'block', marginBottom: '10px', backgroundColor: 'red', color: 'white', padding: '10px' }}>Subir archivo</button>
                    <div style={{ width: '100%', height: '300px', border: '1px solid #ccc', marginBottom: '10px' }}></div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ width: '50px', height: '50px', border: '1px solid #ccc' }}></div>
                        <div style={{ width: '50px', height: '50px', border: '1px solid #ccc' }}></div>
                        <div style={{ width: '50px', height: '50px', border: '1px solid #ccc' }}></div>
                    </div>
                </section>

                {/* Right section for form inputs */}
                <section style={{ flex: 1 }}>
                    <h2>Título del producto a vender</h2>
                    <textarea placeholder="Sección de descripción del producto" style={{ width: '100%', height: '100px', marginBottom: '10px' }}></textarea>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label htmlFor="price" style={{ marginRight: '10px' }}>Seleccionar precio</label>
                        <select id="price" style={{ marginRight: '10px' }}>
                            <option>10.000</option>
                            <option>20.000</option>
                            <option>30.000</option>
                            {/* Agregar más opciones según sea necesario */}
                        </select>
                        <span>$10.000</span>
                    </div>

                    <button style={{ backgroundColor: '#0070f3', color: 'white', padding: '10px', width: '100%', marginBottom: '20px' }}>Publicar</button>

                    <div>
                        <h3>Selecciona filtros para tu publicación</h3>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <select>
                                <option>Categoría</option>
                            </select>
                            <select>
                                <option>Carrera</option>
                            </select>
                            <select>
                                <option>Asignatura</option>
                            </select>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer section */}
            <footer style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px 0', borderTop: '1px solid #ccc', marginTop: '20px' }}>
                <button>Perfil</button>
                <button>Contactos</button>
                <button>Compras</button>
                <button>Ayuda</button>
            </footer>
        </div>
    );
}