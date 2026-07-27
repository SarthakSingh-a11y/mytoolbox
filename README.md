# 🧰 MyToolbox

A personal workshop of small, sharp web tools — built with **React + Vite** and
**plain CSS** (no UI framework), with a custom, layered "workbench" look.

The system is built for **incremental growth**: there are no tools yet, and
adding one later is a deliberate 2-step process (see below). The homepage grid,
router, sidebar, and search all read from a single config file, so nothing has
to be rebuilt when a tool is added.

---

## ➕ How to add a new tool (the whole process — 2 steps)

> This is the contract the whole app is designed around. Future work references it.

**1. Build the tool component** in [`src/tools/`](src/tools/), e.g.
`src/tools/WordCounter.jsx`:

```jsx
export default function WordCounter() {
  return <div>{/* your tool UI */}</div>
}
```

The component only renders its own UI — the page header, breadcrumb, and layout
chrome are provided automatically by `src/pages/ToolRoute.jsx`.

**2. Add one entry** to the `tools` array in
[`src/config/tools.config.js`](src/config/tools.config.js):

```js
import { lazy } from 'react'
import { RulerIcon } from '../components/icons.jsx'

{
  name: 'Word Counter',
  path: '/tools/word-counter',            // unique, starts with /tools/
  description: 'Count words, characters, and reading time.',
  icon: RulerIcon,                        // any icon from src/components/icons.jsx
  component: lazy(() => import('../tools/WordCounter.jsx')),
  badge: 'New',                           // optional
}
```

**Done.** The homepage card, the route, the sidebar link, and search all appear
automatically. No routing, layout, or homepage code needs to change.

### Entry shape

| Field         | Type          | Notes                                                   |
| ------------- | ------------- | ------------------------------------------------------- |
| `name`        | `string`      | Display name (card, sidebar, tab title).                |
| `path`        | `string`      | Unique route, starts with `/tools/`.                    |
| `description` | `string`      | One line; shown on the card and used by search.         |
| `icon`        | `Component`   | An SVG icon component from `src/components/icons.jsx`.   |
| `component`   | `Component`   | The tool. Wrap in `lazy(() => import(...))` to code-split. |
| `badge`       | `string?`     | Optional tag, e.g. `New` / `Beta`.                      |
| `keywords`    | `string[]?`   | Optional extra search terms.                            |

---

## 🚀 Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

Requires Node 18+.

---

## 🗂️ Project structure

```
mytoolbox/
├── index.html                 # HTML shell + font links
├── vercel.json                # Vercel build + SPA rewrite config
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx               # entry — mounts <App/> in <BrowserRouter>
    ├── App.jsx                # routes, generated from tools.config.js
    ├── config/
    │   └── tools.config.js    # ⭐ single source of truth for all tools
    ├── components/
    │   ├── Layout.jsx         # app shell (header + drawer + outlet + footer)
    │   ├── Header.jsx
    │   ├── Sidebar.jsx        # slide-in Tools drawer
    │   ├── Hero.jsx           # animated cursor-parallax hero
    │   ├── ToolCard.jsx       # 3D-tilt tool card
    │   ├── SearchBar.jsx
    │   ├── EmptyState.jsx
    │   └── icons.jsx          # SVG icon set
    ├── pages/
    │   ├── Home.jsx           # hero + search + grid + "how it works"
    │   ├── ToolRoute.jsx      # shell each tool renders inside (lazy/Suspense)
    │   └── NotFound.jsx
    ├── tools/                 # ← individual tool components go here
    └── styles/
        └── global.css         # design tokens + reset + base styles
```

Component styles are co-located `*.module.css` files (CSS Modules — plain,
scoped CSS). Design tokens (colours, shadows, type, motion) live as CSS custom
properties in `src/styles/global.css`.

---

## 🎨 Design notes

- **Palette:** deep graphite base + a single electric-amber accent, used sparingly.
- **Depth:** multi-layer shadows, glassmorphism surfaces, and 3D tilt/lift on cards.
- **Typography:** Space Grotesk (display) + Inter (body).
- **Motion:** one signature animated element (the hero). Everything honours
  `prefers-reduced-motion`, and keyboard focus is always visible.

---

## ☁️ Deployment (Vercel)

This repo is configured for zero-config Vercel deployment via
[`vercel.json`](vercel.json):

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA rewrite:** all routes fall back to `/index.html` so deep links like
  `/tools/word-counter` work on refresh.

### One-time: connect GitHub → Vercel (auto-deploy on every push)

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. Click **Import** next to the `mytoolbox` repository.
   (If you don't see it, click **Adjust GitHub App Permissions** and grant
   access to the repo.)
3. Vercel auto-detects Vite. Confirm the settings match `vercel.json`:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. After ~1 minute you get a live URL
   (e.g. `https://mytoolbox.vercel.app`).

That's it — the GitHub repo is now linked. **Every `git push` to `main`
triggers an automatic production deploy**, and every pull request gets its own
preview URL. No manual redeploys needed.
