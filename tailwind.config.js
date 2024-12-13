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
        "spin-slow": "spin 8s linear infinite",
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fly': 'fly 10s linear infinite',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.36, 0, 0.66, -0.56)',
        'pop': 'pop 0.3s ease-out',
        'snake': 'snake 20s linear infinite',
      },
      keyframes: {
        fly: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(20px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        snake: {
          '0%': {
            transform: 'translate(var(--start-x), var(--start-y)) rotate(calc(var(--direction) * 90deg))',
          },
          '25%': {
            transform: 'translate(calc(var(--start-x) + 25vw), calc(var(--start-y) + 25vh)) rotate(calc((var(--direction) + 1) * 90deg))',
          },
          '50%': {
            transform: 'translate(calc(var(--start-x) + 50vw), calc(var(--start-y) + 50vh)) rotate(calc((var(--direction) + 2) * 90deg))',
          },
          '75%': {
            transform: 'translate(calc(var(--start-x) + 25vw), calc(var(--start-y) + 75vh)) rotate(calc((var(--direction) + 3) * 90deg))',
          },
          '100%': {
            transform: 'translate(var(--start-x), var(--start-y)) rotate(calc((var(--direction) + 4) * 90deg))',
          },
        },
      },
    },
  },
  plugins: [],
};
