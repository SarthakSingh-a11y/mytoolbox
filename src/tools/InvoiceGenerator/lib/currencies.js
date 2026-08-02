/**
 * Common currencies for the invoice. `code` drives Intl formatting; `label`
 * is what the dropdown shows. Add a row here to offer another currency.
 */
export const CURRENCIES = [
  { code: 'USD', label: 'USD — US Dollar' },
  { code: 'EUR', label: 'EUR — Euro' },
  { code: 'GBP', label: 'GBP — British Pound' },
  { code: 'INR', label: 'INR — Indian Rupee' },
  { code: 'AUD', label: 'AUD — Australian Dollar' },
  { code: 'CAD', label: 'CAD — Canadian Dollar' },
  { code: 'JPY', label: 'JPY — Japanese Yen' },
  { code: 'CNY', label: 'CNY — Chinese Yuan' },
  { code: 'CHF', label: 'CHF — Swiss Franc' },
  { code: 'SGD', label: 'SGD — Singapore Dollar' },
  { code: 'AED', label: 'AED — UAE Dirham' },
  { code: 'ZAR', label: 'ZAR — South African Rand' },
  { code: 'BRL', label: 'BRL — Brazilian Real' },
  { code: 'NZD', label: 'NZD — New Zealand Dollar' },
]

/** Currencies with no minor unit — used to pick sensible decimal places. */
const ZERO_DECIMAL = new Set(['JPY'])

/**
 * Format a numeric amount in the given currency, e.g. formatMoney(1234.5, 'USD')
 * → "$1,234.50". Falls back gracefully if Intl doesn't know the code.
 */
export function formatMoney(amount, code = 'USD') {
  const value = Number.isFinite(amount) ? amount : 0
  const fractionDigits = ZERO_DECIMAL.has(code) ? 0 : 2
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value)
  } catch {
    return `${code} ${value.toFixed(fractionDigits)}`
  }
}
