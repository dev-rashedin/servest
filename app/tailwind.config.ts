import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  darkMode: 'class',
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
      colors: {
        'yellow-sunshine': '#FACC15',
        'yellow-dusk': '#FFAF45',
        'deep-ocean': '#000055',
        'faded-pearl': '#ffffcc',
        'white-pearl': '#f9f9f9',
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 204, 112, 0.7), 0 0 40px rgba(200, 80, 192, 0.5), 0 0 60px rgba(65, 88, 208, 0.3)',
        glow2: '0 0 3px #ffdb4d, 0 0 6px #FFAF45, 0 0 9px #FF8225',
        glow3:
          '0 0 30px rgba(0, 38, 77, 0.7), 0 0 60px rgba(0, 73, 141, 0.5), 0 0 90px rgba(0, 82, 162, 0.3)',
      },
    },
  },
  plugins: [typography],
};

export default config;
