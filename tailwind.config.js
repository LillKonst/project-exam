/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["AlbertSans", "sans"],
      },
      colors: {
        customBlue: "#87E0FD",
        blueHover: "#79C6F6",
        customWhite: "##FBFAFE",
        customYellow: "#FFD82A",
      },
    },
  },
  plugins: [],
};
