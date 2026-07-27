import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import styles from './Layout.module.css'

/**
 * Shared app shell: header + slide-in tools drawer + routed content + footer.
 * Every page renders through here via react-router's <Outlet />.
 */
export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  // Lock body scroll + allow Escape to close while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => e.key === 'Escape' && setDrawerOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header onOpenDrawer={() => setDrawerOpen(true)} />

      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main id="main" className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>MyToolbox</span>
          <span className={styles.footerDim}>
            A personal workshop of web tools, built to grow one tool at a time.
          </span>
        </div>
      </footer>
    </div>
  )
}
