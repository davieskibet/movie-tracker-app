// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ... your content paths ...
  ],
  theme: {
    extend: {
      colors: {
        // ⭐️ ADD THIS CUSTOM COLOR BLOCK ⭐️
        'deep-blue': {
          DEFAULT: '#090B49', // This allows you to use 'bg-deep-blue'
          // You can also add shades if needed, but 'DEFAULT' is enough for now.
        },
        // You might also want to redefine your teal if it's not the default
      },
    },
  },
  plugins: [],
}