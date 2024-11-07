export default function Footer() {
    return (
      <footer style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#333',
        color: 'white',
      }}>
        <button
          style={{
            margin: '0 1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#555',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => alert('Contáctanos')}
        >
          Contáctanos
        </button>
        <button
          style={{
            margin: '0 1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#555',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => alert('Ayuda')}
        >
          Ayuda
        </button>
      </footer>
    );
  }
  