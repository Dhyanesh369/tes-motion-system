import gsap from 'gsap'

// Animates a gold shimmer gradient across text on scroll entry
// Use on: hero headlines, section numbers, brand names
export function gradientSweep(
  el: HTMLElement,
  options: {
    from?: string  // default: var(--text)
    sweep?: string // default: var(--gold)
    duration?: number // default: 1.2
    delay?: number    // default: 0
  } = {}
) {
  const {
    from = 'var(--text)',
    sweep = 'var(--gold)',
    duration = 1.2,
    delay = 0,
  } = options

  // Set initial gradient: fully from-color
  gsap.set(el, {
    backgroundImage: `linear-gradient(90deg, ${from} 0%, ${from} 100%)`,
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    color: 'transparent',
  })

  // Animate sweep mid-stop across text
  gsap.to({ pct: 0 }, {
    pct: 100,
    duration,
    delay,
    ease: 'power2.inOut',
    onUpdate() {
      const p = (this.targets()[0] as { pct: number }).pct
      el.style.backgroundImage = `linear-gradient(90deg,
        ${sweep} 0%,
        ${sweep} ${p}%,
        ${from} ${p + 10}%,
        ${from} 100%)`
    },
    onComplete() {
      // Settle to solid text color — remove gradient overhead
      el.style.backgroundImage = 'none'
      el.style.color = from
    }
  })
}
