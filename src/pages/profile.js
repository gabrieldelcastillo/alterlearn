import { useState } from 'react'
import {
    UserCircleIcon,
    ShoppingBagIcon,
    HeartIcon,
    CogIcon,
    SunIcon,
    MoonIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { FiChevronDown, FiChevronUp, FiSearch, FiUser } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Sidebar({ activeSection, setActiveSection, theme }) {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    const menuItems = [
        {
            icon: <UserCircleIcon className="w-6 h-6" />,
            label: 'Perfil',
            section: 'profile'
        },
        {
            icon: <ShoppingBagIcon className="w-6 h-6" />,
            label: 'Compras',
            section: 'purchases'
        },
        {
            icon: <HeartIcon className="w-6 h-6" />,
            label: 'Favoritos',
            section: 'favorites'
        },
        {
            icon: <CogIcon className="w-6 h-6" />,
            label: 'Configuración',
            section: 'settings'
        }
    ]

    return (
        <div className={`
      h-full bg-white dark:bg-gray-900 
      border-b-2 border-green-600 
      shadow-2xl transition-all duration-300
      ${darkMode ? 'dark:border-green-400 dark:shadow-green-600/30' : ''}
    `}>
            <nav className="w-full grid grid-cols-4">
                {menuItems.map((item) => (
                    <button
                        key={item.section}
                        onClick={() => setActiveSection(item.section)}
                        className={`
              flex flex-col items-center justify-center p-4 w-full
              hover:bg-green-50 dark:hover:bg-gray-800 
              transition-all duration-300
              ${activeSection === item.section
                                ? 'bg-green-100 dark:bg-gray-800 border-b-4 border-green-600 dark:border-green-400'
                                : 'border-b-4 border-transparent'}
            `}
                    >
                        <span className={`
              mb-2
              ${activeSection === item.section
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-gray-600 dark:text-gray-400'}
            `}>
                            {item.icon}
                        </span>
                        <span className={`
              font-medium text-center
              ${activeSection === item.section
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-gray-700 dark:text-gray-300'}
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
    const [theme, setTheme] = useState('light')
    const [activeSection, setActiveSection] = useState('profile');
    const [searchQuery, setSearchQuery] = useState("");
    const [cartItemCount, setCartItemCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
     
    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`
      min-h-screen w-full 
      ${darkMode ? 'bg-gray-900' : 'bg-white'}
      transition-colors duration-300
    `}>
            <header className={`sticky top-0 z-50 ${darkMode ? "bg-gray-900 border-b-2 border-b-green-700 shadow-green-700/30" : "bg-white"} shadow-md`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link href="/"><h1 className={`text-xl font-bold ${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)] transition-all duration-300" : "text-gray-900"}`}>Alterlearn</h1></Link>
                        </div>

                        <div className="flex-1 max-w-2xl mx-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Search..."
                                />
                                <FiSearch className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleDarkModeToggle}
                                className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <BsSun className="h-5 w-5 text-yellow-400" />
                                ) : (
                                    <BsMoon className="h-5 w-5 text-gray-600" />
                                )}
                            </button>

                            <div className="relative">
                                <button
                                    className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                                    aria-label="Shopping cart"
                                >
                                    <Link href="/cart">
                                        <AiOutlineShoppingCart className={`h-5 w-5 ${darkMode ? "text-white" : "text-gray-600"}`} />
                                        {cartItemCount > 0 && (

                                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </Link>
                                </button>
                            </div>

                            <button
                                className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                                aria-label="User account"
                            >
                                <Link href="/access"><FiUser className={`h-5 w-5 ${darkMode ? "text-white" : "text-gray-600"}`} /></Link>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                theme={theme}
            />
        </div>
    );
};