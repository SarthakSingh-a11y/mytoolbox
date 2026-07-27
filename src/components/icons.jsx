/**
 * icons.jsx — a small, dependency-free SVG icon set.
 *
 * Every icon is a React component that inherits `currentColor` and forwards
 * props (so you can pass `className`, `width`, `aria-hidden`, etc.). Stroke
 * icons share a consistent 1.7 weight and rounded joints for a tactile,
 * "tool" look.
 *
 * When you add a tool, you can reuse one of these as the tool's `icon`, or
 * drop a new SVG component here and reference it from tools.config.js.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ children, size = 24, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

/* -------------------------------- UI chrome -------------------------------- */

export function LogoMark({ size = 28, ...props }) {
  // An open toolbox glyph — the brand mark.
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="M3 9.5h18v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-9Z" />
      <path {...stroke} d="M3 9.5 5 6h14l2 3.5" />
      <path {...stroke} d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6" />
      <path {...stroke} d="M9.5 9.5v2.5h5V9.5" />
    </Svg>
  )
}

export function HomeIcon({ size = 20, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="M4 11.5 12 4l8 7.5" />
      <path {...stroke} d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path {...stroke} d="M9.5 20v-5h5v5" />
    </Svg>
  )
}

export function SearchIcon({ size = 20, ...props }) {
  return (
    <Svg size={size} {...props}>
      <circle {...stroke} cx="11" cy="11" r="6.5" />
      <path {...stroke} d="m20 20-3.6-3.6" />
    </Svg>
  )
}

export function MenuIcon({ size = 22, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  )
}

export function CloseIcon({ size = 22, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="m6 6 12 12M18 6 6 18" />
    </Svg>
  )
}

export function ChevronRight({ size = 18, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="m9 6 6 6-6 6" />
    </Svg>
  )
}

/* --------------------- Tool glyphs (reusable + hero scene) ------------------ */

export function WrenchIcon({ size = 24, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path
        {...stroke}
        d="M14.5 5.5a4 4 0 0 0 5 5l-2 2 .5.5a3 3 0 0 1 0 4.2l-1 1a1.5 1.5 0 0 1-2.2 0l-8-8a1.5 1.5 0 0 1 0-2.2l1-1a3 3 0 0 1 4.2 0l.5.5 2-2Z"
      />
    </Svg>
  )
}

export function GearIcon({ size = 24, ...props }) {
  return (
    <Svg size={size} {...props}>
      <circle {...stroke} cx="12" cy="12" r="3.2" />
      <path
        {...stroke}
        d="M12 2.5v2.4M12 19.1v2.4M4.2 12H1.8M22.2 12h-2.4M5.9 5.9 4.2 4.2M19.8 19.8l-1.7-1.7M18.1 5.9l1.7-1.7M4.2 19.8l1.7-1.7"
      />
    </Svg>
  )
}

export function RulerIcon({ size = 24, ...props }) {
  return (
    <Svg size={size} {...props}>
      <rect {...stroke} x="2.5" y="8" width="19" height="8" rx="1.4" transform="rotate(45 12 12)" />
      <path {...stroke} d="M8.5 8.5 10 10M11 6 12.5 7.5M13.5 3.5 15 5" />
    </Svg>
  )
}

export function HammerIcon({ size = 24, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="M14 6.5 17.5 3 21 6.5 17.5 10 14 6.5Z" />
      <path {...stroke} d="m15.7 8.2-9 9a1.6 1.6 0 0 1-2.3-2.3l9-9" />
    </Svg>
  )
}

export function ScrewdriverIcon({ size = 24, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="M14.5 4.5 20 10l-2.2 2.2-1.6-1.6-6.4 6.4-2.8.8.8-2.8 6.4-6.4-1.6-1.6L14.5 4.5Z" />
    </Svg>
  )
}

export function BoltIcon({ size = 24, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="M13 2 4 13h6l-1 9 9-11h-6l1-9Z" />
    </Svg>
  )
}

/* A generic fallback for a tool that hasn't declared its own icon. */
export function ToolIcon({ size = 24, ...props }) {
  return (
    <Svg size={size} {...props}>
      <path {...stroke} d="M12 3.5a4 4 0 0 0 3.2 6.4l-6 6a2.3 2.3 0 1 0 1.9 1.9l6-6A4 4 0 0 0 12 3.5Z" />
    </Svg>
  )
}

// Ordered set the hero uses for its floating parallax scene.
export const HERO_GLYPHS = [
  WrenchIcon,
  GearIcon,
  RulerIcon,
  HammerIcon,
  ScrewdriverIcon,
  BoltIcon,
]
