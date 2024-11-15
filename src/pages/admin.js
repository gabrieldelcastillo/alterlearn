import React, { useState } from 'react';

export default function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const pendingReviews = [
    { title: 'f_mec_c2_energia', price: 4500, subject: 'Física Mecánica', type: 'Certamen (solución)' },
    { title: 'fund_mat_control3', price: 2250, subject: 'Fundamentos de Matemáticas', type: 'Control (solo)' },
    { title: 'programacion2_hacks', price: 3550, subject: 'Programación II', type: 'Apuntes' },
  ];

  const characteristics = [
    'Legible', 'Coherencia', 'Precio Acorde',
    '...', '...', '...',
    '...', '...', '...', '...', '...', '...',
  ];

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  return (
    <div style={{ display: 'flex', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Título</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Precio</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Asignatura</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {pendingReviews.map((review, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{review.title}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{review.price}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{review.subject}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{review.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
        <div style={{ width: '80%', height: '400px', border: '1px solid #ccc', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Vista previa de la página {currentPage}</p>
        </div>
        <input 
          type="number" 
          value={currentPage} 
          onChange={handlePageChange} 
          min="1" 
          style={{ width: '50px', textAlign: 'center', marginBottom: '20px' }}
        />
        <div style={{ display: 'flex', gap: '20px' }}>
          <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            Aprobar
          </button>
          <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
            Rechazar
          </button>
        </div>
      </div>

      <div style={{ width: '30%', padding: '10px' }}>
        {characteristics.map((char, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input type="checkbox" id={`char-${index}`} style={{ marginRight: '10px' }} />
            <label htmlFor={`char-${index}`}>{char}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
