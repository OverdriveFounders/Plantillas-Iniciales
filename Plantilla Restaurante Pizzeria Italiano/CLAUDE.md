# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Santo Impasto** is a static multi-page Italian restaurant website. No build tools, no npm, no dependencies — pure HTML, CSS and vanilla JS. Deploy by copying the folder to any static host.

## Architecture

### Page structure
14 HTML pages share a common layout injected at runtime by `main.js`. Every page has three mount points:
- `<header id="site-header">` — populated by `headerTemplate()`
- `<footer id="site-footer">` — populated by `footerTemplate()`
- `<div id="ui-shell">` — populated by `uiShell()` (reservation modal, cookie banner, sticky mobile CTA)

### JS modules
- **`main.js`** — mounts the shared layout and binds all global UI: sticky header scroll state (`.scrolled` class), mobile drawer, reservation modal, cookie banner (`localStorage` key `si-cookies`), FAQ accordion, testimonial slider (auto-advance 5500ms), reveal animations via `IntersectionObserver`, generic async forms (`form[data-ui="async"]`).
- **`menu-data.js`** — exposes `window.menuData`: array of 10 categories, each with `id`, `title`, `intro`, `closing`, and `items[]` (each item: `name`, `description`, `price`, `upsell`).
- **`carta.js`** — renders the menu page only. Requires `#menu-root` and `#menu-toc` in the DOM. Shows skeleton loaders, then generates category chips and dish cards from `window.menuData`.

### CSS design system (`assets/css/styles.css`)
All tokens live in a single `:root` block:
- Colors: `--cream #F9F6F1`, `--dark #1A1614`, `--red #C03418`, `--gold #B5841A`
- Typography: `--font-display` (Cormorant Garamond, serif — headings), `--font-body` (Inter — body)
- Layout: `--container: min(1280px, 100% - 80px)`
- Radius scale: `--radius-sm 8px` / `--radius-md 16px` / `--radius-lg 28px`
- Shadow scale: `--shadow-sm` / `--shadow-md` / `--shadow-lg` / `--shadow-red`

Key CSS patterns:
- Fluid typography via `clamp()` on all headings — avoid overriding with fixed `px` sizes.
- `.grid-2 / .grid-3 / .grid-4` utility classes for section grids.
- `.menu-items` uses `display: flex; flex-wrap: wrap` with items at `flex: 1 1 calc(33.333% - 16px)` (3 cols desktop → 2 cols ≤1100px → 1 col ≤768px).
- `.site-header` transitions from dark gradient (over hero) to solid cream (`.scrolled`) on scroll.
- `.reveal` + `.in-view` (IntersectionObserver) for scroll animations; respects `prefers-reduced-motion`.

## Common edit locations

| What to change | Where |
|---|---|
| Nav links | `navLinks` array at top of `main.js` |
| Menu items / prices | `assets/js/menu-data.js` |
| Header / footer / modal HTML | Template functions in `main.js` |
| Colors, spacing, fonts | `:root` variables in `styles.css` |
| Per-page content | The relevant `.html` file |

## Pedidos (orders)
`pedidos.html` has a custom submit handler (inline `<script>` at bottom of file) that builds a WhatsApp URL with the form data and opens `wa.me/34601516165`. It does **not** use the generic `data-ui="async"` handler.

## SEO
`index.html` contains a Restaurant schema.org JSON-LD block. Each page has unique `<title>` and `<meta name="description">`. `sitemap.xml` and `robots.txt` are present at root.
