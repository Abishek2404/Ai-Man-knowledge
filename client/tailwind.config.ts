import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b1020",
        line: "#23304f",
        paper: "#0f172a",
        mint: "#22d3ee",
        amber: "#f59e0b",
        berry: "#f43f5e",
        panel: "#111827",
        glow: "#7c3aed"
      }
    }
  },
  plugins: []
};

export default config;
