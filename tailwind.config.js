/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["HedvigLettersSans", "sans"],
      },
      colors: {
        customBlue: "#4D83C3",
        blueHover: "#79C6F6",
        customWhite: "#F1F8F9",
      },
    },
  },
  plugins: [],
};
