import { useLayoutEffect, useRef, useState } from 'react'
import TemplateSelect from './components/TemplateSelect.jsx'
import InvoiceForm from './components/InvoiceForm.jsx'
import InvoicePreview from './components/InvoicePreview.jsx'
import { DownloadIcon, BackIcon } from './components/formIcons.jsx'
import { getTemplate } from './templates/index.js'
import { createInvoice, validateInvoice } from './lib/invoice.js'
import { exportInvoicePDF } from './lib/pdf.js'
import styles from './InvoiceGenerator.module.css'

/**
 * Fit the natural-size A4 sheet into its column by measuring available width
 * and scaling the sheet down with a CSS transform (never up past 1×). Returns
 * the scale plus the scaled box dimensions so surrounding layout reserves the
 * right space.
 */
function useFitScale(sheetRef, deps) {
  const stageRef = useRef(null)
  const [dims, setDims] = useState({ scale: 1, natW: 794, natH: 1123 })

  useLayoutEffect(() => {
    const stage = stageRef.current
    const sheet = sheetRef.current
    if (!stage || !sheet) return

    const compute = () => {
      const avail = stage.clientWidth
      const natW = sheet.offsetWidth || 794
      const natH = sheet.offsetHeight || 1123
      const scale = Math.min(1, avail / natW)
      setDims({ scale, natW, natH })
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(stage)
    ro.observe(sheet)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { stageRef, ...dims }
}

export default function InvoiceGenerator() {
  const [step, setStep] = useState('select') // 'select' | 'edit'
  const [templateId, setTemplateId] = useState(null)
  const [invoice, setInvoice] = useState(null)
  const [attempted, setAttempted] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [pdfError, setPdfError] = useState('')

  const sheetRef = useRef(null)
  const template = templateId ? getTemplate(templateId) : null

  const { stageRef, scale, natW, natH } = useFitScale(sheetRef, [
    step,
    invoice,
  ])

  const handleSelect = (id) => {
    const tpl = getTemplate(id)
    if (!tpl) return
    setInvoice((prev) =>
      prev && prev.templateId === id ? prev : createInvoice(tpl),
    )
    setTemplateId(id)
    setAttempted(false)
    setPdfError('')
    setStep('edit')
  }

  const backToTemplates = () => {
    setStep('select')
    setPdfError('')
  }

  const validation = invoice
    ? validateInvoice(invoice)
    : { valid: false, errors: {} }
  const shownErrors = attempted ? validation.errors : {}

  const handleDownload = async () => {
    setAttempted(true)
    setPdfError('')
    if (!validation.valid || !sheetRef.current) return
    setDownloading(true)
    try {
      await exportInvoicePDF(sheetRef.current, `${invoice.invoiceNumber}.pdf`)
    } catch (err) {
      console.error('PDF export failed', err)
      setPdfError('Something went wrong generating the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (step === 'select' || !invoice || !template) {
    return <TemplateSelect onSelect={handleSelect} />
  }

  return (
    <div className={styles.editor}>
      {/* toolbar */}
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={backToTemplates}
        >
          <BackIcon size={16} /> Templates
        </button>

        <div className={styles.toolbarRight}>
          {attempted && !validation.valid && (
            <span className={styles.validationHint}>
              Complete the required fields to export
            </span>
          )}
          <button
            type="button"
            className={styles.downloadBtn}
            onClick={handleDownload}
            disabled={downloading}
          >
            <DownloadIcon size={17} />
            {downloading ? 'Preparing…' : 'Download PDF'}
          </button>
        </div>
      </div>

      {pdfError && <p className={styles.pdfError}>{pdfError}</p>}

      {/* form + live preview */}
      <div className={styles.panes}>
        <div className={styles.formPane}>
          <InvoiceForm
            invoice={invoice}
            setInvoice={setInvoice}
            errors={shownErrors}
          />
        </div>

        <div className={styles.previewPane}>
          <div className={styles.previewSticky}>
            <span className={styles.previewLabel}>Live preview</span>
            <div className={styles.stage} ref={stageRef}>
              <div
                className={styles.scaleBox}
                style={{ width: natW * scale, height: natH * scale }}
              >
                <div
                  className={styles.scaler}
                  style={{
                    width: natW,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  }}
                >
                  <InvoicePreview
                    ref={sheetRef}
                    invoice={invoice}
                    template={template}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
