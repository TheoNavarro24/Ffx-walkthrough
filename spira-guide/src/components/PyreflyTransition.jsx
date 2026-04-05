import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { usePyrefly } from '../hooks/usePyrefly'

const PALETTE = [
  [80, 200, 255],   // sky blue
  [120, 255, 220],  // aqua
  [160, 255, 140],  // green
  [255, 255, 120],  // yellow
  [255, 180, 80],   // amber
  [255, 120, 200],  // pink
  [200, 140, 255],  // lavender
  [255, 255, 255],  // white
]

function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

class Wisp {
  constructor(W, H) { this.W = W; this.H = H; this.reset(Math.random() * 200) }
  reset(stagger = 0) {
    const W = this.W, H = this.H
    this.x = Math.random() * W
    this.y = H + 10
    this.vx = (Math.random() - 0.5) * 1.0
    this.vy = -(0.6 + Math.random() * 1.0)
    this.life = -stagger
    this.maxLife = 100 + Math.random() * 120
    const ci = Math.floor(Math.random() * PALETTE.length)
    this.colorA = PALETTE[ci]
    this.colorB = PALETTE[(ci + 1 + Math.floor(Math.random() * 2)) % PALETTE.length]
    this.width = 1 + Math.random() * 2.5
    this.glowSize = 7 + Math.random() * 9
    this.waveAmp = (Math.random() - 0.5) * 2.5
    this.waveFreq = 0.04 + Math.random() * 0.06
    this.wavePhase = Math.random() * Math.PI * 2
    this.trail = []
  }
  step() {
    this.life++
    if (this.life < 0) return
    this.x += this.vx + this.waveAmp * Math.sin(this.waveFreq * this.life + this.wavePhase)
    this.y += this.vy
    const t = Math.max(0, this.life / this.maxLife)
    const col = lerp(this.colorA, this.colorB, t)
    this.trail.push({ x: this.x, y: this.y, col })
    const maxTrail = 20 + Math.floor(this.width * 3)
    if (this.trail.length > maxTrail) this.trail.shift()
    if (this.life >= this.maxLife) this.reset()
  }
  draw(ctx) {
    if (this.life < 0 || this.trail.length < 2) return
    const t = Math.max(0, this.life / this.maxLife)
    const alpha = (t < 0.12 ? t / 0.12 : t > 0.72 ? (1 - t) / 0.28 : 1)
    for (let i = 1; i < this.trail.length; i++) {
      const p = this.trail[i], pp = this.trail[i - 1]
      const segT = i / this.trail.length
      ctx.beginPath()
      ctx.moveTo(pp.x, pp.y)
      ctx.lineTo(p.x, p.y)
      ctx.strokeStyle = `rgba(${Math.round(p.col[0])},${Math.round(p.col[1])},${Math.round(p.col[2])},${alpha * segT * 0.85})`
      ctx.lineWidth = this.width * segT
      ctx.lineCap = 'round'
      ctx.stroke()
    }
    const head = this.trail[this.trail.length - 1]
    const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, this.glowSize)
    grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.9})`)
    grad.addColorStop(0.4, `rgba(${Math.round(head.col[0])},${Math.round(head.col[1])},${Math.round(head.col[2])},${alpha * 0.7})`)
    grad.addColorStop(1, `rgba(${Math.round(head.col[0])},${Math.round(head.col[1])},${Math.round(head.col[2])},0)`)
    ctx.beginPath()
    ctx.arc(head.x, head.y, this.glowSize, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
}

class Bloom {
  constructor(W, H) { this.W = W; this.H = H; this.reset(true) }
  reset(init) {
    this.x = Math.random() * this.W
    this.y = Math.random() * this.H
    this.r = 30 + Math.random() * 50
    this.life = init ? Math.random() * 200 : 0
    this.maxLife = 160 + Math.random() * 120
    this.col = PALETTE[Math.floor(Math.random() * PALETTE.length)]
  }
  step() {
    this.life++
    if (this.life >= this.maxLife) this.reset(false)
  }
  draw(ctx) {
    const t = this.life / this.maxLife
    const a = (t < 0.3 ? t / 0.3 : t > 0.7 ? (1 - t) / 0.3 : 1) * 0.06
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r)
    const c = this.col
    grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a})`)
    grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
}

export default function PyreflyTransition() {
  const { pyreflyEnabled } = usePyrefly()
  const canvasRef = useRef(null)
  const stateRef = useRef({ globalAlpha: 0.2, boost: false, boostTimer: 0 })
  const location = useLocation()

  // Trigger boost on route change
  useEffect(() => {
    stateRef.current.boost = true
    stateRef.current.boostTimer = 0
  }, [location])

  useEffect(() => {
    if (!pyreflyEnabled) return
    const canvas = canvasRef.current
    if (!canvas) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const wisps = Array.from({ length: 30 }, () => new Wisp(W, H))
    const blooms = Array.from({ length: 8 }, () => new Bloom(W, H))
    const ctx = canvas.getContext('2d')
    let rafId

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      wisps.forEach((w) => { w.W = W; w.H = H })
      blooms.forEach((b) => { b.W = W; b.H = H })
    }
    window.addEventListener('resize', resize)

    function tick() {
      const s = stateRef.current
      // Boost sequence: ramp up 150ms, hold 100ms, ramp down 200ms (~450ms total at 60fps)
      if (s.boost) {
        s.boostTimer++
        if (s.boostTimer <= 9) {
          s.globalAlpha = 0.2 + (0.8 * s.boostTimer) / 9
        } else if (s.boostTimer <= 15) {
          s.globalAlpha = 1.0
        } else if (s.boostTimer <= 27) {
          s.globalAlpha = 1.0 - (0.8 * (s.boostTimer - 15)) / 12
        } else {
          s.globalAlpha = 0.2
          s.boost = false
        }
      }

      ctx.clearRect(0, 0, W, H)
      ctx.save()
      ctx.globalAlpha = s.globalAlpha
      blooms.forEach((b) => { b.step(); b.draw(ctx) })
      wisps.forEach((w) => { w.step(); w.draw(ctx) })
      ctx.restore()
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [pyreflyEnabled])

  if (!pyreflyEnabled) return null

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}
      aria-hidden="true"
    />
  )
}
