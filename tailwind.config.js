/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prussian_blue: { DEFAULT: '#0a1128', 100: '#020308', 200: '#040710', 300: '#060a18', 400: '#080e21', 500: '#0a1128', 600: '#1d3172', 700: '#2f50bc', 800: '#6c86da', 900: '#b6c2ed' },
        deep_navy: { DEFAULT: '#001f54', 100: '#000610', 200: '#000c21', 300: '#001231', 400: '#001841', 500: '#001f54', 600: '#003da7', 700: '#005dfd', 800: '#5492ff', 900: '#a9c9ff' },
        yale_blue: { DEFAULT: '#034078', 100: '#010d18', 200: '#011930', 300: '#022648', 400: '#02335f', 500: '#034078', 600: '#0567c3', 700: '#1c8ef9', 800: '#68b4fb', 900: '#b3d9fd' },
        cerulean: { DEFAULT: '#1282a2', 100: '#041a20', 200: '#073440', 300: '#0b4e60', 400: '#0e6881', 500: '#1282a2', 600: '#18b2dc', 700: '#4cc9eb', 800: '#88dbf2', 900: '#c3edf8' },
        white: { DEFAULT: '#fefcfb', 100: '#512814', 200: '#a25128', 300: '#d68359', 400: '#eabfaa', 500: '#fefcfb', 600: '#fefdfc', 700: '#fefdfd', 800: '#fffefd', 900: '#fffefe' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default for English/Turkish
        arabic: ['Cairo', 'sans-serif'], // For Arabic
      },
    },
  },
  plugins: [],
}