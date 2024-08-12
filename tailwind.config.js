/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // fontFamily: {
    //   primaryFont: ["Rubik", "sans-serif"],
    // },
    colors: {
      primaryColor: "#0373B9",
      secondaryColor: "#F5F5F5",
      red: "#EF5A6F",
      black: "#173B45",
      white:"#FFFFFF"
    },
    extend: {},
  },
  plugins: [],
};
