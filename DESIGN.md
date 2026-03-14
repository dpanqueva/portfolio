# DESIGN.md — Design System

## Themes

Default: dark mode. Toggle adds class `light-mode` to `<html>`.
Save preference to `localStorage` key `pf-theme`.

### Dark (default) — Black + Purple
```
--color-bg:          #0a0a0f
--color-bg-alt:      #12121a
--color-surface:     #1a1a2e
--color-accent:      #7c3aed
--color-accent-soft: #a855f7
--color-accent-glow: rgba(147,51,234,0.22)
--color-text:        #f1f0f5
--color-text-muted:  #a89ec0
--color-border:      #2d2d4a
--color-shadow:      rgba(124,58,237,0.18)
```

### Light — Gray + Orange
```
--color-bg:          #f5f5f0
--color-bg-alt:      #ebebeb
--color-surface:     #ffffff
--color-accent:      #ea580c
--color-accent-soft: #f97316
--color-accent-glow: rgba(234,88,12,0.18)
--color-text:        #1a1a1a
--color-text-muted:  #555555
--color-border:      #d4d4d4
--color-shadow:      rgba(234,88,12,0.12)
```

## Typography

Import from Google Fonts CDN:
- `Playfair Display` weights 700, 900 → headings and hero title
- `Space Grotesk` weights 300, 400, 500, 600, 700 → body and UI

```
--font-display: 'Playfair Display', serif
--font-body:    'Space Grotesk', sans-serif
--fs-xs:        0.75rem
--fs-sm:        0.875rem
--fs-base:      1rem
--fs-lg:        1.125rem
--fs-xl:        1.5rem
--fs-2xl:       2rem
--fs-hero:      clamp(2.8rem, 7vw, 5.5rem)
```

## Tokens

```
--radius-sm:      6px
--radius-md:      12px
--radius-lg:      20px
--radius-pill:    999px
--transition:     all 0.3s cubic-bezier(0.4,0,0.2,1)
--section-py:     6rem
--shadow-card:    0 4px 24px var(--color-shadow)
```

## CDN links (use exactly as shown)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

## Visual rules

### Hero section
- Full viewport height (`min-height: 100vh`)
- Radial gradient background using `--color-accent-glow` at 60% 50%
- Hero title uses `--font-display`, `--fs-hero`
- Accent word in title uses `--color-accent-soft`

### Navbar
- Fixed top, `backdrop-filter: blur(16px)`, semi-transparent bg
- Shrinks padding on scroll (JS adds class `scrolled`)
- Active section link highlighted with `--color-accent-soft`
- Theme toggle button: circular, 38px, icon swaps sun↔moon

### Cards
- Background `--color-surface`, border `--color-border`
- On hover: border becomes `--color-accent`, box-shadow appears, translateY(-4px)

### Timeline (experience)
- Vertical line on left: 2px gradient from `--color-accent` to transparent
- Each item has a dot: 12px circle, `--color-accent` fill, glow ring

### Badges
- Background: `--color-accent-glow`
- Border: 1px solid `--color-accent`
- Color: `--color-accent-soft`
- Shape: pill (`--radius-pill`)

### Buttons
- Primary: filled `--color-accent`, pill shape, white text
- Outline: transparent bg, `--color-accent` border and text
- Both: uppercase, letter-spacing 0.05em, hover lifts with shadow

### Avatar photo
- Border: 2px solid `--color-accent`
- Glow animation: pulsing box-shadow with `--color-accent-glow`
- Border-radius: `--radius-lg`

### Animations
- Page load: hero elements fade in upward, staggered delays
- Scroll: `.reveal` elements animate to visible when intersecting
- Avatar: continuous glow pulse
- Respect `prefers-reduced-motion`: disable all animations if set
