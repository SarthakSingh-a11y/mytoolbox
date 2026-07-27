import { useEffect, useRef } from 'react'
import {
  WrenchIcon,
  GearIcon,
  RulerIcon,
  HammerIcon,
  ScrewdriverIcon,
  BoltIcon,
  LogoMark,
} from './icons.jsx'
import styles from './Hero.module.css'

/**
 * Homepage hero — the app's one signature animated element.
 *
 * A floating scene of tool glyphs that parallaxes to the cursor: each glyph
 * shifts by an amount proportional to its `depth`, and the whole scene tilts
 * in 3D (perspetive + rotateX/Y). The effect is driven by two inherited CSS
 * custom properties (--mx / --my) set on the section from a throttled
 * pointermove handler.
 *
 * Motion is entirely opt-out: under `prefers-reduced-motion: reduce` we never
 * attach the pointer handler and the idle float animations are neutralised by
 * the global reduced-motion rule — the scene simply renders as a static,
 * composed arrangement.
 */

// Floating glyphs: position (%), size (px), and parallax depth (higher = moves more).
const NODES = [
  { Icon: WrenchIcon, x: 14, y: 26, size: 30, depth: 40, spin: -8 },
  { Icon: GearIcon, x: 80, y: 20, size: 40, depth: 26, spin: 10 },
  { Icon: RulerIcon, x: 84, y: 72, size: 30, depth: 46, spin: 6 },
  { Icon: HammerIcon, x: 20, y: 74, size: 34, depth: 30, spin: -12 },
  { Icon: ScrewdriverIcon, x: 6, y: 52, size: 26, depth: 52, spin: 14 },
  { Icon: BoltIcon, x: 92, y: 46, size: 24, depth: 58, spin: -6 },
]

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', x.toFixed(3))
        el.style.setProperty('--my', y.toFixed(3))
      })
    }
    const reset = () => {
      cancelAnimationFrame(raf)
      el.style.setProperty('--mx', '0')
      el.style.setProperty('--my', '0')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', reset)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      style={{ '--mx': 0, '--my': 0 }}
    >
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Your personal workshop
          </span>

          <h1 className={styles.title}>
            One box.
            <br />
            Every <span className={styles.titleAccent}>tool</span> you build.
          </h1>

          <p className={styles.lede}>
            MyToolbox is a home for small, sharp web tools, added one at a time,
            each with its own place on the bench. Clean, fast, and built to grow.
          </p>

          <div className={styles.actions}>
            <a href="#tools" className={styles.ctaPrimary}>
              Browse the bench
            </a>
            <a href="#about" className={styles.ctaGhost}>
              How it works
            </a>
          </div>
        </div>

        {/* ---- Floating parallax tool scene ---- */}
        <div className={styles.scene} aria-hidden="true">
          <div className={styles.core}>
            <span className={styles.coreRing} />
            <span className={styles.coreRing} />
            <span className={styles.coreMark}>
              <LogoMark size={44} />
            </span>
          </div>

          {NODES.map(({ Icon, x, y, size, depth, spin }, i) => (
            <span
              key={i}
              className={styles.node}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                '--depth': depth,
                '--spin': `${spin}deg`,
                '--delay': `${i * 0.4}s`,
              }}
            >
              <span className={styles.nodeInner}>
                <Icon size={size} />
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
