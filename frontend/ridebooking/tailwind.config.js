/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "deep-purple":"#4B3F72",
        "steel-blue":"#19647E",
        "teal":"#119DA4",
        "mid-night-blue":"#1F2041",
      }
    },
  },
  plugins: [],
}

