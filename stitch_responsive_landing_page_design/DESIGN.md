---
name: Modern Tech Minimalism
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5e60'
  on-secondary: '#ffffff'
  secondary-container: '#dfdfe1'
  on-secondary-container: '#616365'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001b3e'
  on-tertiary-container: '#3a83ea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e4'
  secondary-fixed-dim: '#c6c6c8'
  on-secondary-fixed: '#1a1c1d'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#d7e3ff'
  tertiary-fixed-dim: '#aac7ff'
  on-tertiary-fixed: '#001b3e'
  on-tertiary-fixed-variant: '#00458e'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  system-gray: '#86868B'
  surface-off-white: '#FAFAFA'
typography:
  hero-display:
    fontFamily: Hanken Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  hero-display-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 19px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  section-gap-lg: 160px
  section-gap-sm: 80px
---

## Brand & Style

This design system is defined by **High-End Minimalism**. It aims to evoke a sense of precision, luxury, and clarity. The target audience values effortless functionality and aesthetic purity. 

The visual narrative relies on the "Hero" philosophy: every element on the screen should feel intentional and significant. We achieve this through:
- **Generous Whitespace:** Space is not "empty"; it is a functional tool used to group information and focus the user's eye.
- **Product-First Imagery:** UI elements are understated to allow high-fidelity photography and 3D renders to take center stage.
- **Visual Quiet:** Reducing noise by limiting borders, shadows, and unnecessary decorations.
- **Precision:** Perfect alignment and a strict adherence to a geometric rhythm.

## Colors

The palette is strictly curated to emphasize contrast and hierarchy. 
- **Primary Black (#000000):** Used for primary text and high-impact headlines to create a "printed" feel on the digital screen.
- **Neutral White (#FFFFFF):** The standard background for most surfaces, providing the cleanest possible canvas.
- **Secondary Gray (#F5F5F7):** Used for large container backgrounds and subtle section breaks, creating a soft layer of depth without needing heavy borders.
- **Action Blue (#0066CC):** Reserved exclusively for interactive elements like links and call-to-action buttons to ensure immediate recognition.

## Typography

The typography strategy focuses on a clear "San Francisco" style logic: high legibility and variable weight application. 

**Hanken Grotesk** serves as our display face. It is used for headlines and hero sections to provide a sharp, contemporary edge. For hero displays, negative letter spacing is applied to create a more compact, authoritative look.

**Inter** is our utilitarian workhorse. It handles all body text, UI labels, and data points. Its neutral character ensures that information is conveyed without stylistic interference. 

Maintain a strict vertical rhythm by ensuring line heights are always a multiple of 4px or 8px. Use tight tracking for large headlines and slightly increased tracking for small labels to aid readability.

## Layout & Spacing

This design system utilizes a **Fixed-Fluid Hybrid Grid**. 
- **Desktop:** The layout centers within a 1200px container. Large-scale hero sections may break the container to bleed to the edges of the screen for immersive effect.
- **Spacing Rhythm:** We use an 8px base unit. Section gaps are intentionally large (80px to 160px) to give components "room to breathe."
- **Breakpoints:**
    - Mobile (< 768px): 4-column grid.
    - Tablet (768px - 1024px): 8-column grid.
    - Desktop (> 1024px): 12-column grid.

Content reflow should prioritize vertical stacking on mobile, while maintaining high-impact centered alignment for hero elements.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows.

- **The Layering Rule:** Surfaces closer to the user are lighter. The base page is often `#F5F5F7`, while elevated cards or modals are `#FFFFFF`.
- **Glassmorphism:** Navigation bars and sticky headers must use a backdrop blur effect (`blur(20px)`) with a semi-transparent background (`rgba(255, 255, 255, 0.8)`). This allows the colors of the content underneath to bleed through, creating a sense of physical depth and context.
- **Subtle Definition:** If a border is required, use a 1px solid stroke with very low opacity (e.g., `rgba(0,0,0,0.1)`). Avoid heavy drop shadows; instead, use extremely soft, large-radius ambient occlusion shadows for modals only.

## Shapes

The shape language is refined and organic. We utilize "Rounded" (Value 2) as the default state to mirror the hardware-inspired "squircle" aesthetic. 

- **Standard Elements:** 0.5rem (8px) for buttons and small inputs.
- **Large Components:** 1rem (16px) for cards and feature tiles.
- **Pill Shapes:** Used specifically for secondary tags or "capsule" buttons to differentiate them from primary rectangular-rounded actions.

Consistency in corner radii is critical; avoid mixing sharp corners with rounded ones in the same view.

## Components

### Navigation
The global header should be thin, centered, and semi-transparent. Icons should be lightweight (1.5px to 2px stroke). Links use the `label-sm` style and transition to Primary Black on hover.

### Buttons
- **Primary:** Solid `#0066CC` or `#000000` with white text. Rounded (8px) or pill-shaped.
- **Secondary:** Blue text link with a trailing chevron (`>`).
- **Ghost:** Minimal 1px border, used only for tertiary actions.

### Cards & Tiles
Cards should not have visible borders. Instead, use a background of `#F5F5F7` against a `#FFFFFF` page, or vice versa. Content within cards should be generously padded (minimum 32px).

### Input Fields
Inputs are clean, with a 1px subtle border that darkens on focus. Labels sit above the field in `label-sm` style. Error states use a refined red that doesn't break the minimalist aesthetic.

### Hero Sections
Large-scale typography centered or left-aligned. High-resolution imagery should background the entire section or be placed with significant breathing room around the edges.