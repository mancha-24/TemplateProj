/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#081A51',
        'light-gray': '#d1d5db',
        'dark-gray': '#4b5563'
      }
    }
  },
  plugins: []
}
