/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          background: "#EAEDED",
          light_blue: "#232F3E",
          yellow: "#FEBD69",
          default: "#131921",
        }
      }
    },
  },
  plugins: [],
}
