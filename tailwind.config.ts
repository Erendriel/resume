import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Sora", "sans-serif"],
      },
      colors: {
        /* Orange accent */
        orange: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        /* Violet accent */
        violet: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        /* Dark surfaces */
        dark: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#080810",
        },
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh":    "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(249,115,22,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(139,92,246,0.10) 0%, transparent 60%)",
        "gradient-hero":    "linear-gradient(135deg, #080810 0%, #0d0d1a 50%, #100820 100%)",
        "gradient-card":    "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        "gradient-orange":  "linear-gradient(135deg, #f97316, #fb923c)",
        "gradient-violet":  "linear-gradient(135deg, #8b5cf6, #6366f1)",
        "gradient-brand":   "linear-gradient(135deg, #f97316 0%, #fb923c 40%, #8b5cf6 100%)",
      },
      boxShadow: {
        "glow-orange":   "0 0 30px rgba(249,115,22,0.35), 0 0 60px rgba(249,115,22,0.12)",
        "glow-orange-sm":"0 0 15px rgba(249,115,22,0.4)",
        "glow-violet":   "0 0 30px rgba(139,92,246,0.35), 0 0 60px rgba(139,92,246,0.12)",
        "glow-violet-sm":"0 0 15px rgba(139,92,246,0.4)",
        "glass":         "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg":      "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card":          "0 4px 24px rgba(0,0,0,0.5)",
        "card-hover":    "0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(249,115,22,0.1)",
      },
      borderColor: {
        glass:       "rgba(255,255,255,0.08)",
        "glass-orange": "rgba(249,115,22,0.25)",
        "glass-violet": "rgba(139,92,246,0.25)",
      },
      animation: {
        /* Existing */
        "fade-in":      "fadeIn 0.6s ease forwards",
        "slide-up":     "slideUp 0.6s ease-out forwards",
        /* New */
        "fade-up":      "fadeUp 0.7s ease forwards",
        "slide-right":  "slideRight 0.6s ease forwards",
        "scale-in":     "scaleIn 0.5s ease forwards",
        float:          "float 4s ease-in-out infinite",
        "float-slow":   "floatSlow 6s ease-in-out infinite",
        "orb-pulse":    "orbPulse 8s ease-in-out infinite",
        shimmer:        "shimmer 2s linear infinite",
        "gradient-x":   "gradientX 4s ease infinite",
        "gradient-rotate": "gradientRotate 4s linear infinite",
        blink:          "blink 1s step-end infinite",
        "spin-slow":    "spin 8s linear infinite",
        "ping-slow":    "ping 3s cubic-bezier(0,0,0.2,1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":     { transform: "translateY(-8px) rotate(3deg)" },
        },
        orbPulse: {
          "0%,100%": { transform: "scale(1)",    opacity: "0.15" },
          "50%":     { transform: "scale(1.15)", opacity: "0.25" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        gradientX: {
          "0%,100%": { backgroundPosition: "0% 50%"   },
          "50%":     { backgroundPosition: "100% 50%"  },
        },
        gradientRotate: {
          "0%":   { backgroundPosition: "0% 50%"   },
          "50%":  { backgroundPosition: "100% 50%"  },
          "100%": { backgroundPosition: "0% 50%"   },
        },
        blink: {
          "0%,50%": { opacity: "1" },
          "51%,100%": { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
