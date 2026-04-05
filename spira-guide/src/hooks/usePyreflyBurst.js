export function triggerPyreflyBurst(x, y, count = 8) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    el.className = 'pyrefly-particle'
    const angle = (i / count) * Math.PI * 2
    const dist = 40 + Math.random() * 40
    el.style.setProperty('--tx', `${Math.cos(angle) * dist}px`)
    el.style.setProperty('--ty', `${Math.sin(angle) * dist - 30}px`)
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    document.body.appendChild(el)
    el.addEventListener('animationend', () => el.remove(), { once: true })
  }
}
