import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: "#12305c",
          700: "#1e4b8c",
          500: "#2f6fb0",
          100: "#eaf1fa",
        },
        gray: {
          50: "#f4f6f8",
          200: "#e2e6ea",
          500: "#5c6773",
        },
        ink: "#16212b",
        accent: {
          green: "#3f8f5f",
          orange: "#dc8a3c",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Iowan Old Style", "Palatino Linotype", "serif"],
        sans: [
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
