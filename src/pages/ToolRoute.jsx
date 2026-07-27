import { Suspense, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ToolIcon } from '../components/icons.jsx'
import styles from './ToolRoute.module.css'

/**
 * Consistent shell every tool renders inside: breadcrumb, title header, and a
 * Suspense boundary (tools are lazy-loaded via the config, so this shows a
 * lightweight fallback while a tool's code chunk downloads).
 *
 * A tool component only has to render its own UI — the chrome is provided here.
 */
export default function ToolRoute({ tool }) {
  const Tool = tool.component
  const Icon = tool.icon ?? ToolIcon

  useEffect(() => {
    const previous = document.title
    document.title = `${tool.name} · MyToolbox`
    return () => {
      document.title = previous
    }
  }, [tool.name])

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.crumbLink}>
            Home
          </Link>
          <ChevronRight size={14} className={styles.crumbSep} />
          <span aria-current="page" className={styles.crumbCurrent}>
            {tool.name}
          </span>
        </nav>

        <header className={styles.header}>
          <span className={styles.icon}>
            <Icon size={26} />
          </span>
          <div>
            <h1 className={styles.title}>{tool.name}</h1>
            {tool.description && <p className={styles.desc}>{tool.description}</p>}
          </div>
        </header>

        <div className={styles.body}>
          <Suspense
            fallback={
              <div className={styles.loading} role="status">
                <span className={styles.spinner} aria-hidden="true" />
                <span>Loading {tool.name}…</span>
              </div>
            }
          >
            <Tool />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
