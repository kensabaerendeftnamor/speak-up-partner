// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        supYellow: "#F7DF71",
        supBlue: "#07A8EC",
        supNavy: "#202E5D",
        supLight: "#CFE4E7",
      },
    },
  },
  plugins: [],
}
