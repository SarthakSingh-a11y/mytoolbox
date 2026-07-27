# `src/tools/` — where individual tools live

Each tool is a single, self-contained React component file in this folder,
e.g. `WordCounter.jsx`. A tool only needs to render its own UI — the header,
breadcrumb, layout, and page chrome are provided by the shell in
`src/pages/ToolRoute.jsx`.

## Adding a tool (2 steps)

1. **Create the component here**, for example `src/tools/WordCounter.jsx`:

   ```jsx
   export default function WordCounter() {
     return <div>/* your tool UI */</div>
   }
   ```

2. **Register it** in [`src/config/tools.config.js`](../config/tools.config.js)
   by adding one entry to the `tools` array:

   ```js
   import { RulerIcon } from '../components/icons.jsx'
   import { lazy } from 'react'

   {
     name: 'Word Counter',
     path: '/tools/word-counter',
     description: 'Count words, characters, and reading time.',
     icon: RulerIcon,
     component: lazy(() => import('../tools/WordCounter.jsx')),
   }
   ```

That's all. The homepage card, the `/tools/word-counter` route, the sidebar
link, and search all update automatically from that one entry.

> Tip: wrap the component in `lazy(() => import(...))` (as above) so each tool
> is code-split and only downloads when its route is opened.
