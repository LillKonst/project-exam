/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["AlbertSans", "sans"],
      },
      colors: {
        customBlue: "#A9DEF9",
        blueHover: "#79C6F6",
        customWhite: "#FBFAFE",
        customYellow: "#ffd82a",
        customBlack: "#070311",
        customRed: "#F15152",
      },
    },
  },
  plugins: [],
};
