/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['./public/fonts/Nunito-Regular.ttf'],
        nunitobold: ['./public/fonts/Nunito-Bold.ttf'],
        nunitosemibold: ['./public/fonts/Nunito-Semibold.ttf'],
      },
      colors: {
        bluenormal: '#426BFB',
        bluelight: '#426BFB4D',
        bluesuperlight: '#719DFA1A',
        rednormal: '#E24545',
      }
    },
  },
  plugins: [],
}
