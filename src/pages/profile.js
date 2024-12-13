import { useState } from 'react'
import {
    UserCircleIcon,
    ShoppingBagIcon,
    HeartIcon,
    CogIcon,
} from '@heroicons/react/24/outline'
import Header from '../components/Header';
import ProfileSection from '../components/profile/ProfileSection';
import Purchases from '../components/profile/Purchases';
import Favorite from '../components/profile/Favorite';
import Settings from '../components/profile/Settings';

function Sidebar({ activeSection, setActiveSection, darkMode }) {
    const menuItems = [
        {
            icon: <UserCircleIcon className="w-6 h-6" />,
            label: 'Perfil',
            section: 'profile'
        },
        {
            icon: <ShoppingBagIcon className={`w-6 h-6 ${activeSection === 'purchases' ? 'animate-bounce' : ''}`} />,
            label: 'Compras',
            section: 'purchases'
        },
        {
            icon: <HeartIcon className={`w-6 h-6 ${activeSection === 'favorites' ? 'animate-ping' : ''}`} />,
            label: 'Favoritos',
            section: 'favorites'
        },
        {
            icon: <CogIcon className={`w-6 h-6 ${activeSection === 'settings' ? 'animate-spin' : ''}`} />,
            label: 'Configuración',
            section: 'settings'
        }
    ]

    return (
        <div className={`h-full border-b-2 ${darkMode ? 'border-green-400 bg-gray-900' : 'border-black bg-white'} transition-all duration-300`}>
            <nav className="w-full grid grid-cols-4">
                {menuItems.map((item) => (
                    <button
                        key={item.section}
                        onClick={() => setActiveSection(item.section)}
                        className={`flex flex-col items-center justify-center p-4 w-full ${darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'} transition-all duration-300 
                            ${activeSection === item.section ?
                                (darkMode ? 
                                    `bg-gray-900 border-b-4 ${
                                        item.section === 'purchases' ? 'border-white' :
                                        item.section === 'favorites' ? 'border-red-400' :
                                        item.section === 'settings' ? 'border-cyan-400' :
                                        'border-green-400'
                                    }` : 
                                    `bg-gray-100 border-b-4 border-black`
                                )
                                : 'border-b-4 border-transparent'}
            `}
                    >
                        <span className={`mb-2 ${activeSection === item.section ?
                            (darkMode ? 
                                (item.section === 'purchases' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]' :
                                item.section === 'favorites' ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.9)]' :
                                item.section === 'settings' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]' :
                                'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.9)]')
                                : 'text-black')
                            : (darkMode ? 
                                (item.section === 'purchases' ? 'text-white' :
                                item.section === 'favorites' ? 'text-red-400' :
                                item.section === 'settings' ? 'text-cyan-400' :
                                'text-green-400')
                                : 'text-gray-600')}`}>
                            {item.icon}
                        </span>
                        <span className={`
              font-medium text-center
              ${activeSection === item.section
                                ? (darkMode ? 
                                    (item.section === 'purchases' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]' :
                                    item.section === 'favorites' ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.9)]' :
                                    item.section === 'settings' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]' :
                                    'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.9)]')
                                    : 'text-black')
                                : (darkMode ? 
                                    (item.section === 'purchases' ? 'text-white' :
                                    item.section === 'favorites' ? 'text-red-400' :
                                    item.section === 'settings' ? 'text-cyan-400' :
                                    'text-green-400')
                                    : 'text-gray-600')}
            `}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('profile');
    const [searchQuery, setSearchQuery] = useState("");
    const [cartItemCount, setCartItemCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`
      min-h-screen w-full 
      ${darkMode ? 'bg-gray-900' : 'bg-white'}
      transition-colors duration-300
    `}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                darkMode={darkMode}
            />
            {activeSection === 'profile' && (
                <ProfileSection darkMode={darkMode} />
            )}
            {activeSection === 'purchases' && (
                <Purchases darkMode={darkMode} />
            )}
            {activeSection === 'favorites' && (
                <Favorite darkMode={darkMode} />
            )}
            {activeSection === 'settings' && (
                <Settings darkMode={darkMode} />
            )}
        </div>
    );
};