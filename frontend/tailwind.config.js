// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#07C7F2',
        secondary: '#07DBF2',
        tetriary: '#0CF2DB',
        dark: '#253540',
        bright: '#F2F2F2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
