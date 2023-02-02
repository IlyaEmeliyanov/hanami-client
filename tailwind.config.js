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
      "fontSecondary": "#8D95A1"
    }
  },
  plugins: [],
}
