/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        // Electric Orange (Energy/Action)
        primary: {
          50: '#FFF5F0',
          100: '#FFEADB',
          200: '#FFD4B8',
          300: '#FFB88A',
          400: '#FF8C42',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#C24A23',
          800: '#9E3B1C',
          900: '#7A2D15',
        },
        // Neon Cyan (Health/Vitality)
        secondary: {
          50: '#E6FCFF',
          100: '#B3F5FF',
          200: '#80EEFF',
          300: '#4DE7FF',
          400: '#1AE0FF',
          500: '#00D9FF',
          600: '#00B4D8',
          700: '#0090AD',
          800: '#006C82',
          900: '#004857',
        },
        // Electric Purple (Premium/AI)
        accent: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        // Deep Navy Background
        dark: {
          50: '#E8EBF0',
          100: '#C5CAD6',
          200: '#9EA6B8',
          300: '#77829A',
          400: '#5A677F',
          500: '#3D4B64',
          600: '#2A3548',
          700: '#1A2333',
          800: '#0F1624',
          900: '#0A0F1C',
          950: '#050810',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.15), transparent 40%), radial-gradient(circle at 80% 20%, rgba(0, 217, 255, 0.15), transparent 40%), radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 60%)',
        'gradient-hero': 'linear-gradient(135deg, #0A0F1C 0%, #1A2333 50%, #0A0F1C 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(0, 217, 255, 0.1) 100%)',
        'gradient-button': 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FF6B35 100%)',
        'gradient-button-secondary': 'linear-gradient(135deg, #00D9FF 0%, #00B4D8 50%, #00D9FF 100%)',
        'gradient-text': 'linear-gradient(135deg, #FF6B35, #00D9FF)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(255, 107, 53, 0.4)',
        'glow-secondary': '0 0 20px rgba(0, 217, 255, 0.4)',
        'glow-accent': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(255, 107, 53, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}