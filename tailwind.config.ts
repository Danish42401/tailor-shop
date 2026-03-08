/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // CMS-controlled via CSS variables — these are defaults
                primary: {
                    DEFAULT: 'var(--color-primary, #4A1D96)',
                    hover: 'var(--color-primary-hover, #3B0764)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent, #D4AF37)',
                },
                surface: {
                    DEFAULT: 'var(--color-surface, #FAF7FF)',
                    dark: 'var(--color-surface-dark, #1A1033)',
                },
                background: {
                    DEFAULT: 'var(--color-background, #FFFFFF)',
                    dark: 'var(--color-background-dark, #0F0A1E)',
                },
                foreground: {
                    DEFAULT: 'var(--color-text, #1A1A2E)',
                    dark: 'var(--color-text-dark, #F3E8FF)',
                },
                // Fixed palette for design consistency
                purple: {
                    50: '#FAF5FF',
                    100: '#F3E8FF',
                    200: '#E9D5FF',
                    300: '#D8B4FE',
                    400: '#C084FC',
                    500: '#A855F7',
                    600: '#9333EA',
                    700: '#7C3AED',
                    800: '#6D28D9',
                    900: '#4A1D96',
                    950: '#3B0764',
                },
                gold: {
                    300: '#F5D875',
                    400: '#ECC840',
                    500: '#D4AF37',
                    600: '#B8962E',
                    700: '#936D1A',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
                arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'slide-in-left': 'slideInLeft 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-subtle': 'bounceSubtle 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
            },
            screens: {
                xs: '375px',
            },
            boxShadow: {
                luxury: '0 4px 24px rgba(74, 29, 150, 0.15)',
                'luxury-lg': '0 8px 40px rgba(74, 29, 150, 0.2)',
                'gold': '0 4px 16px rgba(212, 175, 55, 0.3)',
            },
            backgroundImage: {
                'gradient-luxury': 'linear-gradient(135deg, #4A1D96 0%, #6D28D9 50%, #3B0764 100%)',
                'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F5D875 50%, #B8962E 100%)',
                'gradient-dark': 'linear-gradient(135deg, #0F0A1E 0%, #1A1033 100%)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
