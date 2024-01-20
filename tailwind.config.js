/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}", "./script/**/*.{js,html}"],
  theme: {
    fontFamily: {
      'anton' : ['Anton','sans-serif'],
      'manrope' : ['Manrope','sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
