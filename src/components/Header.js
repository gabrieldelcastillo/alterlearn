import React, { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import Link from "next/link";

const Header = ({ darkMode, setDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={`sticky top-0 z-50 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
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
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => !searchQuery && setIsSearchFocused(false)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white border-2 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                    : "bg-gray-100 text-gray-900 border-2 border-black"
                } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300`}
                placeholder={isSearchFocused ? "Search..." : ""}
              />
              <FiSearch
                className={`absolute h-5 w-5 transition-all duration-300 transform ${
                  darkMode ? "text-green-400" : "text-gray-600"
                } ${
                  isSearchFocused || searchQuery
                    ? "left-3 top-2.5"
                    : "left-1/2 top-2.5 -translate-x-1/2"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleDarkModeToggle}
              className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <BsSun className="h-5 w-5 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
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
                  <AiOutlineShoppingCart className={`h-5 w-5 ${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)] transition-all duration-300" : "text-gray-600"}`} />
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
              <Link href="/access"><FiUser className={`h-5 w-5 ${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)] transition-all duration-300" : "text-gray-600"}`} /></Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
