/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#FFFFFF',
        'secondary-bg': '#F9F9F9', // More subtle than E6E6E6
        'text-main': '#1A1A1A',   // Deeper black
        'text-muted': '#666666', // For tiny text/subtitles
        'cta-red': '#000000',     // Minimalist: black instead of red
        'border-light': '#EDEDED', // Very subtle border
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'], // Professional standard
        mono: ['"JetBrains Mono"', 'monospace'],    // For developer feel
      },
    },
  },
  plugins: [],
};
