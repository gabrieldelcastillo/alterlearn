import React, { useState } from "react";
import Header from "../components/Header";
import HelpBackground from "../components/help/HelpBackground";

export default function HelpCenter() {
    const [darkMode, setDarkMode] = useState(false);
    const [chatWidgetOpen, setChatWidgetOpen] = useState(false);

    const toggleChatWidget = () => setChatWidgetOpen(!chatWidgetOpen);

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="absolute inset-0 z-0">
                <HelpBackground isDarkMode={darkMode} />
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12">
                <h1 className={`text-4xl md:text-5xl font-bold text-center mb-8 ${
                    darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-800"
                } transition-colors duration-200`}>
                    ¿En qué te podemos ayudar?
                </h1>

                <div className="max-w-2xl mx-auto mb-12">
                    <div className={`flex items-center p-4 rounded-lg ${
                        darkMode 
                            ? "bg-gray-800 border-emerald-500/30 hover:border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                            : "bg-white border-black/30 hover:border-black/50"
                    } shadow-lg border transition-all duration-300`}>
                        <input
                            type="text"
                            placeholder="Busca ayuda..."
                            className={`w-full bg-transparent outline-none ${
                                darkMode ? "text-white" : "text-gray-800"
                            } placeholder-gray-400`}
                        />
                        <button className={`ml-4 ${darkMode ? "text-emerald-500 hover:text-emerald-400" : "text-black hover:text-black"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {helpCategories.map((category, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg ${
                                darkMode 
                                    ? "bg-gray-800 border-emerald-500/30 hover:border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                                    : "bg-white border-black/30 hover:border-black/50"
                            } shadow-lg border transition-all duration-300 cursor-pointer group`}
                        >
                            <div className={`mb-4 ${darkMode ? "text-emerald-500 group-hover:text-emerald-400" : "text-black group-hover:text-black"}`}>
                                {category.icon}
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${
                                darkMode ? "text-white" : "text-gray-800"
                            }`}>
                                {category.title}
                            </h3>
                            <p className={`${
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }`}>
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className={`max-w-lg mx-auto p-6 rounded-lg text-center ${
                    darkMode 
                        ? "bg-gray-800 border-emerald-500/30 hover:border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                        : "bg-white border-black/30 hover:border-black/50"
                } shadow-lg border transition-all duration-300`}>
                    <h2 className={`text-2xl font-semibold mb-4 ${
                        darkMode ? "text-white" : "text-gray-800"
                    }`}>
                        Contáctanos
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? "text-emerald-500" : "text-black"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p className={`ml-3 ${
                                darkMode ? "text-gray-300 hover:text-emerald-500" : "text-gray-600 hover:text-black"
                            } transition-colors duration-200`}>
                                alterlearn@contact.cl
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? "text-emerald-500" : "text-black"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <p className={`ml-3 ${
                                darkMode ? "text-gray-300 hover:text-emerald-500" : "text-gray-600 hover:text-black"
                            } transition-colors duration-200`}>
                                +56 9 1234 5678
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <div className="animated-bg fixed inset-0 -z-10" />
        </div>
    );
}

const helpCategories = [
    {
        title: "Cómo empezar",
        description: "¿Nuevo en nuestra plataforma? Aprende los conceptos básicos y ponte al día rápidamente.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    },
    {
        title: "Cuentas y configuración",
        description: "Administra tu cuenta, privacidad y preferencias de la plataforma.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    },
    {
        title: "Soluciones de problemas",
        description: "Encuentra soluciones a problemas comunes y técnicos.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
    }
];
