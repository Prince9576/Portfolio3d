import { colors } from './colors.js';

/**
 * Extended Tailwind theme configuration
 * Maps our custom color system to Tailwind classes
 */
export const tailwindTheme = {
  colors: {
    // Primary purple colors
    primary: {
      50: colors.primary[50],
      100: colors.primary[100],
      200: colors.primary[200],
      300: colors.primary[300],
      400: colors.primary[400],
      500: colors.primary[500],
      600: colors.primary[600],
      700: colors.primary[700],
      800: colors.primary[800],
      900: colors.primary[900],
    },

    // Accent orange colors
    accent: {
      50: colors.accent[50],
      100: colors.accent[100],
      200: colors.accent[200],
      300: colors.accent[300],
      400: colors.accent[400],
      500: colors.accent[500],
      600: colors.accent[600],
      700: colors.accent[700],
      800: colors.accent[800],
      900: colors.accent[900],
    },

    // Sky colors
    sky: {
      top: colors.sky.top,
      mid: colors.sky.mid,
      bottom: colors.sky.bottom,
      fog: colors.sky.fog,
    },

    // Ground colors
    ground: {
      dirt: colors.ground.dirt,
      grass: colors.ground.grass,
      platform: colors.ground.platform,
    },

    // Nature colors
    nature: {
      foliage: colors.nature.foliage,
      foliageLight: colors.nature.foliageLight,
      bark: colors.nature.bark,
    },

    // Cloud colors
    cloud: {
      base: colors.cloud.base,
      shadow: colors.cloud.shadow,
    },

    // Tech brand colors
    tech: {
      javascript: colors.tech.javascript,
      angular: colors.tech.angular,
      react: colors.tech.react,
      html: colors.tech.html,
      css: colors.tech.css,
      typescript: colors.tech.typescript,
      github: colors.tech.github,
    },

    // Semantic colors
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    error: colors.semantic.error,
    info: colors.semantic.info,

    // Background colors
    bg: {
      primary: colors.background.primary,
      secondary: colors.background.secondary,
      dark: colors.background.dark,
      contact: colors.background.contact,
    },

    // Text colors
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      muted: colors.text.muted,
      accent: colors.text.accent,
      dark: colors.text.dark,
    },

    // Border colors
    border: {
      light: colors.border.light,
      medium: colors.border.medium,
      dark: colors.border.dark,
      accent: colors.border.accent,
    },
  },

  // Extended spacing for 3D elements
  spacing: {
    18: '4.5rem',
    88: '22rem',
    128: '32rem',
  },

  // Custom animations for 3D interactions
  animation: {
    float: 'float 6s ease-in-out infinite',
    'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'bounce-slow': 'bounce 2s infinite',
    'spin-slow': 'spin 3s linear infinite',
  },

  // Custom keyframes
  keyframes: {
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' },
    },
  },

  // Extended box shadows for 3D effects
  boxShadow: {
    '3d': '0 8px 0 #4338CA, 0 12px 20px rgba(0,0,0,0.3)',
    '3d-hover': '0 12px 0 #4338CA, 0 16px 24px rgba(0,0,0,0.4)',
    glow: '0 0 20px rgba(139, 92, 246, 0.3)',
    'glow-accent': '0 0 20px rgba(249, 115, 22, 0.3)',
  },

  // Custom gradients
  backgroundImage: {
    'gradient-sky': 'linear-gradient(to bottom, #B8B5FF 0%, #7B68EE 50%, #FFFFFF 100%)',
    'gradient-primary': 'linear-gradient(135deg, #7B68EE 0%, #5B21B6 100%)',
    'gradient-accent': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
  },
};

export default tailwindTheme;
