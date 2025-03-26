/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // שומר על אפשרות dark אם תרצה להפעיל בעתיד
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F9', // רקע כללי בהיר
        primary: '#4A90E2',     // כחול טורקיז יוקרתי
        secondary: '#D4AF37',   // זהב עדין
        text: '#333333',        // טקסט ראשי
        muted: '#666666',       // טקסט משני
        white: '#FFFFFF',
        black: '#000000'
      },
      fontFamily: {
        alef: ['Alef', 'sans-serif'], // פונט עברי
      },
    },
  },
  plugins: [],
}
// Compare this snippet from src/pages/BookingsPage.jsx: