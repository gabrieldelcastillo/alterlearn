import { parsePagesSegmentConfig } from 'next/dist/build/segment-config/pages/pages-segment-config';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

export default function Acceso() {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 

  const toggleAccessMode = () => {
    setIsRegister(!isRegister);
  };

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_VITE_API_URL}/alterlearn/logearse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('Inicio de sesión exitoso');
        // Redirige al usuario a la página deseada
        router.push("/search");
      } else {
        alert(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el inicio de sesión');
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if(username === 'admin' && password === '1234') {
      router.push("/admin");
    }
    router.push('/search'); // Redirige a la página de inicio
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
          <div style={styles.formContent}>
            <h2>Formulario de Acceso</h2>
            <form onSubmit={handleLogin} style={styles.form}>
            <input
                type="email"
                placeholder="Correo electrónico"
                style={styles.input}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
      </div>
      <Footer/>
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