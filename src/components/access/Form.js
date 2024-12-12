import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Background from './Background';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
        <Link href="/"><h1 className="text-6xl font-bold text-center text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)] mb-8">ALTERLEARN</h1></Link>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_8px_32px_0_rgba(74,222,128,0.5)] border-2 border-green-400 p-8 glow-green">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-8 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]"
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
                  className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300"
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
              className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300"
            />

            <div className="space-y-2">
              <input
                type="password"
                value={password}
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300"
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
              className="w-full py-3 px-4 bg-gradient-to-r from-green-700 to-green-700 text-white rounded-lg font-semibold 
                shadow-lg hover:shadow-xl 
                transform hover:-translate-y-0.5 hover:scale-[1.02]
                active:scale-95 active:shadow-inner
                transition-all duration-300 
                hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800
                focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
                animate-pulse hover:animate-none"
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
              className="text-green-400 hover:text-green-400 font-medium transition-colors duration-300 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]"
            >
              {isRegister ? "Acceder" : "Regístrate"}
            </button>
          </div>
        </div>
        <div className="w-full mt-8 p-6 rounded-xl border-2 border-green-400/30 bg-gradient-to-br from-gray-800/40 to-green-900/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,197,94,0.15)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex flex-col space-y-2 text-center md:text-left">
              <div className="flex items-center space-x-2 text-green-400 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p className="hover:text-green-300 transition-colors duration-300">alterlearn@contact.com</p>
              </div>
              <div className="flex items-center space-x-2 text-green-400 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p className="hover:text-green-300 transition-colors duration-300 navi">+56 9 1234 5678</p>
              </div>
            </div>
            <Link
              href="/help"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-600/20 to-green-900/30 text-green-400 font-medium 
              transition-all duration-300 hover:text-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]
              border border-green-400/30 hover:border-green-400/50 min-w-[120px] text-center"
            >
              Ayuda
            </Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
}