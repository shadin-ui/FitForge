/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
          ring: 'var(--primary-ring)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
          hover: 'var(--secondary-hover)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
          hover: 'var(--card-hover)',
        },
        muted: 'var(--muted)',
        border: 'var(--border)',
        input: 'var(--input)',
      },
      boxShadow: {
        'primary-sm': '0 2px 4px var(--shadow-primary)',
        'primary-md': '0 4px 8px var(--shadow-primary)',
        'primary-lg': '0 8px 16px var(--shadow-primary)',
        'primary-xl': '0 12px 24px var(--shadow-primary)',
      },
      ringColor: {
        'primary-ring': 'var(--primary-ring)',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 6s ease infinite',
      },
    },
  },
  plugins: [],
}
