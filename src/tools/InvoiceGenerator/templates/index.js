import { digitalHeroes } from './digitalHeroes.js'

/**
 * Registry of brand templates shown on the "Choose a template" screen.
 *
 * To add another brand: create a preset file next to digitalHeroes.js (same
 * shape) and add it to this array. The selection screen renders a card for each
 * entry automatically, and the rest of the flow is brand-agnostic.
 */
export const templates = [digitalHeroes]

export function getTemplate(id) {
  return templates.find((t) => t.id === id) ?? null
}
