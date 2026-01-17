# Portfolio Theme System

This directory contains the centralized theming system for the 3D portfolio application.

## Files

- `colors.js` - Core color definitions and utility functions
- `tailwindTheme.js` - Tailwind CSS theme configuration
- `ThemeContext.js` - React context for theme access
- `index.js` - Main exports

## Color Palette

### Primary Colors (Purple)
- **50-900**: Purple scale from lightest to darkest
- **500**: Main brand color (`#7B68EE` - Soft Lavender)
- **700**: Dark purple for shadows (`#5B21B6`)

### Accent Colors (Orange)
- **50-900**: Orange scale from lightest to darkest  
- **500**: Main accent color (`#F97316` - Warm Orange)
- **600**: Hover state (`#EA580C`)

### Sky & Environment
- `sky.top`: Light Periwinkle (`#B8B5FF`)
- `sky.mid`: Soft Lavender (`#7B68EE`)
- `sky.bottom`: White (`#FFFFFF`)
- `sky.fog`: Light blue fog (`#EAF6F6`)

### Ground & Platform
- `ground.dirt`: Deep purple (`#5B3EA4`)
- `ground.grass`: Darker purple (`#4C1D95`)
- `ground.platform`: Warm orange (`#F26A30`)

### Nature Colors
- `nature.foliage`: Navy blue (`#1B1643`)
- `nature.foliageLight`: Lighter tree tone (`#2D245A`)
- `nature.bark`: Purple bark (`#8B5CF6`)

### Tech Brand Colors
- `tech.javascript`: Yellow (`#F7DF1E`)
- `tech.angular`: Red (`#DD0031`)
- `tech.react`: Blue (`#61DAFB`)
- `tech.html`: Orange (`#E34F26`)
- `tech.css`: Blue (`#1572B6`)
- `tech.typescript`: Blue (`#3178C6`)
- `tech.github`: Black (`#181717`)

### Semantic Colors
- `semantic.success`: Green (`#10B981`)
- `semantic.warning`: Yellow (`#F59E0B`)
- `semantic.error`: Red (`#EF4444`)
- `semantic.info`: Blue (`#3B82F6`)

## Usage

### In React Components

```jsx
import { useTheme, colors } from '../theme';

function MyComponent() {
  const theme = useTheme();
  
  // Access colors
  const primaryColor = colors.primary[500];
  const accentColor = theme.getColor('accent.500');
  
  // Use predefined styles
  const buttonStyle = theme.styles.button.primary;
}
```

### In Tailwind Classes

```jsx
// Use custom color classes
<div className="bg-primary-500 text-text-primary">
<div className="border-accent-500 hover:bg-accent-600">
<div className="text-error bg-neutral-800/40">
```

### In Three.js/3D Components

```jsx
import { colors } from '../theme';

// Use in Three.js materials
<meshStandardMaterial color={colors.primary[500]} />
<fog attach="fog" args={[colors.sky.fog, 10, 25]} />
```

## Naming Convention

- **Primary**: Main brand colors (purple scale)
- **Accent**: Secondary brand colors (orange scale)
- **Sky/Ground/Nature**: Environment-specific colors
- **Tech**: Technology brand colors
- **Semantic**: Status colors (success, error, etc.)
- **Neutral**: Grayscale colors
- **Background/Text/Border**: UI element colors

## Color Scale

Each color family follows a 50-900 scale:
- **50**: Lightest shade
- **100-400**: Light shades
- **500**: Base color
- **600-800**: Dark shades
- **900**: Darkest shade

## Best Practices

1. Use semantic color names over hex values
2. Leverage the color scale for hover states and variations
3. Use the theme context for dynamic color access
4. Maintain consistency with the established color relationships
5. Test colors in both light and dark contexts
