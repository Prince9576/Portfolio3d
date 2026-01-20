const { tailwindTheme } = require('./src/theme/tailwindTheme.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: tailwindTheme.colors,
      spacing: tailwindTheme.spacing,
      animation: tailwindTheme.animation,
      keyframes: tailwindTheme.keyframes,
      boxShadow: tailwindTheme.boxShadow,
      backgroundImage: tailwindTheme.backgroundImage,
    },
  },
  plugins: [],
};
