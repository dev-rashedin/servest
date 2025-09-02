import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  darkMode: ['class', 'class'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Merriweather', 'serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'radial-green':
          'radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)',
        'blue-radial-glow':
          'radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)',
        'black-top-glow': `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000`,
        'moonlight-silver': `
          radial-gradient(circle at 50% 50%, 
            rgba(203, 213, 225, 0.12) 0%, 
            rgba(203, 213, 225, 0.07) 25%, 
            rgba(203, 213, 225, 0.03) 35%, 
            transparent 50%
          )
        `,
      },
      colors: {
        'yellow-sunshine': '#FACC15',
        'yellow-dusk': '#FFAF45',
        'deep-ocean': '#000055',
        'faded-pearl': '#ffffcc',
        'white-pearl': '#f9f9f9',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 204, 112, 0.7), 0 0 40px rgba(200, 80, 192, 0.5), 0 0 60px rgba(65, 88, 208, 0.3)',
        glow2: '0 0 3px #ffdb4d, 0 0 6px #FFAF45, 0 0 9px #FF8225',
        glow3:
          '0 0 30px rgba(0, 38, 77, 0.7), 0 0 60px rgba(0, 73, 141, 0.5), 0 0 90px rgba(0, 82, 162, 0.3)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [typography, tailwindAnimate],
};

export default config;
