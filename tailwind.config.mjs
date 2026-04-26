/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1F4D',
          'navy-deep': '#050F2D',
          blue: '#1D4ED8',
          gold: '#F4A100',
          'gold-soft': '#C9A961',
        },
        bg: { DEFAULT: '#FAFAF7', card: '#FFFFFF' },
        text: { DEFAULT: '#0F172A', muted: '#475569', light: '#94A3B8' },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      maxWidth: { container: '1280px' },
    },
  },
  plugins: [],
};
