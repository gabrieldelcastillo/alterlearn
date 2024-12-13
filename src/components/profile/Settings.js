import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Settings({ darkMode }) {
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_VITE_API_URL}/alterlearn/cambiarNombre`, {
              method: 'patch',
              headers: {
                'Content-Type': 'application/json',
              },//agregar email
              body: JSON.stringify({ correo_electronico: email, nuevo_nombre: showUsernameForm }), 
            });
      
            const data = await response.json();
      
            if (data.success) {
              alert('Cambio de nombre exitoso');
            } else {
              alert(data.message || 'Error al cambiar de nombre');
            }
          } catch (error) {
            alert('Error al camniar de nombre');
          }
        setShowUsernameForm(false);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_VITE_API_URL}/alterlearn/cambiarContra`, {
              method: 'patch',
              headers: {
                'Content-Type': 'application/json',
              },//agregar email
              body: JSON.stringify({ correo_electronico: email, nueva_contrasenia: showPasswordForm }), 
            });
      
            const data = await response.json();
      
            if (data.success) {
              alert('Cambio de contraseña exitoso');
            } else {
              alert(data.message || 'Error al cambiar de contraseña');
            }
          } catch (error) {
            alert('Error al camniar de contraseña');
          }
        setShowPasswordForm(false);
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_VITE_API_URL}/alterlearn/borrarCuenta`, {
                  method: 'delete',
                });
          
                const data = await response.json();
          
                if (data.success) {
                  alert('Cuenta borrada');
                }
              } catch (error) {
                alert('Error al borrar la cuenta');
              } 
        }
    };

    return (
        <div className={`p-6 ${darkMode ? 'text-green-400' : 'text-gray-800'}`}>
            <div className="space-y-4 max-w-md mx-auto">
                {/* seccion de cambiar nombre de usuario */}
                <div className="space-y-2">
                    <button
                        onClick={() => setShowUsernameForm(!showUsernameForm)}
                        className={`w-full p-3 rounded-lg ${
                            darkMode 
                                ? 'bg-gradient-to-r from-green-700 to-green-700 hover:from-green-600 hover:to-green-800 text-white' 
                                : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'
                        } transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95`}
                    >
                        Cambiar Nombre de Usuario
                    </button>
                    
                    <AnimatePresence>
                        {showUsernameForm && (
                            <motion.form
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handleUsernameSubmit}
                                className="space-y-6 p-8 rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-green-400 shadow-[0_8px_32px_0_rgba(74,222,128,0.5)] overflow-hidden"
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Nuevo nombre de usuario"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300"
                                    required
                                />
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
                                    Confirmar Cambio
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                {/* seccion de cambiar contraseña */}
                <div className="space-y-2">
                    <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className={`w-full p-3 rounded-lg ${
                            darkMode 
                                ? 'bg-gradient-to-r from-green-700 to-green-700 hover:from-green-600 hover:to-green-800 text-white' 
                                : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'
                        } transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95`}
                    >
                        Cambiar Contraseña
                    </button>
                    
                    <AnimatePresence>
                        {showPasswordForm && (
                            <motion.form
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handlePasswordSubmit}
                                className="space-y-6 p-8 rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-green-400 shadow-[0_8px_32px_0_rgba(74,222,128,0.5)] overflow-hidden"
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Nueva contraseña"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300"
                                    required
                                />
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
                                    Actualizar Contraseña
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sección de eliminación de cuenta */}
                <button
                    onClick={handleDeleteAccount}
                    className={`w-full p-3 rounded-lg ${
                        darkMode 
                            ? 'bg-transparent hover:bg-red-600/20 text-red-400 border-2 border-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.9)]' 
                            : 'bg-transparent hover:bg-red-600/20 text-red-500 border-2 border-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.6)]'
                    } transition-colors duration-300`}
                >
                    Eliminar Cuenta
                </button>
            </div>
        </div>
    );
}
