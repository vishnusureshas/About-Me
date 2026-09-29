import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        jetbrains: ["var(--font-jetbrains)", "monospace"],
        space: ["var(--font-space)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        premium: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.45), 0 0 40px rgba(0,212,255,0.12)",
        soft: "0 8px 32px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2.5s linear infinite",
        "border-spin": "border-spin 4s linear infinite",
        aurora: "aurora 12s ease-in-out infinite",
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
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(-10%, -10%) scale(1)", opacity: "0.5" },
          "50%": { transform: "translate(10%, 5%) scale(1.15)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
}
export default config
