/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-white': '#F4FCFF',
        'primary-black': '#042A44',
        'primary-gray': '#777777',
        'primary-400': '#7257D1',
        'secondary-400': '#5F95D8',
      },
      fontFamily: {
        lato: ['Lato', 'Cairo', 'sans-serif'],
        pattaya: ['Pattaya', 'Aref Ruqaa', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
      addVariant('ar', '&:lang(ar)')
    },
  ],
}
