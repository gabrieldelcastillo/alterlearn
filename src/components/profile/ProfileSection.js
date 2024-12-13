// Create the new ProfileSection component
function ProfileSection({ darkMode }) {
    return (
        <div className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'} min-h-[calc(100vh-180px)] flex items-center justify-center`}>
            <div className="max-w-xl w-full mx-auto rounded-2xl p-8 backdrop-blur-sm">
                {/* Cambia este texto si es admin o no */}
                <div className={`flex justify-center w-full mb-4`}>
                    <div className={`text-xl font-medium ${darkMode
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-gray-700 hover:text-gray-900'
                        } transition-colors duration-300 ${darkMode 
                            ? 'drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]' 
                            : 'drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]'}`}>
                        Estudiante
                    </div>
                </div>
                {/* Foto de perfil */}
                <div className="flex justify-center mb-8">
                    <div className={`w-40 h-40 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                        } flex items-center justify-center transform hover:scale-105 transition-transform duration-300`}>
                        {/* Si no hay foto, se muestra un ícono por defecto */}
                        <svg
                            className={`w-20 h-20 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Información de perfil */}
                <div className="text-center space-y-4">
                    {/* Colocar aquí el nombre de usuario desde el backend */}
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-black'
                        } tracking-wide`}>
                        Nombre de usuario
                    </h2>

                    {/* Colocar aquí el correo del usuario desde el backend */}
                    <p className={`text-md ${darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        correo@ejemplo.com
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;
