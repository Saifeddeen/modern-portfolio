/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default for English/Turkish
        arabic: ['Cairo', 'sans-serif'], // For Arabic
      },
    },
  },
  plugins: [],
}