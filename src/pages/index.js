import { useState } from 'react';
import { useRouter } from 'next/router';
import { parsePagesSegmentConfig } from 'next/dist/build/segment-config/pages/pages-segment-config';

export default function Acceso() {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');


  // Función para cambiar entre "Registrarse" y "Acceder"
  const toggleAccessMode = () => {
    setIsRegister(!isRegister);
  };

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if(username === 'admin' && password === '1234') {
      router.push("/admin");
    }
    router.push('/init'); // Redirige a la página de inicio
  };

  return (
    <div style={styles.container}>
      {/* Imagen a la izquierda */}
      <div style={styles.imageContainer}>
        <img src="/access-image.jpg" alt="Access" style={styles.image} />
      </div>

      {/* Sección derecha con el interruptor y los botones */}
      <div style={styles.formContainer}>
        {/* Interruptor */}
        <div style={styles.switchContainer}>
          <button
            style={{ ...styles.switchButton, backgroundColor: isRegister ? '#4caf50' : '#ddd' }}
            onClick={toggleAccessMode}
          >
            Registrarse
          </button>
          <button
            style={{ ...styles.switchButton, backgroundColor: !isRegister ? '#4caf50' : '#ddd' }}
            onClick={toggleAccessMode}
          >
            Acceder
          </button>
        </div>

        {/* Contenido según el estado del interruptor */}
        {isRegister ? (
          <div style={styles.formContent}>
            <h2>Formulario de Registro</h2>
            <form style={styles.form}>
              <input
                type="email"
                placeholder="Correo electrónico"
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Nombre de usuario"
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                style={styles.input}
                required
              />
              <button type="submit" style={styles.submitButton}>
                Registrarse
              </button>
            </form>
          </div>
        ) : (
          <div style={styles.formContent}>
            <h2>Formulario de Acceso</h2>
            <form onSubmit={handleLogin} style={styles.form}>
              <input
                type="text"
                value={username}
                placeholder="Nombre de usuario"
                style={styles.input}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="password"
                value={password}
                placeholder="Contraseña"
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button onClick={handleLogin} type="submit" style={styles.submitButton}>
                Acceder
              </button>
            </form>
          </div>
        )}

        {/* Botones de ayuda y contacto */}
        <div style={styles.footerButtons}>
          <button style={styles.footerButton}>Contacto</button>
          <button style={styles.footerButton}>Ayuda</button>
        </div>
      </div>
    </div>

  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  switchContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  switchButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    marginRight: '5px',
  },
  formContent: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  submitButton: {
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4caf50',
    color: 'white',
    cursor: 'pointer',
  },
  footerButtons: {
    display: 'flex',
    gap: '10px',
  },
  footerButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4caf50',
    color: 'white',
  },
};
