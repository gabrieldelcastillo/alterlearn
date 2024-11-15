import React from 'react';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Cart() {
  // Ejemplo de productos en el carrito
  const cartItems = [
    { id: 1, name: 'ECONOMIA-CERTAMEN2-ALGEBRA', price: 7000, description: 'Descripción en proceso...' },
    { id: 2, name: 'ECONOMIA-CERTAMEN3-ALGEBRA', price: 7000, description: 'Descripción en proceso...' },
    { id: 3, name: 'ECONOMIA-EXAMEN-ALGEBRA', price: 20000, description: 'Descripción en proceso...' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const commission = subtotal * 0.05; // Comisión del 5%
  const total = subtotal + commission;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header/>

      <div style={{ display: 'flex', flex: 1, padding: '20px' }}>
        <div style={{ flex: 2 }}>
          <h2>Tu Carrito</h2>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#e0e0e0', marginRight: '20px' }}></div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                <p style={{ margin: '5px 0' }}>{item.description}</p>
              </div>
              <p style={{ fontWeight: 'bold' }}>${item.price.toLocaleString()}</p>
              <button style={{ marginLeft: '20px', color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
            </div>
          ))}
        </div>

        {/* Resumen y acciones */}
        <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc' }}>
          <div style={{ marginBottom: '20px' }}>
            <p>Subtotal: ${subtotal.toLocaleString()}</p>
            <p>Comisión: ${commission.toLocaleString()}</p>
            <hr />
            <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Total: ${total.toLocaleString()}</p>
          </div>
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: '#fff', border: 'none', marginBottom: '10px', cursor: 'pointer' }}>
            Continuar Comprando
          </button>
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Pagar
          </button>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
