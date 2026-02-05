/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',     // Sky blue - main accent
        secondary: '#38bdf8',   // Lighter sky blue
        accent: '#0284c7',      // Sky 600 - darker accent
        success: '#10b981',     // Keep green for success
        dark: '#0a0e27',        // Dark navy background
        darker: '#020617',      // Slate 950 - deeper dark
        light: '#e2e8f0',       // Light gray
        glow: '#0ea5e9',        // Glow color matching primary
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rotate': 'rotate 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'slide-in-up': 'slideInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'bounce-in': 'bounceIn 0.8s ease-out forwards',
        'flip-in': 'flipIn 0.6s ease-out forwards',
        'float-icon': 'floatIcon 3s ease-in-out infinite',
        'rotate-glow': 'rotateGlow 4s linear infinite',
        'float-image': 'floatImage 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'move-circle': 'moveCircle 20s ease-in-out infinite',
        'color-shift': 'colorShift 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatIcon: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotateGlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatImage: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        flipIn: {
          '0%': { opacity: '0', transform: 'rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'rotateX(0deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.8), 0 0 60px rgba(56, 189, 248, 0.4)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-20deg)' },
        },
        moveCircle: {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)',
          },
          '25%': { 
            transform: 'translate(100px, -80px) scale(1.3)',
          },
          '50%': { 
            transform: 'translate(80px, 120px) scale(0.7)',
          },
          '75%': { 
            transform: 'translate(-120px, 60px) scale(1.1)',
          },
        },
        colorShift: {
          '0%': { 
            opacity: '0.15',
            filter: 'hue-rotate(0deg) brightness(1)',
          },
          '25%': { 
            opacity: '0.3',
            filter: 'hue-rotate(90deg) brightness(1.2)',
          },
          '50%': { 
            opacity: '0.2',
            filter: 'hue-rotate(180deg) brightness(1.1)',
          },
          '75%': { 
            opacity: '0.25',
            filter: 'hue-rotate(270deg) brightness(1.15)',
          },
          '100%': { 
            opacity: '0.15',
            filter: 'hue-rotate(360deg) brightness(1)',
          },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
}
