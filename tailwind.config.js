const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "loop-scroll-right": "loop-scroll-right 20s linear infinite",
        "loop-scroll-left": "loop-scroll-left 20s linear infinite",
        "loop-scrool-subjects": "loop-scroll-right 10s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fly': 'fly 10s linear infinite',
      },
      keyframes: {
        "loop-scroll-right": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "loop-scroll-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        fly: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(20px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
