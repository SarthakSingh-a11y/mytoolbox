import { useId } from 'react'
import { CURRENCIES, formatMoney } from '../lib/currencies.js'
import {
  INVOICE_STATUSES,
  PARTY_TYPES,
  makeItem,
  itemAmount,
} from '../lib/invoice.js'
import { TrashIcon, PlusIcon } from './formIcons.jsx'
import styles from './InvoiceForm.module.css'

/* ----------------------------- small helpers ------------------------------ */

function Field({ label, hint, error, children }) {
  const id = useId()
  const control = children(id)
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>
        {label}
        {hint && <span className={styles.hint}> {hint}</span>}
      </span>
      {control}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
}

function Segmented({ value, onChange, options, ariaLabel }) {
  return (
    <div className={styles.segmented} role="group" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.seg} ${value === opt.value ? styles.segActive : ''}`}
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

const PARTY_OPTIONS = [
  { value: PARTY_TYPES.BUSINESS, label: 'Business' },
  { value: PARTY_TYPES.INDIVIDUAL, label: 'Individual' },
]

/* -------------------------------- form ------------------------------------ */

export default function InvoiceForm({ invoice, setInvoice, errors }) {
  const patch = (p) => setInvoice((v) => ({ ...v, ...p }))
  const patchFrom = (p) =>
    setInvoice((v) => ({ ...v, from: { ...v.from, ...p } }))
  const patchBillTo = (p) =>
    setInvoice((v) => ({ ...v, billTo: { ...v.billTo, ...p } }))

  const updateItem = (id, p) =>
    setInvoice((v) => ({
      ...v,
      items: v.items.map((it) => (it.id === id ? { ...it, ...p } : it)),
    }))
  const addItem = () =>
    setInvoice((v) => ({ ...v, items: [...v.items, makeItem()] }))
  const removeItem = (id) =>
    setInvoice((v) => ({
      ...v,
      items:
        v.items.length > 1 ? v.items.filter((it) => it.id !== id) : v.items,
    }))

  const fromBusiness = invoice.from.type === PARTY_TYPES.BUSINESS
  const billBusiness = invoice.billTo.type === PARTY_TYPES.BUSINESS

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {/* ------------------------------ From ------------------------------ */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>From</h3>
        <Segmented
          ariaLabel="Sender type"
          value={invoice.from.type}
          onChange={(type) => patchFrom({ type })}
          options={PARTY_OPTIONS}
        />
        <Field label={fromBusiness ? 'Business name' : 'Full name'}>
          {(id) => (
            <input
              id={id}
              className={styles.input}
              type="text"
              value={invoice.from.name}
              onChange={(e) => patchFrom({ name: e.target.value })}
              placeholder={fromBusiness ? 'Your business' : 'Your name'}
            />
          )}
        </Field>
      </section>

      {/* ----------------------------- Bill To ---------------------------- */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Bill to</h3>
        <Segmented
          ariaLabel="Recipient type"
          value={invoice.billTo.type}
          onChange={(type) => patchBillTo({ type })}
          options={PARTY_OPTIONS}
        />
        <Field
          label={billBusiness ? 'Business name' : 'Full name'}
          error={errors.billToName}
        >
          {(id) => (
            <input
              id={id}
              className={`${styles.input} ${errors.billToName ? styles.inputError : ''}`}
              type="text"
              value={invoice.billTo.name}
              onChange={(e) => patchBillTo({ name: e.target.value })}
              placeholder={billBusiness ? 'Client business' : 'Client name'}
            />
          )}
        </Field>
        <Field label="Address">
          {(id) => (
            <textarea
              id={id}
              className={styles.textarea}
              rows={2}
              value={invoice.billTo.address}
              onChange={(e) => patchBillTo({ address: e.target.value })}
              placeholder="Street, city, country"
            />
          )}
        </Field>
        <Field label="Email">
          {(id) => (
            <input
              id={id}
              className={styles.input}
              type="email"
              value={invoice.billTo.email}
              onChange={(e) => patchBillTo({ email: e.target.value })}
              placeholder="name@company.com"
            />
          )}
        </Field>
        {billBusiness && (
          <Field label="VAT / Tax ID" hint="(optional)">
            {(id) => (
              <input
                id={id}
                className={styles.input}
                type="text"
                value={invoice.billTo.vatId}
                onChange={(e) => patchBillTo({ vatId: e.target.value })}
                placeholder="e.g. GB123456789"
              />
            )}
          </Field>
        )}
      </section>

      {/* -------------------------- Invoice details ----------------------- */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Invoice details</h3>
        <Field label="Invoice number">
          {(id) => (
            <input
              id={id}
              className={`${styles.input} ${styles.mono}`}
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => patch({ invoiceNumber: e.target.value })}
            />
          )}
        </Field>
        <div className={styles.row2}>
          <Field label="Issue date">
            {(id) => (
              <input
                id={id}
                className={styles.input}
                type="date"
                value={invoice.issueDate}
                onChange={(e) => patch({ issueDate: e.target.value })}
              />
            )}
          </Field>
          <Field label="Due date" hint="(optional)">
            {(id) => (
              <input
                id={id}
                className={styles.input}
                type="date"
                value={invoice.dueDate}
                onChange={(e) => patch({ dueDate: e.target.value })}
              />
            )}
          </Field>
        </div>
        <Field label="Status">
          {(id) => (
            <select
              id={id}
              className={styles.input}
              value={invoice.status}
              onChange={(e) => patch({ status: e.target.value })}
            >
              {INVOICE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        </Field>
      </section>

      {/* ---------------------------- Line items -------------------------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h3 className={styles.sectionTitle}>Line items</h3>
          <button type="button" className={styles.addBtn} onClick={addItem}>
            <PlusIcon size={15} /> Add item
          </button>
        </div>
        {errors.items && <p className={styles.sectionError}>{errors.items}</p>}

        <div className={styles.items}>
          {invoice.items.map((item, i) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemMain}>
                <span className={styles.itemNo}>{i + 1}</span>
                <input
                  className={styles.input}
                  type="text"
                  aria-label={`Item ${i + 1} description`}
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, { description: e.target.value })
                  }
                  placeholder="Description of work or product"
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                  disabled={invoice.items.length === 1}
                  aria-label={`Remove item ${i + 1}`}
                  title={
                    invoice.items.length === 1
                      ? 'At least one item is required'
                      : 'Remove item'
                  }
                >
                  <TrashIcon size={16} />
                </button>
              </div>
              <div className={styles.itemNums}>
                <label className={styles.miniField}>
                  <span>Qty</span>
                  <input
                    className={styles.input}
                    type="number"
                    min="0"
                    step="1"
                    value={item.qty}
                    onChange={(e) => updateItem(item.id, { qty: e.target.value })}
                  />
                </label>
                <label className={styles.miniField}>
                  <span>Rate</span>
                  <input
                    className={styles.input}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) =>
                      updateItem(item.id, { rate: e.target.value })
                    }
                  />
                </label>
                <label className={styles.miniField}>
                  <span>Amount</span>
                  <output className={`${styles.amount} ${styles.mono}`}>
                    {formatMoney(itemAmount(item), invoice.currency)}
                  </output>
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------- Currency & tax ------------------------- */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Currency &amp; tax</h3>
        <Field label="Currency">
          {(id) => (
            <select
              id={id}
              className={styles.input}
              value={invoice.currency}
              onChange={(e) => patch({ currency: e.target.value })}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <label className={styles.switchRow}>
          <input
            type="checkbox"
            className={styles.switch}
            checked={invoice.taxEnabled}
            onChange={(e) => patch({ taxEnabled: e.target.checked })}
          />
          <span>Add tax</span>
        </label>

        {invoice.taxEnabled && (
          <Field label="Tax rate (%)">
            {(id) => (
              <input
                id={id}
                className={styles.input}
                type="number"
                min="0"
                step="0.1"
                value={invoice.taxRate}
                onChange={(e) => patch({ taxRate: e.target.value })}
                placeholder="e.g. 20"
              />
            )}
          </Field>
        )}
      </section>

      {/* ------------------------------ Notes ----------------------------- */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Notes</h3>
        <Field label="Footer note">
          {(id) => (
            <textarea
              id={id}
              className={styles.textarea}
              rows={3}
              value={invoice.notes}
              onChange={(e) => patch({ notes: e.target.value })}
            />
          )}
        </Field>
      </section>
    </form>
  )
}
