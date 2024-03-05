/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      green: '#6BA43E',
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: '#FFC453',
      neutral: colors.neutral,
      black: colors.black,
      blue: {
        10: '#DBDBFF',
        100: '#1E1FB5',
      },
      gray: {
        50: '#D7D7D7',
      },
      coral: 'FF7253',
    },
  },
  plugins: [],
};

