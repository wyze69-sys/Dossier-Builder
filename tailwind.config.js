/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e0e7ff', // indigo-100
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#312e81', // indigo-900
        },
        surface: {
          light: '#f8fafc', // slate-50
          DEFAULT: '#fff',
          dark: '#0f172a', // slate-900
        },
        border: {
          DEFAULT: '#e2e8f0', // slate-200
          dark: '#334155', // slate-700
        }
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.2em', // Custom for those tiny loud section heads
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "full": "9999px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
