/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#E63946",
          dark: "#C1121F",
        },
        accent: "#F4A261",
        cream: "#FFF8F0",
        charcoal: "#2B2118",
        muted: "#6B5B4E",
        success: "#588157",
        warning: "#E76F51",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};