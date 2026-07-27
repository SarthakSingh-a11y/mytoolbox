import { NavLink } from 'react-router-dom'
import { CloseIcon, ChevronRight, ToolIcon } from './icons.jsx'
import { tools } from '../config/tools.config.js'
import styles from './Sidebar.module.css'

/**
 * Slide-in "Tools" drawer. Lists every tool from tools.config.js; renders a
 * tidy empty state while the config is still empty. Opened from the header.
 */
export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Tools"
        aria-hidden={!open}
      >
        <div className={styles.head}>
          <h2 className={styles.title}>Tools</h2>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close tools drawer"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <nav className={styles.list} aria-label="Tools">
          {tools.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <ToolIcon size={22} />
              </span>
              <p className={styles.emptyTitle}>No tools yet</p>
              <p className={styles.emptyText}>
                Tools you add will show up here for quick access.
              </p>
            </div>
          ) : (
            tools.map((tool) => {
              const Icon = tool.icon ?? ToolIcon
              return (
                <NavLink
                  key={tool.path}
                  to={tool.path}
                  className={({ isActive }) =>
                    `${styles.item} ${isActive ? styles.itemActive : ''}`
                  }
                >
                  <span className={styles.itemIcon}>
                    <Icon size={20} />
                  </span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemName}>{tool.name}</span>
                    {tool.description && (
                      <span className={styles.itemDesc}>{tool.description}</span>
                    )}
                  </span>
                  <ChevronRight size={16} className={styles.itemChevron} />
                </NavLink>
              )
            })
          )}
        </nav>
      </aside>
    </>
  )
}
