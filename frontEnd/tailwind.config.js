/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.4)',
      },
    },
  },
  plugins: [import("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#8b5cf6",
          "secondary": "#ec4899",
          "accent": "#22c55e",
          "neutral": "#f3f4f6",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
        dark: {
          "primary": "#a78bfa",
          "secondary": "#f472b6",
          "accent": "#4ade80",
          "neutral": "#1f2937",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "info": "#60a5fa",
          "success": "#4ade80",
          "warning": "#fbbf24",
          "error": "#f87171",
        },
      },
    ],
  },
}