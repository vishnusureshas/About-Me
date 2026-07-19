import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        primary: "#00d4ff",
        secondary: "#7b2ff7",
        accent: "#ff6ec7",
        dark: "#0a0a1a",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        glow: {
          from: { boxShadow: "0 0 5px rgba(0, 212, 255, 0.3)" },
          to: { boxShadow: "0 0 30px rgba(0, 212, 255, 0.6), 0 0 60px rgba(123, 47, 247, 0.3)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      backgroundSize: {
        "300%": "300% 300%",
      },
    },
  },
  plugins: [],
}
export default config
