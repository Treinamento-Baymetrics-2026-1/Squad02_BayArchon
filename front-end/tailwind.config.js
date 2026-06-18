/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'azul-marinho': '#20234A',
        'azul-corporativo': '#324A8A',
        'azul-interativo': '#4F7DFF',
        'preto-suave': '#111827',
        'cinza-escuro': '#4B5563',
        'cinza-medio': '#D1D5DB',
        'cinza-claro': '#F3F4F6',
        'verde': '#22C55E',
        'amarelo': '#F59E0B',
        'vermelho': '#EF4444',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}

