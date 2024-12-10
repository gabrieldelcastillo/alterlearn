import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Background from './Background';
import { motion } from 'framer-motion';

export default function Form() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const toggleAccessMode = () => {
    setIsRegister(!isRegister);
  };

  const router = useRouter();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordLength(password.length >= 8);
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  }, [password]);

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

  const ValidationMessage = ({ isValid, message }) => (
    <motion.p
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`text-sm ${isValid ? 'text-green-400' : 'text-red-400'} flex items-center gap-2`}
    >
      {isValid ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {message}
    </motion.p>
  );

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6 py-8 mx-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 p-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-8 text-white"
          >
            {isRegister ? "Formulario de Registro" : "Formulario de Acceso"}
          </motion.h2>

          <form 
            onSubmit={isRegister ? handleRegister : handleLogin}
            className="space-y-6"
          >
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <input
                  type="email"
                  value={email}
                  placeholder="Correo electrónico"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                {email && (
                  <ValidationMessage 
                    isValid={isEmailValid} 
                    message="Formato de correo electrónico válido"
                  />
                )}
              </motion.div>
            )}

            <input
              type="text"
              value={username}
              placeholder="Nombre de usuario"
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />

            <div className="space-y-2">
              <input
                type="password"
                value={password}
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              {isRegister && password && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1 mt-2"
                >
                  <ValidationMessage 
                    isValid={passwordLength} 
                    message="Mínimo 8 caracteres"
                  />
                  <ValidationMessage 
                    isValid={hasNumber} 
                    message="Al menos un número"
                  />
                  <ValidationMessage 
                    isValid={hasSpecialChar} 
                    message="Al menos un carácter especial"
                  />
                </motion.div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              {isRegister ? "Registrar" : "Acceder"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/80 mb-2">
              {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
            </p>
            <button 
              onClick={toggleAccessMode}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
            >
              {isRegister ? "Acceder" : "Regístrate"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}