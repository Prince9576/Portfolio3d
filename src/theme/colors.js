/**
 * Portfolio Theme Colors
 * Centralized color system for consistent theming across the 3D portfolio
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#F3F0FF',   // Lightest purple
    100: '#E6E0FF',  // Very light purple
    200: '#C7B8FF',  // Light purple
    300: '#A78BFF',  // Medium light purple
    400: '#8B5CF6',  // Medium purple
    500: '#7B68EE',  // Soft Lavender (main brand)
    600: '#6D28D9',  // Medium dark purple
    700: '#5B21B6',  // Dark purple
    800: '#4C1D95',  // Very dark purple
    900: '#3B0764',  // Darkest purple
  },

  // Secondary Accent Colors
  accent: {
    50: '#FFF7ED',   // Lightest orange
    100: '#FFEDD5',  // Very light orange
    200: '#FED7AA',  // Light orange
    300: '#FDBA74',  // Medium light orange
    400: '#FB923C',  // Medium orange
    500: '#F97316',  // Warm orange (main accent)
    600: '#EA580C',  // Medium dark orange
    700: '#C2410C',  // Dark orange
    800: '#9A3412',  // Very dark orange
    900: '#7C2D12',  // Darkest orange
  },

  // Sky & Environment Colors
  sky: {
    top: '#B8B5FF',      // Light Periwinkle (top)
    mid: '#7B68EE',      // Soft Lavender (middle)
    bottom: '#FFFFFF',   // White (bottom)
    fog: '#EAF6F6',      // Light blue fog
  },

  // Ground & Platform Colors
  ground: {
    dirt: '#5B3EA4',     // Deep purple
    grass: '#4C1D95',    // Darker purple for grass
    platform: '#F26A30', // Warm orange for sections
  },

  // Tree & Nature Colors
  nature: {
    foliage: '#1B1643',  // Navy blue foliage
    foliageLight: '#2D245A', // Lighter tree tone
    bark: '#8B5CF6',     // Purple bark
  },

  // Cloud Colors
  cloud: {
    base: '#ECECEC',     // Pale neutral grey
    shadow: '#B8B8B8',   // Subtle depth tones
  },

  // Tech Brand Colors
  tech: {
    javascript: '#F7DF1E',  // Yellow
    angular: '#DD0031',     // Red
    react: '#61DAFB',       // Blue
    html: '#E34F26',        // Orange
    css: '#1572B6',         // Blue
    typescript: '#3178C6',  // Blue
    github: '#181717',      // Black
  },

  // Neutral Colors
  neutral: {
    50: '#FAFAFA',      // Almost white
    100: '#F5F5F5',     // Very light grey
    200: '#E5E5E5',     // Light grey
    300: '#D4D4D4',     // Medium light grey
    400: '#A3A3A3',     // Medium grey
    500: '#737373',     // Medium dark grey
    600: '#525252',     // Dark grey
    700: '#404040',     // Very dark grey
    800: '#262626',     // Almost black
    900: '#171717',     // Black
  },

  // Semantic Colors
  semantic: {
    success: '#10B981',   // Green
    warning: '#F59E0B',   // Yellow
    error: '#EF4444',     // Red
    info: '#3B82F6',      // Blue
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',           // White
    secondary: '#F8FAFC',         // Light grey
    dark: '#0F0F23',             // Dark blue
    modal: 'rgba(0,0,0,0.6)',    // Semi-transparent black
    contact: 'rgb(17 7 50)',     // Dark purple
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',           // White
    secondary: '#E5E7EB',         // Light grey
    muted: '#9CA3AF',             // Medium grey
    accent: '#F97316',            // Orange accent
    dark: '#1F2937',              // Dark grey
  },

  // Border Colors
  border: {
    light: '#E5E7EB',             // Light grey
    medium: '#D1D5DB',            // Medium grey
    dark: '#374151',              // Dark grey
    accent: '#F97316',            // Orange accent
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(0,0,0,0.1)',
    medium: 'rgba(0,0,0,0.2)',
    dark: 'rgba(0,0,0,0.3)',
    colored: 'rgba(139, 92, 246, 0.3)', // Purple shadow
  }
};

// Color utility functions
export const getColor = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], colors);
};

// Common color combinations
export const colorCombinations = {
  primary: {
    bg: colors.primary[500],
    text: colors.text.primary,
    hover: colors.primary[600],
  },
  accent: {
    bg: colors.accent[500],
    text: colors.text.primary,
    hover: colors.accent[600],
  },
  dark: {
    bg: colors.background.dark,
    text: colors.text.primary,
    border: colors.border.dark,
  },
  light: {
    bg: colors.background.primary,
    text: colors.text.dark,
    border: colors.border.light,
  }
};

export default colors;
