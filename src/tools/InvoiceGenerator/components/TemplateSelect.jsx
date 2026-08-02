import { templates } from '../templates/index.js'
import styles from './TemplateSelect.module.css'

/**
 * Step 1 — choose a brand template. Renders one preview card per entry in the
 * templates registry, so adding a brand later needs no changes here. Each card
 * shows the brand mascot and an accent swatch as a small brand preview.
 */
export default function TemplateSelect({ onSelect }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>Choose a template</h2>
        <p className={styles.sub}>
          Pick a brand to start from. The invoice form loads pre-styled in that
          brand’s identity.
        </p>
      </div>

      <ul className={styles.grid}>
        {templates.map((tpl) => {
          const { Mascot, theme } = tpl
          return (
            <li key={tpl.id}>
              <button
                type="button"
                className={styles.card}
                onClick={() => onSelect(tpl.id)}
                style={{ '--brand-bg': theme.bg }}
              >
                {/* Brand preview swatch: mascot on the brand's cream, with an
                    accent bar showing the palette. */}
                <span className={styles.preview}>
                  <span className={styles.previewMascot}>
                    <Mascot size={64} />
                  </span>
                  <span className={styles.swatches} aria-hidden="true">
                    <span style={{ background: theme.moss }} />
                    <span style={{ background: theme.mossLight }} />
                    <span style={{ background: theme.amber }} />
                    <span style={{ background: theme.ink }} />
                  </span>
                </span>

                <span className={styles.body}>
                  <span className={styles.name}>{tpl.name}</span>
                  <span className={styles.tagline}>{tpl.tagline}</span>
                </span>

                <span className={styles.cta}>Use this template →</span>
              </button>
            </li>
          )
        })}

        {/* Placeholder communicating that more brands can be added. */}
        <li>
          <div className={styles.soon} aria-hidden="true">
            <span className={styles.soonPlus}>+</span>
            <span>More templates coming soon</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
