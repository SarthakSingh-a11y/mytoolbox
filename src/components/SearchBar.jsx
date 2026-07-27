import { SearchIcon, CloseIcon } from './icons.jsx'
import styles from './SearchBar.module.css'

/**
 * Controlled search/filter input. Purely presentational — the parent owns the
 * query string and does the filtering, so this works identically whether there
 * are zero tools or many.
 */
export default function SearchBar({ value, onChange, placeholder = 'Search tools…' }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.iconLeft} aria-hidden="true">
        <SearchIcon size={20} />
      </span>

      <input
        type="text"
        inputMode="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search tools"
        autoComplete="off"
        spellCheck="false"
      />

      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  )
}
