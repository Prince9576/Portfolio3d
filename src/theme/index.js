/**
 * Portfolio Theme System
 * Centralized theming for the 3D portfolio application
 */

export { colors, colorCombinations, getColor } from './colors.js';
export { tailwindTheme } from './tailwindTheme.js';
export { ThemeProvider, useTheme } from './ThemeContext.js';

// Re-export everything for easy importing
export * from './colors.js';
export * from './tailwindTheme.js';
export * from './ThemeContext.js';
