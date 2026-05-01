import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll, useAnimationFrame } from 'framer-motion'

/**
 * useImageSequence
 * Pixel-perfect scroll-linked image sequence renderer.
 * All canvas logic is encapsulated here — zero canvas code outside this hook.
 *
 * PIXEL-PERFECT STRATEGY:
 * - Canvas buffer is sized to PHYSICAL pixels (CSS size × devicePixelRatio)
 * - NO ctx.scale() — we draw directly to the full physical pixel buffer
 * - CSS width/height: 100% handles display scaling
 * - Result: 1:1 physical pixel mapping, maximum sharpness
 * - imageSmoothingQuality: 'high' for best interpolation
 */
export function useImageSequence({ folder, frameCount, filePattern, scrollRef }) {
  const canvasRef = useRef(null)
  const images = useRef([])
  const lastFrame = useRef(-1)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)

  /**
   * Draw a single frame with object-fit: cover math.
   * Draws directly to canvas buffer dimensions (physical pixels).
   * No ctx.scale — the buffer IS the physical pixel grid.
   */
  const drawFrame = useCallback((img) => {
    if (!img || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Enable maximum quality interpolation
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Canvas buffer dimensions = physical pixels
    const dw = canvas.width
    const dh = canvas.height

    // Source image dimensions
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // Object-fit: cover — compute source crop
    const canvasAspect = dw / dh
    const imgAspect = iw / ih

    let sx = 0, sy = 0, sw = iw, sh = ih

    if (canvasAspect > imgAspect) {
      // Canvas is wider — crop top/bottom of source
      sh = iw / canvasAspect
      sy = (ih - sh) / 2
    } else {
      // Canvas is taller — crop left/right of source
      sw = ih * canvasAspect
      sx = (iw - sw) / 2
    }

    // Clear and draw — destination is full physical pixel buffer
    ctx.clearRect(0, 0, dw, dh)
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh)
  }, [])

  // Preload all frames in parallel
  useEffect(() => {
    let loadedCount = 0
    images.current = new Array(frameCount)

    const promises = Array.from({ length: frameCount }, (_, i) => {
      return new Promise((resolve) => {
        const img = new Image()
        const padLen = frameCount > 99 ? 3 : 2
        const paddedIndex = String(i).padStart(padLen, '0')
        img.src = `${folder}/${filePattern.replace('{n}', paddedIndex)}`
        img.onload = () => {
          images.current[i] = img
          loadedCount++
          setLoadProgress(Math.round((loadedCount / frameCount) * 100))
          resolve()
        }
        img.onerror = () => {
          loadedCount++
          setLoadProgress(Math.round((loadedCount / frameCount) * 100))
          resolve()
        }
      })
    })

    Promise.all(promises).then(() => {
      setIsLoaded(true)
      if (images.current[0]) {
        drawFrame(images.current[0])
      }
    })
  }, [folder, frameCount, filePattern, drawFrame])

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  /**
   * Canvas resize handler — pixel-perfect DPR-aware sizing.
   * Sets canvas buffer to exact physical pixel dimensions.
   * NO ctx.scale() — drawFrame draws directly to physical pixels.
   */
  useEffect(() => {
    const updateSize = () => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      const dpr = window.devicePixelRatio || 1

      // Get the actual CSS layout size of the canvas container
      const parent = canvas.parentElement
      const rect = parent ? parent.getBoundingClientRect() : {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      // Set canvas buffer to PHYSICAL pixel dimensions
      // This is the key to pixel-perfect rendering:
      // buffer pixels = CSS pixels × DPR = physical screen pixels
      const bufferWidth = Math.round(rect.width * dpr)
      const bufferHeight = Math.round(rect.height * dpr)

      // Only resize if dimensions actually changed (avoids unnecessary redraws)
      if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
        canvas.width = bufferWidth
        canvas.height = bufferHeight
      }

      // Redraw current frame at new resolution
      const frameIdx = lastFrame.current >= 0 ? lastFrame.current : 0
      if (images.current[frameIdx]) {
        drawFrame(images.current[frameIdx])
      }
    }

    const ro = new ResizeObserver(updateSize)
    if (canvasRef.current?.parentElement) {
      ro.observe(canvasRef.current.parentElement)
    }
    updateSize()

    // Also listen for DPR changes (e.g., dragging window between monitors)
    const dprMedia = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    const handleDprChange = () => updateSize()
    dprMedia.addEventListener?.('change', handleDprChange)

    return () => {
      ro.disconnect()
      dprMedia.removeEventListener?.('change', handleDprChange)
    }
  }, [isLoaded, drawFrame])

  // Animation frame draw loop — never setState here
  useAnimationFrame(() => {
    if (!isLoaded) return
    const progress = scrollYProgress.get()
    const maxIndex = frameCount - 1
    const index = Math.min(maxIndex, Math.floor(progress * frameCount))
    if (index === lastFrame.current) return
    lastFrame.current = index
    drawFrame(images.current[index])
  })

  return { canvasRef, isLoaded, loadProgress }
}
