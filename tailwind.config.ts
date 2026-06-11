import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        card: "#10101a",
        border: "rgba(255,255,255,0.06)",
        border2: "rgba(255,255,255,0.1)",
        accent: "#00d4ff",
        accent2: "#7c3aed",
        accent3: "#10b981",
        text1: "#f0f0f5",
        text2: "#a0a0b0",
        text3: "#606070",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease",
        "slide-up": "slideUp 0.4s ease",
        "pulse-slow": "pulse 3s infinite",
        "confetti-fall": "confettiFall 1.3s ease-in forwards",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        confettiFall: { "0%": { opacity: "1", transform: "translateY(0) rotate(0deg)" }, "100%": { opacity: "0", transform: "translateY(100vh) rotate(720deg)" } },
      },
    },
  },
  plugins: [],
};
export default config;
