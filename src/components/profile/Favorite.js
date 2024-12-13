import { HeartIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function Favorite({ darkMode }) {
    const [favorites, setFavorites] = useState([
        {
            id: '12345',
            type: "Certamen (con solución)",
            subject: "Cálculo Diferencial",
            year: "2022",
            teacher: "Juan Pérez",
            downloadUrl: '#'
        },
    ]);

    const removeFavorite = (itemId) => {
        setFavorites(favorites.filter(item => item.id !== itemId));
    };

    return (
        <div className={`p-6 ${darkMode ? 'text-green-400' : 'text-gray-800'}`}>
            <div className="space-y-4">
                {favorites.map((item) => (
                    <div 
                        key={item.id}
                        className={`p-4 rounded-lg flex items-center justify-between
                            ${darkMode 
                                ? 'bg-gray-800 border border-green-400' 
                                : 'bg-white border border-gray-200 shadow-sm'}`}
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <span className={`text-sm ${darkMode ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]' : ''}`}>{item.type}</span>
                            <span className={`text-sm ${darkMode ? 'text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]' : ''}`}>{item.subject}</span>
                            <span className={`text-sm ${darkMode ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]' : ''}`}>{item.year}</span>
                            <span className={`text-sm ${darkMode ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]' : ''}`}>{item.teacher}</span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => removeFavorite(item.id)}
                                className={`p-2 rounded-full hover:bg-gray-100
                                    ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            >
                                <HeartIcon className="w-6 h-6 text-red-500" />
                            </button>
                            <a
                                href={item.downloadUrl}
                                className={`px-4 py-2 rounded-md text-sm font-medium
                                    ${darkMode 
                                        ? 'bg-green-400 text-gray-900 hover:bg-green-500' 
                                        : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                            >
                                Descargar
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
