/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
        Syne: ['"Syne"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
