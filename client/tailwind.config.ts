import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        line: "#d9e2ec",
        paper: "#f7fafc",
        mint: "#0f766e",
        amber: "#b45309",
        berry: "#9f1239"
      }
    }
  },
  plugins: []
};

export default config;
