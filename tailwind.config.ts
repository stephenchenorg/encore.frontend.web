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
      fontFamily: {
        sans: ['"Poppins"', ...fontFamily.sans],
      },
      spacing: {
        // eslint-disable-next-line style/quote-props
        '7.5': '1.875rem',
      },
    },
  },
  plugins: [
    Forms({ strategy: 'class' }),
  ],
} satisfies Partial<Config>
