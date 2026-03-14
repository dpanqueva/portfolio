# COMMITS.md — Git Workflow

## Setup (run once)
```bash
git init
git add AGENTS.md DESIGN.md ARCHITECTURE.md DATA.md COMMITS.md
git commit -m "chore(context): add project context and design specs"
git add data/
git commit -m "chore(data): add content placeholder files"
```

## Commit after each file

| File created | Commit message |
|---|---|
| `css/variables.css` | `feat(css): add design tokens for dark and light themes` |
| `css/components.css` | `feat(css): add all UI component styles` |
| `css/animations.css` | `feat(css): add keyframes and scroll reveal animations` |
| `js/theme.js` | `feat(js): implement dark/light theme toggle with localStorage` |
| `js/loader.js` | `feat(js): implement content loader from data txt files` |
| `js/main.js` | `feat(js): add entry point with scroll reveal and navbar behavior` |
| `index.html` | `feat(html): scaffold single-page portfolio with all sections` |
| `README.md` | `docs(readme): add project documentation and setup guide` |

## After full project works
```bash
git add .
git commit -m "feat: complete portfolio — dark/light theme, data-driven content"
```

## Push to GitHub
```bash
git remote add origin https://github.com/dpanqueva/portfolio.git
git branch -M main
git push -u origin main
```

## Branch strategy (optional)
```
main        production-ready code
dev         active development
feature/*   individual features
```
