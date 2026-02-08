/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',      
      'sm': '640px',      
      'md': '768px',      
      'lg': '1024px',     // Laptops
      'xl': '1280px',     // Desktops
      '2xl': '1536px',    // Large desktops
    },
    extend: {
      colors: {
        'crypto-green': '#16c784',
        'crypto-red': '#ea3943',
        'crypto-blue': '#3b82f6',
        'primary': '#0052ff',
        'secondary': '#768396',
        // Add dark mode specific colors
        'dark-bg': '#121212',
        'dark-card': '#1e1e1e',
        'dark-text': '#e5e7eb',
        'dark-border': '#374151',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
      },
      fontSize: {
        'xxs': '0.625rem',
        '3xs': '0.5rem',
      },
      minWidth: {
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      maxWidth: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
      },
      // Add dark mode utilities
      backgroundColor: {
        'dark': {
          'primary': '#1a202c',
          'secondary': '#2d3748',
          'card': '#2d3748',
        }
      },
      textColor: {
        'dark': {
          'primary': '#f7fafc',
          'secondary': '#cbd5e0',
        }
      }
    },
  },
  plugins: [],
}