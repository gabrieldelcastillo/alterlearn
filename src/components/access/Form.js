import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Form.module.css'; 
import Background from './Background';

export default function Form() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const toggleAccessMode = () => {
    setIsRegister(!isRegister);
  };

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      router.push("/admin");
    }
    router.push('/search');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Usuario registrado');
  };

  return (
    <div className={styles.container}>
      <Background className="background"/>
      <div className={styles.formContainer}>
        <div className={styles.formContent}>
          <h2>{isRegister ? "Formulario de Registro" : "Formulario de Acceso"}</h2>
          <form onSubmit={isRegister ? handleRegister : handleLogin} className={styles.form}>
            {isRegister && (
              <input
                type="email"
                value={email}
                placeholder="Correo electrónico"
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}
            <input
              type="text"
              value={username}
              placeholder="Nombre de usuario"
              className={styles.input}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Contraseña"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitButton}>
              {isRegister ? "Registrar" : "Acceder"}
            </button>
          </form>
          <div className={styles.switchContainer}>
            <p>{isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}</p>
            <button onClick={toggleAccessMode} className={styles.switchButton}>
              {isRegister ? "Acceder" : "Regístrate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
