/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_color: "#83967a",
        secondary_color: "#ffffff",
        gray_color: "#686866  ",
        lightGray_color1: "#d3d3d3",
        lightGray_color2: "#f5f5f5",
      },
      strokeWidth: {
        1: "0.6px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
