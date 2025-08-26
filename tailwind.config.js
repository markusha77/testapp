/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0F0F0F',
        'cyber-darker': '#1B1B1B',
        'neon-pink': '#FF0080',
        'neon-cyan': '#00FFFF',
        'neon-green': '#8AFF00',
        'neon-yellow': '#FCEE09',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'exo': ['Exo 2', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
      boxShadow: {
        'neon-pink': '0 0 5px #FF0080, 0 0 10px #FF0080, 0 0 15px #FF0080',
        'neon-cyan': '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF',
        'neon-green': '0 0 5px #8AFF00, 0 0 10px #8AFF00, 0 0 15px #8AFF00',
        'neon-yellow': '0 0 5px #FCEE09, 0 0 10px #FCEE09, 0 0 15px #FCEE09',
      }
    },
  },
  plugins: [],
}
