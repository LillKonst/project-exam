/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["HedvigLettersSans", "sans"],
      },
      colors: {
        customBlue: "#A3D8F8",
        blueHover: "#79C6F6",
      },
    },
  },
  plugins: [],
}