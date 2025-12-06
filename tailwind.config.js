/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- This path ensures all your components are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}