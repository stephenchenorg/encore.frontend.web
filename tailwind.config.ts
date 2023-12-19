import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import Forms from '@tailwindcss/forms'

export default {
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      // '2xl': '1536px',
    },
    extend: {
      colors: {
        red: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff5050',
          500: '#f83b3b',
          600: '#e51d1d',
          700: '#c11414',
          800: '#a01414',
          900: '#841818',
          950: '#480707',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', ...fontFamily.sans],
      },
      spacing: {
        // eslint-disable-next-line style/quote-props
        '7.5': '1.875rem',
      },
      boxShadow: {
        header: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
        card: '1px 1px 4px 0px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    Forms({ strategy: 'class' }),
  ],
} satisfies Partial<Config>
