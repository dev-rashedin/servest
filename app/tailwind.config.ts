import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Merriweather', 'serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'radial-green':
          'radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)',
      },
    },
  },
  plugins: [],
};

export default config;
