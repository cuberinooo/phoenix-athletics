/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffc107', // Amber/Yellow
          dark: '#e6ae06',
        },
        secondary: {
          DEFAULT: '#f97316', // amber-400
        },
        dark: {
          DEFAULT: '#020617', // slate-950
          lighter: '#0F172A', // slate-900
          card: '#1E293B',    // slate-800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
