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
        'preto-claro': '#0a0a0a',
        'bordaoff-white': '#d1d5db',
        'off-white': '#F8FAFB',
        'azul-marinho': '#20234A',
        'azul-corporativo': '#324A8A',
        'azul-interativo': '#4F7DFF',
        'azul-suave': '#BFDBFE',
        'preto-suave': '#111827',
        'cinza-escuro': '#4B5563',
        'cinza-medio': '#D1D5DB',
        'cinza-claro': '#F3F4F6',
        'verde': '#22C55E',
        'verde-escuro': '#02501E',
        'verde-claro': '#86EFAC',
        'amarelo': '#F59E0B',
        'amarelo-suave': '#FDE68A',
        'amarelo-escuro': '#9A6100',
        'roxo': '#8B5CF6',
        'roxo-suave': '#E9D5FF',
        'roxo-escuro': '#581C87',
        'vermelho': '#EF4444',
        'vermelho-escuro': '#D30202',
        'vermelho-claro': '#FCA5A5',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],

}
