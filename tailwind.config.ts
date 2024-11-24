import typography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['var(--font-sans)'],
      mono: ['var(--font-mono)'],
    },
  },
  plugins: [typography, animate],
} satisfies Config;
