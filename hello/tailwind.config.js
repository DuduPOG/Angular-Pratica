/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Garante que ele procure classes nos seus HTMLs e Typescripts
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-primeui') // O plugin que estava dando erro antes
  ],
}
