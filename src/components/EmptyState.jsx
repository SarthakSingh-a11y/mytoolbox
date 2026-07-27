import styles from './EmptyState.module.css'

/**
 * Polished empty state for the tools grid. Two variants:
 *   - "empty"      → the config has no tools yet (default).
 *   - "no-results" → a search returned nothing; offers a clear-search action.
 */
export default function EmptyState({ variant = 'empty', query = '', onClear }) {
  const isSearch = variant === 'no-results'

  return (
    <div className={styles.wrap}>
      <div className={styles.art} aria-hidden="true">
        <span className={styles.glow} />
        <svg viewBox="0 0 120 120" width="128" height="128" className={styles.svg}>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* toolbox body */}
            <path d="M20 54h80v42a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V54Z" />
            {/* open lid */}
            <path d="M20 54 27 40h66l7 14" />
            {/* handle */}
            <path d="M46 40v-6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v6" />
            {/* latch slot */}
            <path d="M52 54v7h16v-7" />
          </g>
          {/* dashed "add here" tray hinting where tools land */}
          <rect
            x="34"
            y="72"
            width="52"
            height="18"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 6"
            className={styles.tray}
          />
          <path
            d="M60 76v10M55 81h10"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className={styles.plus}
          />
        </svg>
      </div>

      <h3 className={styles.title}>
        {isSearch ? 'Nothing matches that' : 'No tools yet'}
      </h3>

      <p className={styles.text}>
        {isSearch ? (
          <>
            No tools found for <span className={styles.q}>“{query}”</span>. Try a
            different term.
          </>
        ) : (
          <>
            The bench is clear for now. New tools will appear here the moment
            they’re added. Check back soon.
          </>
        )}
      </p>

      {isSearch && (
        <button type="button" className={styles.action} onClick={onClear}>
          Clear search
        </button>
      )}
    </div>
  )
}
