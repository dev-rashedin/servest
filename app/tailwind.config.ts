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
      fontSize: {
        body: ['0.9rem', { lineHeight: '1.7', letterSpacing: '0.015em' }],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            a: { color: 'hsl(var(--brand))' },
            strong: { color: 'hsl(var(--foreground))' },
            h1: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
            },
            h2: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
            h3: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
            // Table styling

            pre: {
              margin: '0 !important',
              padding: '0 !important',
            },

            '.shiki': {
              padding: '1.5rem !important',
              borderRadius: '0.5rem !important',
            },
            blockquote: { color: 'hsl(var(--foreground))' },
          },
        },
      },

      colors: {
        'yellow-sunshine': '#FACC15',
        'yellow-dusk': '#FFAF45',
        'deep-ocean': '#000055',
        brand: 'hsl(var(--brand))',
        highlight: 'hsl(var(--highlighted))',
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
        glow: '0 0 5px #4d4d00, 0 0 10px #666600, 0 0 15px #808000',
        glow2: '0 0 1px #ffdb4d, 0 0 3px #FFAF45, 0 0 5px #FF8225',
        glow3: '0 0 3px #ffffcc, 0 0 6px #ffffe6, 0 0 9px #ffffff',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [typography, tailwindAnimate],
};

export default config;
