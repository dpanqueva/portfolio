# ARCHITECTURE.md — File Structure & Contracts

## File tree

```
portfolio/
├── AGENTS.md              # do not modify
├── DESIGN.md              # do not modify
├── ARCHITECTURE.md        # do not modify
├── DATA.md                # do not modify
├── README.md              # CREATE — project docs
├── index.html             # CREATE — single page app
├── css/
│   ├── variables.css      # CREATE — design tokens
│   ├── components.css     # CREATE — all UI components
│   └── animations.css     # CREATE — keyframes and reveal
├── js/
│   ├── theme.js           # CREATE — dark/light toggle
│   ├── loader.js          # CREATE — reads data/*.txt → DOM
│   └── main.js            # CREATE — entry point
└── data/
    ├── perfil.txt         # exists — do not modify
    ├── experiencia.txt    # exists — do not modify
    ├── estudios.txt       # exists — do not modify
    ├── habilidades.txt    # exists — do not modify
    └── contacto.txt       # exists — do not modify
```

---

## css/variables.css

- Define all tokens from DESIGN.md in `:root {}`
- Redefine all color tokens inside `html.light-mode {}`
- No other rules in this file

---

## css/components.css

Start with: `@import './variables.css';`

Define styles for these selectors:

| Selector | Purpose |
|---|---|
| `body` | font-family, bg, color, scroll-behavior: smooth |
| `.pf-navbar` | fixed top, blur, border-bottom |
| `.pf-navbar.scrolled` | reduced padding |
| `.pf-nav-link` | muted color, uppercase, sm font |
| `.pf-nav-link:hover`, `.pf-nav-link.active` | accent-soft color |
| `.pf-theme-toggle` | 38px circle button |
| `.pf-hero` | min-height 100vh, radial gradient bg, flex center |
| `.pf-hero-title` | font-display, fs-hero |
| `.pf-hero-tagline` | fs-lg, text-muted |
| `.btn-pf-primary` | filled accent, pill, uppercase |
| `.btn-pf-outline` | outline accent, pill, uppercase |
| `.pf-section` | padding: var(--section-py) 0 |
| `.pf-section-alt` | bg: var(--color-bg-alt) |
| `.pf-section-title` | font-display, fs-2xl |
| `.pf-accent-line` | 48px wide, 3px tall, accent color, mb |
| `.pf-card` | surface bg, border, radius-lg, hover effect |
| `.pf-avatar` | fixed size, radius-lg, accent border, glow anim |
| `.pf-timeline` | relative, padding-left, vertical line pseudo |
| `.pf-timeline-item` | relative, dot pseudo-element |
| `.pf-timeline-period` | xs font, accent-soft, uppercase |
| `.pf-timeline-company` | lg font, bold |
| `.pf-timeline-role` | sm font, muted |
| `.pf-badge` | accent glow bg, accent border, pill, xs font |
| `.pf-skill-group` | card variant for skill categories |
| `.pf-skill-label` | xs, bold, uppercase, accent color |
| `.pf-contact-link` | flex row, icon + text, hover border |
| `.pf-footer` | bg-alt, border-top, center text, sm font |

---

## css/animations.css

Define:

```
@keyframes fadeInUp   — from opacity:0 translateY(30px) to opacity:1 translateY(0)
@keyframes glowPulse  — box-shadow alternates between low and high glow intensity
```

Classes:
```
.anim-fade-up            opacity:0, animation: fadeInUp 0.7s ease forwards
.anim-d1/.d2/.d3/.d4     animation-delay: 0.1s / 0.2s / 0.35s / 0.5s
.reveal                  opacity:0, transform:translateY(24px), transition 0.6s
.reveal.visible          opacity:1, transform:translateY(0)
```

Media query:
```
@media (prefers-reduced-motion: reduce) — set all animation/transition duration to 0.01ms
```

---

## js/theme.js

Exports: `initTheme()`

