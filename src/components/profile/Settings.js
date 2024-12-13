import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Settings({ darkMode }) {
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        // implementa el cambio de nombre de usuario
        setShowUsernameForm(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // implementa el cambio de contraseña
        setShowPasswordForm(false);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            // implementa la eliminación de la cuenta
        }
    };

    return (
        <div className={`p-6 ${darkMode ? 'text-green-400' : 'text-gray-800'}`}>
            <div className="space-y-4 max-w-md mx-auto">
                {/* seccion de cambiar nombre de usuario */}
                <div className="space-y-2">
                    <button
                        onClick={() => setShowUsernameForm(!showUsernameForm)}
                        className={`w-full p-3 rounded-lg bg-black text-white hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95`}
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
                                className="space-y-6 p-8 rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-black shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden"
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300`}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Nuevo nombre de usuario"
                                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300`}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-black text-white rounded-lg font-semibold 
                                        shadow-lg hover:shadow-xl 
                                        transform hover:-translate-y-0.5 hover:scale-[1.02]
                                        active:scale-95 active:shadow-inner
                                        transition-all duration-300 
                                        focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
                        className={`w-full p-3 rounded-lg bg-black text-white hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95`}
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
                                className="space-y-6 p-8 rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-black shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden"
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300`}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Nueva contraseña"
                                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-300`}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-black text-white rounded-lg font-semibold 
                                        shadow-lg hover:shadow-xl 
                                        transform hover:-translate-y-0.5 hover:scale-[1.02]
                                        active:scale-95 active:shadow-inner
                                        transition-all duration-300 
                                        focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
