import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { revealText } from './textReveal'
import { textRevealPresets } from './textPresets'
import type { SplitRevealConfig } from './splitUtils'
gsap.registerPlugin(ScrollTrigger)

// Use this for GSAP-controlled pages (mont-fort style scroll hijack)
// NOT for normal React pages — use useTextReveal hook there

export function bindTextScrollTriggers(
  selector: string = '[data-text-reveal]',
  defaultPreset: keyof typeof textRevealPresets = 'lineRise'
) {
  const els = document.querySelectorAll<HTMLElement>(selector)

  els.forEach(el => {
    const preset = (el.dataset.textReveal || defaultPreset) as keyof typeof textRevealPresets
    const config: SplitRevealConfig = textRevealPresets[preset]

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => revealText(el, config),
    })
  })
}

// For scroll-hijacked (pinned) sections — trigger on section enter
export function bindSectionTextReveal(
  sectionEl: HTMLElement,
  textEls: HTMLElement[],
  preset: keyof typeof textRevealPresets = 'lineRise'
) {
  const config = textRevealPresets[preset]
  const tl = gsap.timeline({ paused: true })

  textEls.forEach((el, i) => {
    tl.add(() => revealText(el, { ...config, delay: i * 0.15 }), i * 0.1)
  })

  ScrollTrigger.create({
    trigger: sectionEl,
    start: 'top center',
    once: true,
    onEnter: () => tl.play(),
  })
}
