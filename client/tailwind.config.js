/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "degase-blue-dark": "#003366",
        "degase-blue": "#0066cc",
        "degase-blue-light": "#e6f2ff",
      },
    },
  },
  plugins: [],
}
