import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        peat: {
          DEFAULT: "#EDC5AB",
          light: "#F4D4BA",
          dark: "#D39872",
        },
        master: {
          DEFAULT: '#8fdc89',
          light: '#F9FFED',
          border: '#022C22',
          accent: '#34D399',
          dark: '#365E35',
        },
        daily: {
          DEFAULT: "#eac88c",
          light: "#FDEADC",
          border: "#B38D4D",
          accent: "#D97706",
          dark: "#EFB65A",
        }
      },
    },
  },
  plugins: [],
};
export default config;
