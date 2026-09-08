/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#FBFBFD',   // Apple-style off-white canvas
        'secondary-bg': '#F5F5F7', // Soft gray section wash
        'surface': '#FFFFFF',      // Card surface on top of the wash
        'text-main': '#1D1D1F',    // Apple near-black
        'text-muted': '#6E6E73',   // Apple secondary gray
        'cta-red': '#000000',
        'border-light': '#E8E8ED',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        // Specular top rim (light catching the glass edge) + soft ambient falloff — the core "liquid glass" material.
        liquid: 'inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -1px 0 rgba(255,255,255,0.2), 0 1px 1px rgba(0,0,0,0.03), 0 8px 24px -8px rgba(0,0,0,0.10), 0 2px 6px -2px rgba(0,0,0,0.06)',
        'liquid-lg': 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.04), 0 24px 48px -16px rgba(0,0,0,0.16), 0 8px 16px -8px rgba(0,0,0,0.08)',
        'liquid-inset': 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.04)',
        'liquid-press': 'inset 0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backdropBlur: {
        liquid: '20px',
      },
    },
  },
  plugins: [],
};
