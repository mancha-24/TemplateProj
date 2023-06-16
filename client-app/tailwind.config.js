/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
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
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      fontWeight: {
        poppins: ['400']
      }
    },
    fonts: {
      poppins: ['url("src/assets/fonts/Poppins-Regular.ttf")']
    }
  }
})
