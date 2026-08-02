/** Tiny stroke icons used inside the invoice form controls. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function PlusIcon({ size = 16, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path {...base} d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function TrashIcon({ size = 16, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path {...base} d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path {...base} d="M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12" />
      <path {...base} d="M10 11v6M14 11v6" />
    </svg>
  )
}

export function DownloadIcon({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path {...base} d="M12 4v11M8 11l4 4 4-4" />
      <path {...base} d="M5 19h14" />
    </svg>
  )
}

export function BackIcon({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path {...base} d="M15 6l-6 6 6 6" />
    </svg>
  )
}
