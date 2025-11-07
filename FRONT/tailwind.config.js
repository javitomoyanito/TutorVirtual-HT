/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FF6F3C",
          secondary: "#FFD5A5",
          accent: "#D9481E",
          cream: "#FFF3E0",
          text: "#4A2C2A"
        }
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,0.08)" },
      fontFamily: { rounded: ['"Quicksand"', "ui-sans-serif", "system-ui", "sans-serif"] }
    }
  },
  plugins: [],
}
