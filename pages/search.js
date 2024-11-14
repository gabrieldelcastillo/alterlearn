import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Search() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ display: 'flex', flex: 1, padding: '20px' }}>
                <aside style={{ width: '250px', paddingRight: '20px', borderRight: '1px solid #ccc' }}>
                    <h3>Filtros</h3>
                    <button style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>Limpiar Todo</button>

                    <div style={{ marginTop: '20px' }}>
                        <h4>CATEGORÍA</h4>
                        <div>
                            <input type="checkbox" id="certamenes" />
                            <label htmlFor="certamenes"> Certamenes</label>
                        </div>
                        <div>
                            <input type="checkbox" id="controles" />
                            <label htmlFor="controles"> Controles</label>
                        </div>
                        <div>
                            <input type="checkbox" id="tareas" />
                            <label htmlFor="tareas"> Tareas</label>
                        </div>
                        <div>
                            <input type="checkbox" id="apuntes" />
                            <label htmlFor="apuntes"> Apuntes</label>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h4>CARRERA</h4>
                        {['Ingeniería Civil Informática', 'Ingeniería Industrial', 'Farmacéutica', 'Medicina', 'Economía', 'Derecho'].map((carrera) => (
                            <div key={carrera}>
                                <input type="checkbox" id={carrera} />
                                <label htmlFor={carrera}> {carrera}</label>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h4>ASIGNATURA</h4>
                        {['Fundamentos de Matemáticas', 'Álgebra', 'Fundamentos de Física', 'Fundamentos de Programación', 'Cálculo Diferencial', 'Química'].map((asignatura) => (
                            <div key={asignatura}>
                                <input type="checkbox" id={asignatura} />
                                <label htmlFor={asignatura}> {asignatura}</label>
                            </div>
                        ))}
                    </div>
                </aside>

                <main style={{ flex: 1, paddingLeft: '20px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} style={{ width: '200px', border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                                <div style={{ width: '100%', height: '150px', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
                                <p>ECONOMIA-CERTAMEN {index + 1}-ÁLGEBRA</p>
                                <p style={{ fontWeight: 'bold' }}>${(index + 1) * 5000}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <Footer/>
        </div>
    );
}
