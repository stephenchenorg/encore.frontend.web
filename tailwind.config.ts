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
