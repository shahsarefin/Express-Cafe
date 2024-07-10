/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          700: '#8B4513',
          800: '#654321',
        },
      },
    },
  },
  plugins: [require("daisyui")],
}
