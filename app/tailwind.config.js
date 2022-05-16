module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        prodekoBlue: '#002851',
        backgroundWhite: '#F0F0F2',
        textGrey: '#434347',
      },
      backgroundImage: {
        prodekoBtn: "url('~/common/images/buttonBackground.png')",
        logo: "url('~/common/images/prodekoLogoShade.png')",
      },
    },
  },
  plugins: [],
}
