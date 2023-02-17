/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#F4FCFF',
          black: '#042A44',
          dark: '#121212',
          gray: {
            500: '#777777',
            300: '#D6D6D6',
          },
          400: '#7257D1',
        },
        secondary: {
          400: '#5F95D8',
        },
      },
      fontFamily: {
        lato: ['Lato', 'Cairo', 'sans-serif'],
        cairo: ['Cairo', 'lato', 'sans-serif'],
        pattaya: ['Pattaya', 'Aref Ruqaa', 'sans-serif'],
      },
      boxShadow: {
        left: '-5px 5px 0 black',
        right: '5px 5px 0 black',
        'left-lg': '-7px 5px 0 black',
        'right-lg': '7px 5px 0 black',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
      addVariant('ar', '&:lang(ar)')
      addVariant('en', '&:lang(en)')
    },
  ],
}
