/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        gold: '#C9A96E',
        'gold-dim': 'rgba(201,169,110,0.2)',
        'gold-mid': 'rgba(201,169,110,0.5)',
        rose: '#B76E79',
        snow: '#FAFAFA',
        card: '#1A1A1A',
        grey: '#9A8F8A',
        muted: '#5C5754',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

