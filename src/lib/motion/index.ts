import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

// ── TEXT REVEAL SYSTEM ──
export { revealText, killTextReveal } from './text/textReveal'
export { gradientSweep } from './text/gradientSweep'
export { textRevealPresets } from './text/textPresets'
export { useTextReveal } from './text/useTextReveal'
export { bindTextScrollTriggers, bindSectionTextReveal } from './text/textScrollReveal'
export type { SplitRevealConfig, SplitMode, RevealEase } from './text/splitUtils'

// ── REACT COMPONENTS ──
export {
  TextReveal,
  RevealHeading,
  RevealDisplay,
  RevealBody,
  RevealLabel,
} from '../../components/motion/TextReveal'
