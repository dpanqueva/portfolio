# DATA.md — Content File Format

All content lives in `data/*.txt`. Edit these files to personalize the portfolio.
JavaScript parses them at runtime. No HTML changes needed.

---

## Format types

### Key-Value
One key per line. Split on first `:`. Value is everything after.
```
KEY: value with possible colons: still fine
```

### Blocks
Multiple records, separated by `---` on its own line.
Each block uses key-value format internally.
```
---
KEY: value
KEY: value
---
KEY: value
---
```

### Line comments
Lines starting with `#` are ignored.
Empty lines are ignored.

---

## data/perfil.txt — Key-Value

| Key | Content |
|---|---|
| NOMBRE | Full name |
| TAGLINE | Short role/specialty line |
| BIO | 2–3 sentence bio paragraph |
| FOTO | Profile photo URL |
| UBICACION | City, Country |
| DISPONIBILIDAD | Availability status |

---

## data/experiencia.txt — Blocks

| Key | Content |
|---|---|
| EMPRESA | Company name |
| CARGO | Job title |
| PERIODO | Date range (e.g. Mar 2022 — Present) |
| DESCRIPCION | 2–3 sentences of achievements |
| TAGS | Comma-separated technologies |

---

## data/estudios.txt — Blocks

| Key | Content |
|---|---|
| INSTITUCION | University or platform name |
| TITULO | Degree or certification name |
| PERIODO | Year or year range |
| DESCRIPCION | Brief description |
| TIPO | One of: Grado / Certificación / Bootcamp / Curso |

---

## data/habilidades.txt — Repeating pairs (no `---` separator)

```
CATEGORIA: Group name
ITEMS: item1, item2, item3

CATEGORIA: Another group
ITEMS: item1, item2
```

Parse rule: iterate lines, `CATEGORIA:` starts a new group, `ITEMS:` fills it.

---

## data/contacto.txt — Key-Value

| Key | Content |
|---|---|
| EMAIL | Email address |
| LINKEDIN | Full profile URL |
| GITHUB | Full profile URL |
| TWITTER | Full profile URL |
| WEBSITE | Personal site URL (optional) |
| TELEFONO | Phone number (optional, may be empty) |
| MENSAJE_CTA | Call-to-action text for contact section |

Skip rendering any contact entry where value is empty or missing.
