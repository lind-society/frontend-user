import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      fontFamily: {
        /* Inter — body copy, buttons, forms, list items */
        primary: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        /* Playfair Display — hero/section headings and product names */
        display: ['var(--font-display)', ...defaultTheme.fontFamily.serif],
        /* Lora — card titles, breadcrumbs, price blocks */
        heading: ['var(--font-heading)', ...defaultTheme.fontFamily.serif],
        serif: ['var(--font-heading)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        /* ---- LIND Society brand palette ---- */
        bronze: {
          DEFAULT: '#A2754C',
          50: '#FAF5EF',
          100: '#F0E3D2',
          200: '#E0C8A9',
          300: '#CFAC81',
          400: '#BB9066',
          500: '#A2754C',
          600: '#8A6340',
          700: '#6E4F33',
          800: '#523B26',
          900: '#36271A',
        },
        sand: '#EADAC7',
        /* muted warm text used on the dark feature cards */
        'cream-dim': '#D7C8B0',
        cream: '#FCF0E2',
        'cream-light': '#FDF3E6',
        /* footer band — the design uses this on every page, and it is a shade
           warmer than cream-light; measured off the exports in Design baru/ */
        'cream-warm': '#FAF0E7',
        bone: '#F6F3EC',
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#363533',
          muted: '#68625A',
        },
        /* ---- legacy semantic aliases, remapped to the new brand ---- */
        primary: '#A2754C',
        'primary-hover': '#8A6340',
        secondary: '#EADAC7',
        tertiary: '#FCF0E2',
        text: '#1A1A1A',
        bg: '#F6F3EC',
        'primary-blue': '#003D67',
        'secondary-blue': '#023151',
        'tertiary-blue': '#0B77C2',
        'primary-red': '#E30314',
        'secondary-red': '#AE020F',
        'tertiary-red': '#EC2C3B',
        'primary-yellow': '#F0B100',
        'secondary-yellow': '#CB9705',
        'tertiary-yellow': '#FFCE45',
        background: '#F6F3EC',
        warning: '#FF8A00',
        danger: '#EA4B48',
        'gray-custom': {
          '50': '#F2F2F2',
          '100': '#E6E6E6',
          '200': '#CCCCCC',
          '300': '#B3B3B3',
          '400': '#999999',
          '500': '#808080',
          '600': '#666666',
          '700': '#4D4D4D',
          '800': '#333333',
          '900': '#1A1A1A',
        },
        'green-gray': {
          '50': '#EDF2EE',
          '100': '#DAE5DA',
          '200': '#B4CCB4',
          '300': '#96B297',
          '400': '#7A997C',
          '500': '#618062',
          '600': '#406B42',
          '700': '#2B572E',
          '800': '#173B1A',
          '900': '#002603',
        },
        dark: '#1A1A1A',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(-100% - var(--gap)))',
          },
        },
        'marquee-vertical': {
          from: {
            transform: 'translateY(0)',
          },
          to: {
            transform: 'translateY(calc(-100% - var(--gap)))',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [forms, animate, typography],
} satisfies Config;
