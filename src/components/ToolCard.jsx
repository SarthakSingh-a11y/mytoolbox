import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ToolIcon, ChevronRight } from './icons.jsx'
import styles from './ToolCard.module.css'

/**
 * A single tool card for the homepage grid.
 *
 * Depth treatment: on hover the card lifts and its shadow grows; while the
 * pointer moves across it, it tilts in 3D toward the cursor (rotateX/Y driven
 * by --rx / --ry). Pointer tilt is skipped under prefers-reduced-motion; the
 * lift/press transitions are also neutralised globally there.
 */
export default function ToolCard({ tool }) {
  const ref = useRef(null)
  const Icon = tool.icon ?? ToolIcon

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Link
      ref={ref}
      to={tool.path}
      className={styles.card}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      aria-label={`Open ${tool.name}`}
    >
      <span className={styles.sheen} aria-hidden="true" />

      <div className={styles.top}>
        <span className={styles.icon}>
          <Icon size={24} />
        </span>
        {tool.badge && <span className={styles.badge}>{tool.badge}</span>}
      </div>

      <h3 className={styles.name}>{tool.name}</h3>
      {tool.description && <p className={styles.desc}>{tool.description}</p>}

      <span className={styles.footer}>
        <span>Open</span>
        <ChevronRight size={16} className={styles.chevron} />
      </span>
    </Link>
  )
}
