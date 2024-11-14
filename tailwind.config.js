/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ["Dancing Script", 
          "cursive"]
      },
      screens: {
        'max-lg': { 'max': '1024px' },  // Target screens smaller than 1024px
        'max-md': { 'max': '880px' },   // Target screens smaller than 768px
        'max-sm': { 'max': '640px' },   // Target screens smaller than 640px
      },
    },
  },
  plugins: [],
}