import { useState } from 'react';
import { useRouter } from 'next/router';
import { parsePagesSegmentConfig } from 'next/dist/build/segment-config/pages/pages-segment-config';
import Footer from '../components/Footer';

export default function Acceso() {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const toggleAccessMode = () => {
    setIsRegister(!isRegister);
  };

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if(username === 'admin' && password === '1234') {
      router.push("/admin");
    }
    router.push('/search');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
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
      </div>
      <Footer/>
    </div>
  );
}