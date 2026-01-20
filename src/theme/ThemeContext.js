import React, { createContext, useContext } from 'react';
import { colors, colorCombinations } from './colors.js';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors,
    colorCombinations,

    // Utility functions
    getColor: (path) => {
      return path.split('.').reduce((obj, key) => obj?.[key], colors);
    },

    // Common style objects
    styles: {
      button: {
        primary: {
          backgroundColor: colors.primary[500],
          color: colors.text.primary,
          border: `1px solid ${colors.primary[600]}`,
          '&:hover': {
            backgroundColor: colors.primary[600],
          },
        },
        accent: {
          backgroundColor: colors.accent[500],
          color: colors.text.primary,
          border: `1px solid ${colors.accent[600]}`,
          '&:hover': {
            backgroundColor: colors.accent[600],
          },
        },
      },

      input: {
        default: {
          backgroundColor: colors.neutral[800] + '40', // 40% opacity
          color: colors.text.primary,
          border: `1px solid ${colors.border.medium}`,
          '&:focus': {
            borderColor: colors.accent[500],
            outline: 'none',
            boxShadow: `0 0 0 1px ${colors.accent[500]}`,
          },
        },
        error: {
          backgroundColor: colors.neutral[800] + '40',
          color: colors.text.primary,
          border: `1px solid ${colors.semantic.error}`,
          '&:focus': {
            borderColor: colors.semantic.error,
            outline: 'none',
            boxShadow: `0 0 0 1px ${colors.semantic.error}`,
          },
        },
      },

      card: {
        default: {
          backgroundColor: colors.background.primary,
          border: `1px solid ${colors.border.light}`,
          borderRadius: '0.5rem',
          boxShadow: colors.shadow.light,
        },
        dark: {
          backgroundColor: colors.background.dark,
          border: `1px solid ${colors.border.dark}`,
          borderRadius: '0.5rem',
          boxShadow: colors.shadow.medium,
        },
      },

      modal: {
        backdrop: {
          backgroundColor: colors.background.modal,
          backdropFilter: 'blur(4px)',
        },
        content: {
          backgroundColor: colors.background.primary,
          borderRadius: '1rem',
          boxShadow: colors.shadow.dark,
        },
      },
    },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
