import { useMemo, useState } from 'react'
import Hero from '../components/Hero.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ToolCard from '../components/ToolCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { tools } from '../config/tools.config.js'
import styles from './Home.module.css'

const STEPS = [
  {
    n: '01',
    title: 'Build the tool',
    body: 'Drop a React component into src/tools/ and it renders inside the shared layout automatically.',
  },
  {
    n: '02',
    title: 'Register it',
    body: 'Add one entry to tools.config.js. The card, route, sidebar link, and search all light up.',
  },
  {
    n: '03',
    title: 'Ship it',
    body: 'Commit and push to main. Vercel builds and deploys the live site. No manual redeploy.',
  },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const hasTools = tools.length > 0

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tools
    return tools.filter((t) => {
      const haystack = [t.name, t.description, ...(t.keywords ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  const announce = !hasTools
    ? 'No tools available yet.'
    : `${filtered.length} of ${tools.length} tools shown.`

  return (
    <>
      <Hero />

      <section id="tools" className={styles.tools}>
        <div className="container">
          <div className={styles.head}>
            <div className={styles.headText}>
              <h2 className={styles.heading}>The bench</h2>
              <p className={styles.sub}>
                {hasTools
                  ? `${tools.length} tool${tools.length === 1 ? '' : 's'} ready to use`
                  : 'Tools will appear here as they’re added'}
              </p>
            </div>
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {announce}
          </p>

          <div className={styles.grid}>
            {!hasTools ? (
              <EmptyState variant="empty" />
            ) : filtered.length === 0 ? (
              <EmptyState
                variant="no-results"
                query={query}
                onClear={() => setQuery('')}
              />
            ) : (
              filtered.map((tool) => <ToolCard key={tool.path} tool={tool} />)
            )}
          </div>
        </div>
      </section>

      <section id="about" className={styles.about}>
        <div className="container">
          <h2 className={styles.aboutHeading}>Built to grow</h2>
          <p className={styles.aboutLede}>
            MyToolbox is designed so a new tool is three small steps, never a
            rebuild.
          </p>

          <ol className={styles.steps}>
            {STEPS.map((s) => (
              <li key={s.n} className={styles.step}>
                <span className={styles.stepNum}>{s.n}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
