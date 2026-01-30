/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        latte: {
          base: "#eff1f5",
          mantle: "#e6e9ef",
          crust: "#dce0e8",
          text: "#4c4f69",
          subtext0: "#6c6f85",
          surface0: "#ccd0da",
          surface1: "#bcc0cc",
          surface2: "#acb0be",
          overlay0: "#9ca0b0",
          overlay1: "#8c8fa1",
          overlay2: "#7c7f93",
          blue: "#1e66f5",
          lavender: "#7287fd",
          peach: "#fe640b",
          red: "#d20f39",
          green: "#40a02b",
          yellow: "#df8e1d",
          mauve: "#8839ef",
          maroon: "#e64553",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        glass: "0 20px 60px -30px rgba(31, 30, 58, 0.35)",
        glow: "0 0 0 1px rgba(114, 135, 253, 0.3), 0 15px 40px -20px rgba(114, 135, 253, 0.6)",
      },
    },
  },
  plugins: [],
};
