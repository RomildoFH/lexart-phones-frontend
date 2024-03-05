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
      coral: '#FFFBF5',
      shadow: {
        brown: '#654321',
        gray: '#333333',
      },
      primary: '#1A1B1C',
      secondary: '#54595F',
      text: {
        brown: 'rgba(101, 67, 33, 0.9)',
      },
      neon: {
        blue: '#2ED9F5',
        green: '#53E79CB3'
      }
    },
    dropShadow: {
        'brown': [
          '1px 1px 1px rgba(101, 67, 33, 2)',
          '2px 5px 5px rgba(101, 67, 33, 0.7)',
        ],
        'gray': [
            '0 35px 35px rgba(51, 51, 51, 0.25)',
            '0 45px 65px rgba(51, 51, 51, 0.50)'
        ]
      }
  },
  plugins: [],
};

