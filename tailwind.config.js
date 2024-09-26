/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"RobotoCondensed"', "sans-serif"],
      },
      // colors: {
      //   cinereous: "#918078",
      //   ceruleanBlue: "#295fb1",
      //   cornflower: "#94caeb",
      //   graniteGray: "#676868",
      //   spaceCadet: "#2a3054",
      //   chineseBlack: "#0c150e",
      //   mustardYellow: "#E7B604",
      //   tigerEye: "#e08736",
      //   darkCornflowerBlue: "#1d3d86",
      // },
    },
  },
  plugins: [],
};
