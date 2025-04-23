/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: {
  extend: {
    keyframes: {
      vibrate: {
        '0%': { transform: 'translateX(0)' },
        '25%': { transform: 'translateX(-2px)' },
        '50%': { transform: 'translateX(2px)' },
        '75%': { transform: 'translateX(-2px)' },
        '100%': { transform: 'translateX(0)' },
      },
    },
    animation: {
      vibrate: 'vibrate 0.3s ease-in-out',
    },
  },
}
};
