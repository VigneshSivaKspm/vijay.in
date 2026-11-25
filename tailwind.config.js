/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cinemaBlack: 'rgb(var(--cinema-black) / <alpha-value>)',
        charcoal: 'rgb(var(--charcoal) / <alpha-value>)',
        graphite: 'rgb(var(--graphite) / <alpha-value>)',
        ivory: 'rgb(var(--ivory) / <alpha-value>)',
        silver: 'rgb(var(--silver) / <alpha-value>)',
        crimson: 'rgb(var(--crimson) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        violet: 'rgb(var(--violet) / <alpha-value>)',
        magenta: 'rgb(var(--magenta) / <alpha-value>)',
        royalBlue: 'rgb(var(--royal-blue) / <alpha-value>)',
        orange: 'rgb(var(--orange) / <alpha-value>)',
        teal: 'rgb(var(--teal) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        editorial: ['"Playfair Display"', 'serif'],
        body: ['Manrope', 'sans-serif'],
        caption: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'mask-reveal': 'maskReveal 1s ease forwards',
        'line-reveal': 'lineReveal 1s ease forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'grain': 'grain 0.4s steps(1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        maskReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        lineReveal: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '30%': { transform: 'translate(3%,-15%)' },
          '50%': { transform: 'translate(12%,9%)' },
          '70%': { transform: 'translate(9%,4%)' },
          '90%': { transform: 'translate(-1%,7%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
