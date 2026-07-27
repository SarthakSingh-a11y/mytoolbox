import { NavLink, Link } from 'react-router-dom'
import { LogoMark, HomeIcon, MenuIcon } from './icons.jsx'
import { tools } from '../config/tools.config.js'
import styles from './Header.module.css'

/**
 * Sticky, frosted-glass header: brand mark + wordmark, a Home link, and a
 * button that opens the Tools drawer (badge shows the current tool count).
 */
export default function Header({ onOpenDrawer }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="MyToolbox — home">
          <span className={styles.mark}>
            <LogoMark size={26} />
          </span>
          <span className={styles.wordmark}>
            My<span className={styles.wordmarkAccent}>Toolbox</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            <HomeIcon size={18} />
            <span>Home</span>
          </NavLink>

          <button
            type="button"
            className={styles.toolsBtn}
            onClick={onOpenDrawer}
            aria-haspopup="dialog"
          >
            <MenuIcon size={20} />
            <span>Tools</span>
            <span className={styles.count} aria-label={`${tools.length} tools`}>
              {tools.length}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
