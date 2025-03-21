// tailwind.config.mjs
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buttonprimary: "#b57cff",
        buttonsecondary: "#ff6347",
        purpleaccent: "#6A4C9C",
      },
    },
  },
  plugins: [],
};