Logic:
1. On call: read `localStorage.getItem('pf-theme')`
2. If `'light'` → add class `light-mode` to `document.documentElement`
3. Find button `#theme-toggle`, add click listener
4. On click: toggle class `light-mode` on `document.documentElement`
5. Save new state to localStorage (`'light'` or `'dark'`)
6. Update icon: `bi-sun-fill` when dark mode, `bi-moon-stars-fill` when light mode

---

## js/loader.js

Exports: `loadPerfil`, `loadExperiencia`, `loadEstudios`, `loadHabilidades`, `loadContacto`

Internal helpers (do not export):
- `fetchFile(name)` → fetch `data/${name}`, return text or `''` on error
- `parseKV(text)` → returns object, keys lowercased, splits on first `:` per line
- `parseBlocks(text)` → splits on `---`, maps each chunk through `parseKV`, filters empty

### loadPerfil()
- Fetch `perfil.txt`, parse with `parseKV`
- Set textContent of: `#hero-name`, `#hero-tagline`, `#hero-bio`, `#hero-location`, `#hero-status`, `#about-bio`
- Set `src` and `alt` of `#hero-photo`

### loadExperiencia()
- Fetch `experiencia.txt`, parse with `parseBlocks`
- For each block, generate timeline item HTML
- Inject into `#experience-list`
- Timeline item structure: period → company → role → description → tags as badges

### loadEstudios()
- Fetch `estudios.txt`, parse with `parseBlocks`
- For each block, generate a card HTML
- Inject into `#education-grid` (Bootstrap row, cards in col-md-6 col-lg-4)
- Card shows: TIPO as badge, TITULO as h5, INSTITUCION and PERIODO as meta, DESCRIPCION as text

### loadHabilidades()
- Fetch `habilidades.txt`
- Parse manually: lines starting with `CATEGORIA:` start a group, `ITEMS:` fills it
- For each group, generate a skill card with label + badges
- Inject into `#skills-grid` (Bootstrap row)

### loadContacto()
- Fetch `contacto.txt`, parse with `parseKV`
- Set textContent of `#contact-cta`
- Build social links array, skip empty values
- Icon map: email→bi-envelope-fill, linkedin→bi-linkedin, github→bi-github, twitter→bi-twitter-x, website→bi-globe2, telefono→bi-telephone-fill
- Inject anchor elements into `#contact-links`

---

## js/main.js

Imports: `initTheme` from `./theme.js`
Imports: all five load functions from `./loader.js`

On `DOMContentLoaded`:
1. `initTheme()`
2. `await Promise.all([loadPerfil(), loadExperiencia(), loadEstudios(), loadHabilidades(), loadContacto()])`
3. `initReveal()` — IntersectionObserver on all `.reveal` elements, threshold 0.12, adds `.visible`
4. `initNavbar()` — scroll listener: toggle `.scrolled` on `.pf-navbar`, update active nav link

---

## index.html — Required IDs

These IDs must exist. JS will not work without them.

**Populated by loadPerfil:**
`#hero-name` `#hero-tagline` `#hero-bio` `#hero-photo` `#hero-location` `#hero-status` `#about-bio`

**Populated by loadExperiencia:**
`#experience-list`

**Populated by loadEstudios:**
`#education-grid`

**Populated by loadHabilidades:**
`#skills-grid`

**Populated by loadContacto:**
`#contact-cta` `#contact-links`

**Interactive elements:**
`#theme-toggle`

## index.html — Section order

```html
<nav>        pf-navbar with links + theme toggle
<main>
  <section id="hero">
  <section id="about">
  <section id="experience">
  <section id="education">
  <section id="skills">
  <section id="contact">
</main>
<footer>
```

Nav links must use `href="#section-id"` matching the sections above.
Scripts at end of body: Bootstrap bundle CDN, then `<script type="module" src="js/main.js">`.

---

## README.md — Required sections

1. **Project** — one paragraph description
2. **Tech stack** — brief list
3. **Structure** — the file tree above
4. **Setup** — how to run locally (`python3 -m http.server 8080`)
5. **Customize** — explain how to edit `data/*.txt` files
6. **Theming** — explain dark/light mode toggle
7. **Git** — commit history note
