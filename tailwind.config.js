/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
  },
  extend: {
    colors: {
      primaryCol: 'hsla(234, 100%, 66%, 1)',
      secCol: 'hsla(232, 100%, 74%, 1)',
      thirdCol: 'hsla(227, 100%, 80%, 1)',
      fourCol: 'hsla(218, 100%, 87%, 1)',
      fiveCol: 'hsla(184, 100%, 94%, 1)',
    }
  },
  },
  plugins: [],
}
