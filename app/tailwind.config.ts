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
        body: ['Roboto', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        body: ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        code: ['0.95rem', { lineHeight: '1.5' }],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            lineHeight: '1.6',
            a: {
              color: 'hsl(var(--link))',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': { color: 'hsl(var(--link-hover))', textDecoration: 'underline' },
            },
            strong: { color: 'hsl(var(--foreground))', fontWeight: '600' },
            h1: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              letterSpacing: '-0.025em',
              marginBottom: '1.5rem',
            },
            h2: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              letterSpacing: '-0.015em',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },
            code: {
              fontWeight: '400',
              fontSize: '0.95rem',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.25rem',
              padding: '0.15rem 0.3rem',
            },
            table: { width: '100% !important', borderCollapse: 'collapse' },
            'table th': {
              textAlign: 'left',
              padding: '1.2rem 1rem !important',
            },
            'table td': { padding: '1rem !important' },

            pre: {
              margin: '0 !important',
              padding: '0 !important',
            },

            '.shiki': {
              padding: '1.5rem !important',
              borderRadius: '0.5rem !important',
              maxWidth: '100% !important',
            },
            blockquote: {
              color: 'hsl(var(--secondary-foreground))',
              borderLeft: '4px solid hsl(var(--brand)) !important',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
            },
          },
        },
      },

      colors: {
        'yellow-sunshine': '#FACC15',
        'yellow-dusk': '#FFAF45',
        brand: 'hsl(var(--brand))',
        highlight: 'hsl(var(--highlighted))',
        odd: 'hsl(var(--table-odd))',
        even: 'hsl(var(--table-even))',
        navbar: 'hsl(var(--navbar))',
        docs: 'hsl(var(--docs))',
        'c-docs': 'hsl(var(--border-docs))',
        'c-logo': 'hsl(var(--border-logo))',
        sidebar: 'hsl(var(--sidebar))',
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
