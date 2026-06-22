import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f59e0b',
        secondary: '#ea580c',
        dark: '#0a0a0a',
      },
    },
  },
  plugins: [],
};

export default config;
