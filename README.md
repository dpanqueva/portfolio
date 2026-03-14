# Portfolio — Personal Portfolio Website

A modern, responsive portfolio built with vanilla HTML, CSS, and JavaScript. Works directly in the browser — no server required.

> Screenshot coming soon

## Tech Stack

| Technology | Version / Source |
|------------|------------------|
| HTML5 | — |
| CSS3 | — |
| Bootstrap | 5.3.3 (CDN) |
| Bootstrap Icons | 1.11.3 (CDN) |
| Google Fonts | Playfair Display, Space Grotesk |
| JavaScript | ES6+ modules |

## Project Structure

```
portfolio/
├── AGENTS.md              # Agent instructions
├── DESIGN.md              # Design system
├── ARCHITECTURE.md        # File structure and contracts
├── DATA.md                # Content file formats
├── COMMITS.md             # Git workflow reference
├── README.md              # This file
├── index.html             # Main HTML file
├── css/
│   ├── variables.css      # Design tokens (colors, fonts, spacing)
│   ├── components.css     # UI component styles
│   └── animations.css    # Keyframes and reveal animations
├── js/
│   ├── theme.js          # Dark/light mode toggle
│   ├── loader.js         # Content loader from data/*.txt
│   └── main.js           # Entry point
└── data/
    ├── perfil.txt        # Personal info
    ├── experiencia.txt   # Work experience
    ├── estudios.txt      # Education
    ├── habilidades.txt  # Skills
    └── contacto.txt     # Contact info
```

## Getting Started

Simply open `index.html` directly in your browser, or double-click the file.

No server or installation required.

## Customize Your Content

All portfolio content lives in `data/*.txt`. Edit these files to personalize the site.

| File | Purpose |
|------|---------|
| `perfil.txt` | Name, tagline, bio, photo URL, location, availability |
| `experiencia.txt` | Work history (company, role, period, description, tags) |
| `estudios.txt` | Education records (institution, title, period, type) |
| `habilidades.txt` | Skills grouped by category |
| `contacto.txt` | Contact info and social links |

### File Formats

- **Key-Value:** `KEY: value` (one per line)
- **Blocks:** Separate records with `---` on its own line
- Lines starting with `#` are comments and ignored

## Theming

Dark mode is the default. The toggle button in the navbar switches between themes and saves your preference to `localStorage`.

To customize colors, edit `css/variables.css`:
- `:root` — dark theme tokens
- `html.light-mode` — light theme tokens

## Git Workflow

This project follows the commit format specified in `COMMITS.md`. After each file is created, commit with a descriptive message.

To push to GitHub:

```bash
git remote add origin https://github.com/dpanqueva/portfolio.git
git branch -M main
git push -u origin main
```

## License

MIT
