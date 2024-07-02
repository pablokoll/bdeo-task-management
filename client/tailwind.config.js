/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "curious-blue": {
          50: "#f3f7fc",
          100: "#e7f0f7",
          200: "#cadeed",
          300: "#9bc4de",
          400: "#65a4cb",
          500: "#468fbd",
          600: "#306d99",
          700: "#28587c",
          800: "#244b68",
          900: "#234057",
          950: "#17293a",
        },
        "vista-blue": {
          50: "#eefbf6",
          100: "#d5f6e7",
          200: "#afebd3",
          300: "#6bd7b4",
          400: "#44c39e",
          500: "#21a885",
          600: "#13886c",
          700: "#0f6d59",
          800: "#0f5647",
          900: "#0d473c",
          950: "#062822",
        },
      },
      backgroundImage:{
        'dot-svg': "url('./src/assets/images/dot-background.svg)"
      }
    },
  },
  plugins: [],
};
