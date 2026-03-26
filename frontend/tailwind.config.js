/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E293B',
          dark: '#0F172A',
          light: '#334155'
        },
        accent: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
          soft: '#FFF7ED'
        },
        background: 'var(--background)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        success: {
          DEFAULT: '#10B981',
          soft: '#ECFDF5'
        },
        warning: {
          DEFAULT: '#F59E0B',
          soft: '#FFF7ED'
        },
        danger: {
          DEFAULT: '#EF4444',
          soft: '#FEF2F2'
        },
        purple: {
          DEFAULT: '#8B5CF6',
          soft: '#F5F3FF'
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)'
        }
      },
      borderRadius: {
        'card': '16px',
        'input': '12px',
        'button': '12px'
      },
      boxShadow: {
        'none': 'none'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
