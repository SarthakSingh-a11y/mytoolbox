/**
 * Digital Heroes mascot — a small caped "digital hero" character rendered as a
 * self-contained, transparent SVG (no background box), so it can sit directly
 * inside the invoice header or a template preview card at any size.
 *
 * Colours come from the brand palette; they're props with brand defaults so the
 * same component could be re-skinned if ever needed.
 */
export default function DigitalHeroesMascot({
  size = 56,
  ink = '#0a0a1a',
  moss = '#3f6b54',
  mossLight = '#6fa37a',
  amber = '#cd8a4b',
  amberDark = '#b56f30',
  title = 'Digital Heroes',
  ...props
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      {...props}
    >
      {/* cape */}
      <path d="M18 42c-6 3-9 9-9 18h14V44Z" fill={moss} />
      <path d="M46 42c6 3 9 9 9 18H41V44Z" fill={moss} />

      {/* shoulders / torso */}
      <path
        d="M14 62c0-11 8-18 18-18s18 7 18 18Z"
        fill={ink}
      />
      {/* collar */}
      <path d="M24 45c2 3 5 4 8 4s6-1 8-4l-8-3Z" fill={mossLight} />

      {/* chest star emblem */}
      <path
        d="M32 47.5 33.6 51.5 38 51.7 34.6 54.3 35.8 58.6 32 56.1 28.2 58.6 29.4 54.3 26 51.7 30.4 51.5Z"
        fill={amber}
      />

      {/* antenna */}
      <line x1="32" y1="10" x2="32" y2="5" stroke={mossLight} strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="4" r="2.4" fill={amber} />

      {/* helmet / head */}
      <rect x="17" y="9" width="30" height="30" rx="13" fill={ink} />
      {/* side pods */}
      <rect x="12.5" y="20" width="5" height="10" rx="2.5" fill={moss} />
      <rect x="46.5" y="20" width="5" height="10" rx="2.5" fill={moss} />

      {/* visor */}
      <rect x="21" y="19.5" width="22" height="9" rx="4.5" fill={amber} />
      <rect x="21" y="19.5" width="22" height="4" rx="2" fill={amberDark} opacity="0.35" />
      {/* eyes */}
      <circle cx="27.5" cy="24" r="1.9" fill={ink} />
      <circle cx="36.5" cy="24" r="1.9" fill={ink} />
    </svg>
  )
}
