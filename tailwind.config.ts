import type {Config} from 'tailwindcss';

export default {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        'game-screen': {
          DEFAULT: 'hsl(220, 30%, 5%)', // Corresponds to the .bg-game-screen class
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
      },
      keyframes: {
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
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'explode-line': {
          '0%': { width: '0', opacity: '1', transform: 'rotate(var(--angle)) translateX(0)' },
          '100%': { width: 'var(--line-length, 50px)', opacity: '0', transform: 'rotate(var(--angle)) translateX(calc(var(--line-length, 50px) / 2))' },
        },
        'big-ball-bonus-animation': {
          '0%': {
            transform: 'translate(-50%, -50%) scale(3)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'translate(0, 0) scale(1)', 
            opacity: '1',
          },
        },
        'life-lost-animation': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5) rotate(15deg)', opacity: '0.7' },
          '100%': { transform: 'scale(0.5) rotate(-15deg)', opacity: '0' },
        },
        'animated-gradient-dark': { 
            '0%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
            '100%': { 'background-position': '0% 50%' },
        },
        'pulse-ball': { 
          '0%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.5)' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin': 'spin 4s linear infinite',
        'explode-line': 'explode-line 0.3s forwards',
        'big-ball-bonus': 'big-ball-bonus-animation 0.7s ease-out forwards',
        'life-lost': 'life-lost-animation 0.5s forwards',
        'animated-gradient': 'animated-gradient-dark 15s ease infinite', // Updated to use dark animation
        'pulse-ball': 'pulse-ball 0.3s ease-in-out',
      },
      backgroundSize: {
        '400%': '400% 400%',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
