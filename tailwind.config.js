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
        70: '#787486',
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
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    minWidth: theme => ({
      ...theme('spacing'),
      '530': '530px',
    }),
    maxHeight: theme => ({
      ...theme('spacing'),
      '100px': '100px',
      '200px': '200px',
      '300px': '300px',
      '400px': '400px',
      '500px': '500px',
      '600px': '600px',
      '700px': '700px',
      '800px': '800px',
      '900px': '900px',
    }),
  },
  plugins: [],
};

