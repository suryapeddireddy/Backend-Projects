/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html", // Include any HTML files in the public directory
  ],
  theme: {
    extend: {},
  },
 plugins: [require("daisyui")]
};
