---
name: Interlink Modern
colors:
  surface: '#f9f9ff'
  surface-dim: '#d7dae3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3fc'
  surface-container: '#ebedf7'
  surface-container-high: '#e6e8f1'
  surface-container-highest: '#e0e2eb'
  on-surface: '#181c22'
  on-surface-variant: '#414753'
  inverse-surface: '#2d3037'
  inverse-on-surface: '#eef0fa'
  outline: '#717785'
  outline-variant: '#c1c6d5'
  surface-tint: '#005db8'
  primary: '#005cb8'
  on-primary: '#ffffff'
  primary-container: '#1275e2'
  on-primary-container: '#000512'
  inverse-primary: '#aac7ff'
  secondary: '#465f88'
  on-secondary: '#ffffff'
  secondary-container: '#b6d0ff'
  on-secondary-container: '#3f5881'
  tertiary: '#9a4600'
  on-tertiary: '#ffffff'
  tertiary-container: '#c05900'
  on-tertiary-container: '#0d0300'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00458d'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#aec7f7'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#2d476f'
  tertiary-fixed: '#ffdbc9'
  tertiary-fixed-dim: '#ffb68c'
  on-tertiary-fixed: '#321200'
  on-tertiary-fixed-variant: '#763400'
  background: '#f9f9ff'
  on-background: '#181c22'
  surface-variant: '#e0e2eb'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 24px
---

# Interlink Modern Design System

## Brand & Style
Interlink Modern is a design system built on the pillars of reliability, precision, and clarity. Moving away from high-energy warmth, the brand now embraces a professional, tech-forward aesthetic. It utilizes a "Corporate / Modern" style inspired by high-quality interfaces that prioritize readability and user trust. The visual language is balanced, using a cool palette and intentional whitespace to evoke a sense of calm efficiency and modern sophistication.

## Colors
The color palette is anchored by a vibrant, trustworthy primary blue (#1275e2), signaling stability and digital fluency. The secondary blue-gray (#5f78a3) provides a sophisticated bridge between the primary actions and content surfaces. 

A burnt orange tertiary color (#c55b00) is used sparingly for high-impact accents, alerts, or specialized CTAs, providing a professional contrast without overwhelming the interface. The neutral palette is a cool-toned gray (#74777f), ensuring that the overall environment feels cohesive and refined.

## Typography
The system standardizes on **Inter** for all typographic levels. Inter’s tall x-height and geometric clarity provide exceptional legibility across both desktop and mobile displays. 

Headlines use bold weights with tighter tracking for a confident, editorial look. Body text prioritizes comfort with a 1.5 line height, while labels utilize medium weights to ensure small-scale information remains distinct and functional.

## Layout & Spacing
The layout follows a fluid grid philosophy with an 8px rhythmic scale. This ensures all components and containers align to a predictable vertical and horizontal cadence. Standard gutters are set to 16px to maintain clear separation of concerns, while page margins are set to 24px to provide the content room to breathe.

## Elevation & Depth
Depth is conveyed through a combination of tonal layering and soft, ambient shadows. Instead of harsh borders, surfaces are differentiated by subtle shifts in background color and low-opacity shadows that suggest a physical stacking of elements. This approach maintains the "Corporate / Modern" feel by avoiding excessive ornamentation while still providing clear visual hierarchy.

## Shapes
The shape language has transitioned from sharp, angular corners to a soft, approachable "Rounded" aesthetic. The base radius is 0.5rem (8px), which is applied to buttons, input fields, and small cards. For larger containers, such as modals or featured sections, the radius scales up to 1rem (16px) or 1.5rem (24px) to emphasize a modern, friendly structure.

## Components
- **Buttons:** Feature 0.5rem rounded corners, using the primary blue for main actions. Text is rendered in Inter Medium.
- **Input Fields:** Utilize the neutral gray for borders with a soft 8px radius, providing a clear but unobtrusive form experience.
- **Cards:** Defined by subtle ambient shadows and 1rem corner radii to distinguish them from the background.
- **Chips & Tags:** Use fully rounded (pill-shaped) edges to provide a distinct contrast against more structural rectangular components.
- **Checkboxes & Radios:** Adopt the 0.25rem - 0.5rem rounding logic to remain consistent with the broader shape language.