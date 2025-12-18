/** @type {import('tailwindcss').Config} */
export default {
  // ⭐️ THIS LINE IS THE MOST IMPORTANT: ⭐️
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#030213', 
        'deep-blue': '#090B49',
        'brand-cyan-600': '#0891b2', // Your button color
      },
      borderRadius: {
        'brand': '0.625rem', // The 10px radius from your code
      }
    },
  },
  plugins: [],
}