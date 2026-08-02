import { forwardRef } from 'react'
import { formatMoney } from '../lib/currencies.js'
import { computeTotals, itemAmount, PARTY_TYPES } from '../lib/invoice.js'
import styles from './InvoicePreview.module.css'

/** ISO yyyy-mm-dd → "2 Aug 2026". Empty/invalid input renders nothing. */
function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const STATUS_TONE = {
  Paid: 'paid',
  Unpaid: 'unpaid',
  'Partially Paid': 'partial',
}

/** #rrggbb + alpha → "rgba(r, g, b, a)". Kept literal so html2canvas renders it. */
function rgba(hex, alpha) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * The branded invoice sheet. Reads all styling from `template.theme`/`fonts`
 * via inline CSS variables, so it's fully driven by the chosen preset — no
 * brand-specific code here. Rendered at natural A4 size; the parent scales it
 * for display and passes a ref so the exact node can be exported to PDF.
 */
const InvoicePreview = forwardRef(function InvoicePreview(
  { invoice, template },
  ref,
) {
  const { theme, fonts, Mascot } = template
  const { subtotal, taxRate, taxAmount, total } = computeTotals(invoice)
  const currency = invoice.currency
  const singleItem = invoice.items.length === 1
  const billBusiness = invoice.billTo.type === PARTY_TYPES.BUSINESS

  const styleVars = {
    '--bg': theme.bg,
    '--ink': theme.ink,
    '--moss': theme.moss,
    '--moss-light': theme.mossLight,
    '--amber': theme.amber,
    '--amber-dark': theme.amberDark,
    '--line': theme.line,
    '--muted': theme.muted,
    '--font-body': fonts.body,
    '--font-mono': fonts.mono,
    '--font-accent': fonts.accent,
    '--moss-tint': rgba(theme.moss, 0.07),
    '--amber-tint': rgba(theme.amber, 0.12),
    '--ink-tint': rgba(theme.ink, 0.06),
  }

  return (
    <div className={styles.sheet} style={styleVars} ref={ref}>
      {/* ------------------------------ header ------------------------------ */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <Mascot size={64} />
          <span className={styles.brandName}>{invoice.from.name || 'Your brand'}</span>
        </div>

        <div className={styles.headMeta}>
          <h1 className={styles.invoiceTitle}>Invoice</h1>
          <div className={styles.metaLine}>
            <span className={styles.metaLabel}>No.</span>
            <span className={styles.mono}>{invoice.invoiceNumber}</span>
          </div>
          <div className={styles.metaLine}>
            <span className={styles.metaLabel}>Issued</span>
            <span>{formatDate(invoice.issueDate) || '—'}</span>
          </div>
          {invoice.dueDate && (
            <div className={styles.metaLine}>
              <span className={styles.metaLabel}>Due</span>
              <span>{formatDate(invoice.dueDate)}</span>
            </div>
          )}
          <span
            className={`${styles.badge} ${styles[STATUS_TONE[invoice.status] || 'unpaid']}`}
          >
            {invoice.status}
          </span>
        </div>
      </header>

      {/* --------------------------- parties row --------------------------- */}
      <section className={styles.parties}>
        <div className={styles.party}>
          <span className={styles.partyLabel}>From</span>
          <span className={styles.partyName}>
            {invoice.from.name || '—'}
          </span>
        </div>
        <div className={styles.party}>
          <span className={styles.partyLabel}>Bill to</span>
          <span className={styles.partyName}>{invoice.billTo.name || '—'}</span>
          {invoice.billTo.address && (
            <span className={styles.partyText}>{invoice.billTo.address}</span>
          )}
          {invoice.billTo.email && (
            <span className={styles.partyText}>{invoice.billTo.email}</span>
          )}
          {billBusiness && invoice.billTo.vatId && (
            <span className={styles.partyText}>
              VAT / Tax ID: {invoice.billTo.vatId}
            </span>
          )}
        </div>
      </section>

      {/* ---------------------------- line items --------------------------- */}
      <section className={styles.items}>
        <div className={`${styles.itemHead} ${singleItem ? styles.itemHeadSingle : ''}`}>
          {!singleItem && <span className={styles.colNo}>#</span>}
          <span className={styles.colDesc}>Description</span>
          <span className={styles.colQty}>Qty</span>
          <span className={styles.colRate}>Rate</span>
          <span className={styles.colAmt}>Amount</span>
        </div>

        {invoice.items.map((item, i) => (
          <div
            key={item.id}
            className={`${styles.itemRow} ${singleItem ? styles.itemRowSingle : ''}`}
          >
            {!singleItem && <span className={`${styles.colNo} ${styles.mono}`}>{i + 1}</span>}
            <span className={styles.colDesc}>
              <span className={styles.itemTitle}>
                {item.description || 'Untitled item'}
              </span>
            </span>
            <span className={`${styles.colQty} ${styles.mono}`}>{item.qty || 0}</span>
            <span className={`${styles.colRate} ${styles.mono}`}>
              {formatMoney(Number(item.rate) || 0, currency)}
            </span>
            <span className={`${styles.colAmt} ${styles.mono}`}>
              {formatMoney(itemAmount(item), currency)}
            </span>
          </div>
        ))}
      </section>

      {/* ------------------------------ totals ----------------------------- */}
      <section className={styles.totals}>
        <div className={styles.totalsInner}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span className={styles.mono}>{formatMoney(subtotal, currency)}</span>
          </div>
          {invoice.taxEnabled && (
            <div className={styles.totalRow}>
              <span>Tax ({Number(taxRate) || 0}%)</span>
              <span className={styles.mono}>{formatMoney(taxAmount, currency)}</span>
            </div>
          )}
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total</span>
            <span className={styles.mono}>{formatMoney(total, currency)}</span>
          </div>
        </div>
      </section>

      {/* ------------------------------ footer ----------------------------- */}
      <footer className={styles.footer}>
        <div className={styles.footerCols}>
          <div className={styles.payRef}>
            <span className={styles.footLabel}>Payment reference</span>
            <span className={styles.mono}>{invoice.invoiceNumber}</span>
          </div>
          {invoice.notes && (
            <div className={styles.notes}>
              <span className={styles.footLabel}>Notes</span>
              <span className={styles.notesText}>{invoice.notes}</span>
            </div>
          )}
        </div>
        <p className={styles.thankYou}>{template.thankYou}</p>
      </footer>
    </div>
  )
})

export default InvoicePreview
