/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          soft: '#111111',
          elevated: '#161616',
          card: '#0f0f0f',
        },
        ink: {
          DEFAULT: '#f5f5f5',
          soft: '#d4d4d4',
          muted: '#a3a3a3',
          faint: '#737373',
          ghost: '#525252',
        },
        line: {
          DEFAULT: 'rgba(255, 255, 255, 0.07)',
          strong: 'rgba(255, 255, 255, 0.13)',
        },
        accent: {
          DEFAULT: '#5eada6',
          soft: 'rgba(94, 173, 166, 0.12)',
          glow: 'rgba(94, 173, 166, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0, 0, 0, 0.4)',
        lift: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};
