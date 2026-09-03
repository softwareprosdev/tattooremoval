import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF7F2",
          50: "#FFFFFF",
          100: "#FDFCFA",
          200: "#FAF7F2",
          300: "#F3EDE2",
        },
        champagne: {
          DEFAULT: "#E8DCC8",
          50: "#F6F0E6",
          100: "#EFE4D2",
          200: "#E8DCC8",
          300: "#D9C7A6",
          400: "#C7AE84",
        },
        charcoal: {
          DEFAULT: "#2B2925",
          50: "#8A857A",
          100: "#6E695E",
          200: "#514C43",
          300: "#3A362F",
          400: "#2B2925",
          500: "#1E1C19",
        },
        obsidian: "#0E0D0C",
        taupe: {
          DEFAULT: "#A79C8C",
          50: "#EFEBE4",
          100: "#DCD3C4",
          200: "#C4B7A2",
          300: "#A79C8C",
          400: "#8B7F6E",
        },
        metal: {
          DEFAULT: "#B8A88E",
          light: "#D4C7B0",
          dark: "#8C7F68",
        },
        laser: {
          DEFAULT: "#7FDBD4",
          glow: "#A8F0E8",
          deep: "#3E8E88",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      borderRadius: {
        xs: "2px",
      },
      boxShadow: {
        soft: "0 8px 40px -12px rgba(43, 41, 37, 0.18)",
        glow: "0 0 60px -10px rgba(127, 219, 212, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 3s linear infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
