import { useEffect, useRef, useState } from 'react'

const VIEWPORT = 280 // px, the visible circular crop area
const OUTPUT_SIZE = 600 // px, the exported square image resolution

// A self-contained crop/zoom/pan editor for a single image file, modeled
// on WhatsApp's profile photo picker: drag to reposition, slider to zoom,
// circular preview mask. No image-processing library — just canvas math.
export default function ImageCropper({ file, onCancel, onConfirm }) {
  const [imgEl, setImgEl] = useState(null)
  // Start slightly zoomed in past the exact-cover minimum so there's
  // immediately room to drag — at exactly 1x an image with matching
  // aspect ratio has zero slack in one or both axes and panning does
  // nothing until the user finds the zoom slider first.
  const [zoom, setZoom] = useState(1.25)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null) // { startX, startY, startOffsetX, startOffsetY }
  const containerRef = useRef(null)

  // Load the image once to get its natural dimensions.
  useEffect(() => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => setImgEl(img)
    img.src = url
    return () => URL.revokeObjectURL(url)
  }, [file])

  if (!imgEl) {
    return (
      <div className="cropper-backdrop">
        <div className="cropper-modal">
          <p style={{ padding: 24 }}>Loading…</p>
        </div>
      </div>
    )
  }

  const baseScale = Math.max(VIEWPORT / imgEl.naturalWidth, VIEWPORT / imgEl.naturalHeight)
  const scale = baseScale * zoom
  const scaledWidth = imgEl.naturalWidth * scale
  const scaledHeight = imgEl.naturalHeight * scale
  const maxOffsetX = Math.max(0, (scaledWidth - VIEWPORT) / 2)
  const maxOffsetY = Math.max(0, (scaledHeight - VIEWPORT) / 2)

  function clamp(value, max) {
    return Math.min(max, Math.max(-max, value))
  }

  function handlePointerDown(e) {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, startOffsetX: offset.x, startOffsetY: offset.y }
  }

  function handlePointerMove(e) {
    if (!dragRef.current) return
    e.preventDefault()
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setOffset({
      x: clamp(dragRef.current.startOffsetX + dx, maxOffsetX),
      y: clamp(dragRef.current.startOffsetY + dy, maxOffsetY),
    })
  }

  function handlePointerUp() {
    dragRef.current = null
  }

  function handleZoomChange(e) {
    const nextZoom = Number(e.target.value)
    setZoom(nextZoom)
    // Re-clamp the current offset against the new scale so zooming out
    // never leaves a gap at the edges.
    const nextScale = baseScale * nextZoom
    const nextMaxX = Math.max(0, (imgEl.naturalWidth * nextScale - VIEWPORT) / 2)
    const nextMaxY = Math.max(0, (imgEl.naturalHeight * nextScale - VIEWPORT) / 2)
    setOffset((prev) => ({ x: clamp(prev.x, nextMaxX), y: clamp(prev.y, nextMaxY) }))
  }

  function handleConfirm() {
    // Map the visible viewport rectangle back to natural image pixel
    // coordinates, then draw exactly that region onto the output canvas.
    const imgLeft = VIEWPORT / 2 - scaledWidth / 2 + offset.x
    const imgTop = VIEWPORT / 2 - scaledHeight / 2 + offset.y
    const sx = -imgLeft / scale
    const sy = -imgTop / scale
    const sSize = VIEWPORT / scale

    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT_SIZE
    canvas.height = OUTPUT_SIZE
    const ctx = canvas.getContext('2d')
    ctx.drawImage(imgEl, sx, sy, sSize, sSize, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE)

    canvas.toBlob(
      (blob) => {
        if (blob) onConfirm(blob)
      },
      'image/jpeg',
      0.92
    )
  }

  return (
    <div className="cropper-backdrop">
      <div className="cropper-modal">
        <div
          ref={containerRef}
          className="cropper-viewport"
          style={{ width: VIEWPORT, height: VIEWPORT }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <img
            src={imgEl.src}
            alt="Crop preview"
            draggable={false}
            style={{
              position: 'absolute',
              width: scaledWidth,
              height: scaledHeight,
              left: VIEWPORT / 2 - scaledWidth / 2 + offset.x,
              top: VIEWPORT / 2 - scaledHeight / 2 + offset.y,
              touchAction: 'none',
              userSelect: 'none',
            }}
          />
        </div>

        <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '.85rem', color: 'var(--text-subtle)' }}>Zoom</span>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={handleZoomChange}
            style={{ flex: 1 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-sm" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleConfirm}>Use photo</button>
        </div>
      </div>
    </div>
  )
}
