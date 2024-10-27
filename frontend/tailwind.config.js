/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure this path is correct
  theme: {
    extend: {
      fontFamily:{
        "poppins":["Poppins","sans-serif"],
      },
      height:{
        "1/10":"10%",
        "1/9":"90%",
      }
    },
  },
  plugins: []
}
