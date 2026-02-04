/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--bg)",
        "cream-card": "var(--bg-card)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        teal: "var(--teal)",
        "teal-soft": "var(--teal-soft)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        card: "var(--radius)",
        "card-sm": "var(--radius-sm)",
      },
    },
  },
  plugins: [],
}
