/**
 * PDF export — renders the on-screen invoice sheet (already styled, fonts
 * loaded) to a print-ready A4 PDF. html2canvas + jsPDF are imported dynamically
 * inside the handler so they never weigh down the initial tool bundle.
 *
 * Pagination is computed explicitly rather than left to a helper, because the
 * A4 sheet is *exactly* one page tall — naive auto-pagination rounds a hair
 * over and emits a blank trailing page. Here: if the captured image fits within
 * one A4 page (with a small tolerance) it becomes a single page; only genuinely
 * taller content (many line items) is sliced into additional pages, and the
 * loop stops as soon as the canvas is consumed, so there is never a blank page.
 */
const A4 = { w: 210, h: 297 } // mm
const CREAM = '#f5f0e8'

export async function exportInvoicePDF(element, filename = 'invoice.pdf') {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: CREAM,
    useCORS: true,
    logging: false,
  })

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const pxPerMm = canvas.width / A4.w
  const fullImgHmm = canvas.height / pxPerMm // image height if placed at full A4 width

  // Fits on a single page (tolerance absorbs sub-pixel rounding).
  if (fullImgHmm <= A4.h + 1) {
    const data = canvas.toDataURL('image/jpeg', 0.98)
    pdf.addImage(data, 'JPEG', 0, 0, A4.w, Math.min(fullImgHmm, A4.h))
    pdf.save(filename)
    return
  }

  // Taller than one page: slice the canvas into page-height bands.
  const pageHpx = Math.floor(A4.h * pxPerMm)
  let offset = 0
  let first = true
  while (offset < canvas.height - 1) {
    const sliceHpx = Math.min(pageHpx, canvas.height - offset)

    const slice = document.createElement('canvas')
    slice.width = canvas.width
    slice.height = sliceHpx
    const ctx = slice.getContext('2d')
    ctx.fillStyle = CREAM
    ctx.fillRect(0, 0, slice.width, slice.height)
    ctx.drawImage(
      canvas,
      0,
      offset,
      canvas.width,
      sliceHpx,
      0,
      0,
      canvas.width,
      sliceHpx,
    )

    if (!first) pdf.addPage()
    first = false
    pdf.addImage(
      slice.toDataURL('image/jpeg', 0.98),
      'JPEG',
      0,
      0,
      A4.w,
      sliceHpx / pxPerMm,
    )
    offset += sliceHpx
  }

  pdf.save(filename)
}
