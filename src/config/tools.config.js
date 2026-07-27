import { lazy } from 'react'

/**
 * ============================================================================
 *  tools.config.js — the single source of truth for every tool in MyToolbox.
 * ============================================================================
 *
 * The homepage grid, the search/filter, the sidebar, AND the router all read
 * from this one array. Nothing else needs to change when you add a tool.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  HOW TO ADD A NEW TOOL  (the whole process — 2 steps)
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  1. Build the tool component in  src/tools/  — e.g. src/tools/WordCounter.jsx
 *     (a normal React component; it renders inside the shared layout).
 *
 *  2. Add ONE entry to the `tools` array below:
 *
 *        {
 *          name:        'Word Counter',
 *          path:        '/tools/word-counter',      // must start with /tools/
 *          description: 'Count words, characters, and reading time.',
 *          icon:        RulerIcon,                    // any component from icons.jsx
 *          component:   lazy(() => import('../tools/WordCounter.jsx')),
 *          badge:       'New',                        // optional little tag
 *        }
 *
 *  That's it. The card, the route, the sidebar link, and search all light up
 *  automatically. No routing, layout, or homepage code needs editing.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  Entry shape
 * ─────────────────────────────────────────────────────────────────────────
 *   name        string    Display name (shown on card + sidebar + tab title).
 *   path        string    Route path, unique, starts with "/tools/".
 *   description string    One-line summary (shown on card + used by search).
 *   icon        Component  SVG icon component (see src/components/icons.jsx).
 *   component   Component  The tool itself. Wrap in `lazy(() => import(...))`
 *                          so each tool is code-split and loads on demand.
 *   badge       string?   Optional tag, e.g. 'New' or 'Beta'. Omit if unused.
 *   keywords    string[]? Optional extra search terms not in name/description.
 *
 * `lazy` is imported above so tool files load only when their route is opened.
 * Icons live in ../components/icons.jsx — import the ones you use, e.g.:
 *     import { WrenchIcon, GearIcon } from '../components/icons.jsx'
 * ============================================================================
 */

export const tools = [
  // ── No tools yet. Add entries here following the shape documented above. ──
  //
  // Example (uncomment, create the component, and adjust to enable):
  //
  // {
  //   name: 'Word Counter',
  //   path: '/tools/word-counter',
  //   description: 'Count words, characters, and estimated reading time.',
  //   icon: RulerIcon,
  //   component: lazy(() => import('../tools/WordCounter.jsx')),
  // },
]

/** Look up a single tool by its route path (used by the router/breadcrumb). */
export function getToolByPath(path) {
  return tools.find((t) => t.path === path)
}

export default tools
