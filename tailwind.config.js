/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme'

export const darkMode = 'class'
export const content = [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
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
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
  },
}

export const plugins = [
  require('tailwind-scrollbar'),
  require('tailwindcss-animate'),
  function ({ addVariant }) {
    addVariant('child', '& > *')
    addVariant('child-hover', '& > *:hover')
    addVariant('ar', '&:lang(ar)')
    addVariant('en', '&:lang(en)')
  },
]