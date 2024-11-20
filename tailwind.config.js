/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}",
    "colors/*.{html,js}",
    "favourite/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ["Dancing Script", 
          "cursive"]
      },
      screens: {
        'max-lg': { 'max': '1150px' },  // Target screens smaller than 1024px
        'max-md': { 'max': '880px' },   // Target screens smaller than 768px
        'max-sm': { 'max': '750px' },   // Target screens smaller than 640px
        'max-ssm': { 'max': '450px' },   // Target screens smaller than 640px
      },
    },
  },
  plugins: [],
}