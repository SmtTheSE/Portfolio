/** @type {import('tailwindcss').Config} */
const rgb = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: rgb('bg'),
        fg: rgb('fg'),
        muted: rgb('muted'),
        line: rgb('line'),
        panel: rgb('panel'),
        ink: rgb('ink'),
        'win-green': rgb('win-green'),
        'win-forest': rgb('win-forest'),
        'win-blue': rgb('win-blue'),
        'win-sun': rgb('win-sun'),

        // Legacy token names still used by the AT Protocol components.
        'primary-bg': rgb('bg'),
        'secondary-bg': rgb('panel'),
        surface: rgb('panel'),
        'text-main': rgb('fg'),
        'text-muted': rgb('muted'),
        'border-light': rgb('line'),
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};
