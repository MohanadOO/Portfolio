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
          50: '#f4fcff',
          100: '#eff6f9',
          200: '#e1e7e9',
          300: '#d0d5d7',
          400: '#9fa3a5',
          500: '#707374',
          600: '#515455',
          700: '#3f4141',
          800: '#262728',
          900: '#181818',
        },
        purple: {
          DEFAULT: '#7357d1',
          50: '#f1f1fe',
          100: '#e1e1f9',
          200: '#c9c8f3',
          300: '#aca6ea',
          400: '#8d7ddf',
          500: '#7357d1',
          600: '#6439cb',
          700: '#582db8',
          800: '#4a2799',
          900: '#40287c',
        },
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
