import gsap from 'gsap'
import { splitDefaults, type SplitRevealConfig } from './splitUtils'

interface SplitInstance {
  chars?: HTMLElement[] | null
  words?: HTMLElement[] | null
  lines?: HTMLElement[] | null
  revert: () => void
}

interface SplitterEngine {
  split: (el: HTMLElement, mode: string) => SplitInstance
  getUnits: (instance: SplitInstance, mode: string) => HTMLElement[]
  revert: (instance: SplitInstance) => void
}

// ── IMPORT STRATEGY (SplitText preferred, split-type fallback) ──
let Splitter: SplitterEngine

try {
  const { SplitText } = await import('gsap/SplitText')
  Splitter = {
    split: (el: HTMLElement, mode: string) => new SplitText(el, { type: mode }) as unknown as SplitInstance,
    getUnits: (instance: SplitInstance, mode: string) => {
      if (mode.includes('chars')) return (instance.chars || []) as HTMLElement[]
      if (mode.includes('words')) return (instance.words || []) as HTMLElement[]
      return (instance.lines || []) as HTMLElement[]
    },
    revert: (instance: SplitInstance) => instance.revert(),
  }
} catch {
  const SplitType = (await import('split-type')).default
  Splitter = {
    split: (el: HTMLElement, mode: string) => new SplitType(el, { types: mode as 'lines' | 'words' | 'chars' }) as unknown as SplitInstance,
    getUnits: (instance: SplitInstance, mode: string) => {
      if (mode.includes('chars')) return (instance.chars || []) as HTMLElement[]
      if (mode.includes('words')) return (instance.words || []) as HTMLElement[]
      return (instance.lines || []) as HTMLElement[]
    },
    revert: (instance: SplitInstance) => instance.revert(),
  }
}

// ── MASK WRAPPER (overflow hidden per line) ──
function wrapLinesInMask(lines: HTMLElement[]): HTMLElement[] {
  return lines.map(line => {
    const mask = document.createElement('div')
    mask.style.cssText = 'overflow:hidden;display:block;'
    line.parentNode!.insertBefore(mask, line)
    mask.appendChild(line)
    return mask
  })
}

// ── MAIN REVEAL FUNCTION ──
export async function revealText(
  el: HTMLElement,
  config: SplitRevealConfig
): Promise<gsap.core.Tween> {
  const cfg = { ...splitDefaults, ...config }

  // Prevent FOUC during split
  el.style.visibility = 'hidden'

  const split = Splitter.split(el, cfg.mode)
  const primaryMode = cfg.mode.split(',')[0]
  const units = Splitter.getUnits(split, primaryMode)

  // Apply overflow mask for line-based reveals
  let masks: HTMLElement[] = []
  if (cfg.overflowHidden && primaryMode === 'lines') {
    masks = wrapLinesInMask(units)
  }

  el.style.visibility = 'visible'

  const fromVars: gsap.TweenVars = {
    y: cfg.yOffset,
    ...(cfg.opacity && { opacity: 0 }),
    ...(cfg.rotateX !== 0 && { rotateX: cfg.rotateX, transformOrigin: '50% 100%' }),
  }

  const tween = gsap.from(units, {
    ...fromVars,
    duration: cfg.duration,
    ease: cfg.ease,
    stagger: cfg.stagger,
    delay: cfg.delay,
    onComplete: () => {
      // Remove masks first while they are still in the active DOM tree
      masks.forEach(mask => {
        const child = mask.firstChild as HTMLElement
        if (child && mask.parentNode) {
          mask.parentNode.insertBefore(child, mask)
        }
        mask.remove()
      })
      
      // Revert split — clean DOM
      Splitter.revert(split)
      cfg.onComplete?.()
    },
  })

  return tween
}

// ── KILL / RESET ──
export function killTextReveal(el: HTMLElement) {
  gsap.killTweensOf(el.querySelectorAll('*'))
}
