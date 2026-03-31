import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        card: "var(--color-card)",
        primary: "var(--color-primary)",
        text: "var(--color-text)",
        neutral: "var(--color-neutral)",
      },
    },
  },
  plugins: [],
} satisfies Config;