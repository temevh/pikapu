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
        buttonprimary: "#3490dc", // Replace with your desired color
        buttonsecondary: "#ff6347", // Another custom color
      },
    },
  },
  plugins: [],
};
