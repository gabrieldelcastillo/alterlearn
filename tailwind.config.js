const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
    },
  },
  plugins: [],
};
