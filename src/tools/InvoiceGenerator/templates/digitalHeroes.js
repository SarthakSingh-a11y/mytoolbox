import DigitalHeroesMascot from './DigitalHeroesMascot.jsx'

/**
 * Digital Heroes brand preset.
 *
 * A template is a plain config object: brand identity (theme colours, fonts,
 * mascot) plus default field values. The form, live preview, and PDF export all
 * read from this shape generically — so adding another brand later means
 * creating one more preset file like this and listing it in ./index.js.
 * Nothing in the form or PDF logic needs to change.
 */
export const digitalHeroes = {
  id: 'digital-heroes',
  name: 'Digital Heroes',
  tagline: 'Creative studio invoice',
  Mascot: DigitalHeroesMascot,

  // Colour identity used by the preview + PDF.
  theme: {
    bg: '#f5f0e8', // cream page
    ink: '#0a0a1a', // deep-space header text
    moss: '#3f6b54', // primary accent (labels, party cards)
    mossLight: '#6fa37a', // secondary green
    amber: '#cd8a4b', // invoice title + total
    amberDark: '#b56f30', // amber shade for emphasis
    line: '#e2d8c8', // hairline dividers on cream
    muted: '#6b6456', // secondary body text on cream
  },

  // Typography roles (families are loaded globally in index.html).
  fonts: {
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    accent: "'Playfair Display', Georgia, serif", // used italic for thank-you
  },

  thankYou: 'Thank you for your business.',

  // Default field values loaded when this template is chosen.
  defaults: {
    from: { type: 'business', name: 'Digital Heroes' },
    currency: 'USD',
    status: 'Unpaid',
    notes:
      'This invoice is issued for tax and accounting records. Please retain this document for your records.',
  },
}
