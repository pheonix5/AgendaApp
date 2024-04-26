import { theme } from "./src/theme/theme"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: theme.fontFamily,
      colors: theme.color,
    },
  },
  plugins: [],
}