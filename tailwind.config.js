/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#ffff",
      gold: "#EECD58",
      red: "#DD5050",

      purple: {
        100: "#31203F",
        200: "#19071E",
      },

      pink: "#A40DAC",
      gradientStart: "#FF93D4",
      gradientEnd: "#9A00A8",
      gradientGreenStart: "#259CA3",
      gradientGreenEnd: "#78FF75",
    },
    extend: {},
  },
  plugins: [],
};
