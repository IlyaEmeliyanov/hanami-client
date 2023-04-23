/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('./images/login-bg.png')",
      }
    },
    colors: {
      "fontPrimary": "#fff",
      "fontSecondary": "#8D95A1",
      "active": "#EFBB36",
      "black": "#070707",
      "arancio": "#E78429",
      "giallo": "#EABE4E",
    }
  },
  plugins: [],
}
