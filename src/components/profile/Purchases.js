import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function Purchases({ darkMode }) {
    const [purchases, setPurchases] = useState([
        {
            id: '12345',
            date: '2024-03-20',
            type: "Certamen (con solución)",
            subject: "Matemáticas",
            year: "2022",
            price: 1000,
            isFavorite: false,
            downloadUrl: '#'
        },
    ]);

    const toggleFavorite = (purchaseId) => {
        setPurchases(purchases.map(purchase => 
            purchase.id === purchaseId 
                ? { ...purchase, isFavorite: !purchase.isFavorite }
                : purchase
        ));
    };

    return (
        <div className={`p-6 ${darkMode ? 'text-green-400' : 'text-gray-800'}`}>
            <div className="space-y-4">
                {purchases.map((purchase) => (
                    <div 
                        key={purchase.id}
                        className={`p-4 rounded-lg flex items-center justify-between
                            ${darkMode 
                                ? 'bg-gray-800 border border-green-400' 
                                : 'bg-white border border-gray-200 shadow-sm'}`}
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <span className={`font-medium ${darkMode ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.9)]' : ''}`}>ID Producto: {purchase.id}</span>
                            <span className={`text-sm ${darkMode ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.9)]' : ''}`}>Fecha de compra: {purchase.date}</span>
                            <span className={`text-sm ${darkMode ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]' : ''}`}>{purchase.type}</span>
                            <span className={`text-sm ${darkMode ? 'text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]' : ''}`}>{purchase.subject}</span>
                            <span className={`text-sm ${darkMode ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]' : ''}`}>{purchase.year}</span>
                            <span className={`font-bold ${darkMode ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]' : ''}`}>CLP${purchase.price}</span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => toggleFavorite(purchase.id)}
                                className={`p-2 rounded-full hover:bg-gray-100
                                    ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            >
                                {purchase.isFavorite ? (
                                    <HeartSolidIcon className="w-6 h-6 text-red-500" />
                                ) : (
                                    <HeartIcon className={`w-6 h-6 ${darkMode ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]' : 'text-black'}`} />
                                )}
                            </button>
                            <a
                                href={purchase.downloadUrl}
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
