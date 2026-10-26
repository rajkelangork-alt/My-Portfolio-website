import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF7',
          100: '#F7F5F0',
          200: '#EFECE6',
          300: '#E2DDD3',
        },
        carbon: {
          900: '#121413',
          800: '#1C1F1E',
          700: '#2B2F2D',
          500: '#525854',
          300: '#8C928E',
          100: '#DDE0DC',
        },
        auto: {
          yellow: '#E5A93C',
          orange: '#F28C28',
          red: '#D9381E',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;