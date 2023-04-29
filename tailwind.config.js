/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme'

export const darkMode = 'class'
export const content = [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
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
      lato: ['var(--font-lato)', 'var(--font-cairo)', ...fontFamily.sans],
      cairo: ['var(--font-cairo)', 'var(--font-lato)', ...fontFamily.sans],
      pattaya: [
        'var(--font-pattaya)',
        'var(--font-arefRuqaa)',
        ...fontFamily.sans,
      ],
      arefRuqaa: [
        'var(--font-arefRuqaa)',
        'var(--font-pattaya)',
        ...fontFamily.sans,
      ],
    },
    boxShadow: {
      left: '-5px 5px 0 black',
      right: '5px 5px 0 black',
      'left-lg': '-7px 5px 0 black',
      'right-lg': '7px 5px 0 black',
    },
  },
}
export const plugins = [
  require('tailwind-scrollbar'),
  function ({ addVariant }) {
    addVariant('child', '& > *')
    addVariant('child-hover', '& > *:hover')
    addVariant('ar', '&:lang(ar)')
    addVariant('en', '&:lang(en)')
  },
]
