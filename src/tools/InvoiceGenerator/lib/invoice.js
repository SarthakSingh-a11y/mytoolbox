/**
 * Invoice domain logic — model shape, calculations, number generation, and
 * validation. All pure and brand-agnostic: the form, preview, and PDF code
 * read from these helpers, so a new brand preset never touches this file.
 */

export const INVOICE_STATUSES = ['Paid', 'Unpaid', 'Partially Paid']

export const PARTY_TYPES = { BUSINESS: 'business', INDIVIDUAL: 'individual' }

let itemSeq = 0
/** Stable-enough unique id for list keys (client-only, non-persisted). */
export function uid(prefix = 'id') {
  itemSeq += 1
  return `${prefix}-${itemSeq}-${Math.floor(Math.random() * 1e6)}`
}

/** Today's date as an ISO yyyy-mm-dd string for <input type="date">. */
export function todayISO() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

/**
 * Invoice number: `INV-YYMMDD-####`.
 *
 * The 4-digit suffix is random (never a sequential counter) and deliberately
 * avoids "round" endpoints: the first and last digits are always 1–9, so it
 * never starts or ends in 0 (e.g. never 0123 or 4560, never 0001).
 */
export function generateInvoiceNumber(date = new Date()) {
  const yy = String(date.getFullYear()).slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  const first = 1 + Math.floor(Math.random() * 9) // 1–9
  const midA = Math.floor(Math.random() * 10) // 0–9
  const midB = Math.floor(Math.random() * 10) // 0–9
  const last = 1 + Math.floor(Math.random() * 9) // 1–9
  const suffix = `${first}${midA}${midB}${last}`

  return `INV-${yy}${mm}${dd}-${suffix}`
}

/** A fresh, empty line item. */
export function makeItem(overrides = {}) {
  return { id: uid('item'), description: '', qty: 1, rate: 0, ...overrides }
}

/**
 * Build the initial invoice model for a chosen brand template. Brand-specific
 * defaults (from-name, notes, etc.) come from `template.defaults`.
 */
export function createInvoice(template) {
  const d = template?.defaults ?? {}
  return {
    templateId: template?.id ?? null,
    from: {
      type: d.from?.type ?? PARTY_TYPES.BUSINESS,
      name: d.from?.name ?? '',
    },
    billTo: {
      type: PARTY_TYPES.BUSINESS,
      name: '',
      address: '',
      email: '',
      vatId: '',
    },
    invoiceNumber: generateInvoiceNumber(),
    issueDate: todayISO(),
    dueDate: '',
    status: d.status ?? 'Unpaid',
    items: [makeItem()],
    currency: d.currency ?? 'USD',
    taxEnabled: false,
    taxRate: 0,
    notes:
      d.notes ??
      'This invoice is issued for tax and accounting records. Please retain this document for your records.',
  }
}

/** qty × rate for a single item, coerced to safe numbers. */
export function itemAmount(item) {
  const qty = Number(item.qty) || 0
  const rate = Number(item.rate) || 0
  return qty * rate
}

/** Subtotal, tax, and grand total for an invoice. */
export function computeTotals(invoice) {
  const subtotal = invoice.items.reduce((sum, it) => sum + itemAmount(it), 0)
  const taxRate = invoice.taxEnabled ? Number(invoice.taxRate) || 0 : 0
  const taxAmount = subtotal * (taxRate / 100)
  return { subtotal, taxRate, taxAmount, total: subtotal + taxAmount }
}

/**
 * Validate the required fields. Everything else has sensible defaults.
 * Required: Bill To name, and at least one item with a description and rate > 0.
 * Returns { valid, errors } where errors maps a field key to a message.
 */
export function validateInvoice(invoice) {
  const errors = {}

  if (!invoice.billTo.name.trim()) {
    errors.billToName = 'Enter who this invoice is billed to.'
  }

  const validItems = invoice.items.filter(
    (it) => it.description.trim() && (Number(it.rate) || 0) > 0,
  )
  if (validItems.length === 0) {
    errors.items = 'Add at least one item with a description and a rate above 0.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
