import type { SplitRevealConfig } from './splitUtils'

export const textRevealPresets: Record<string, SplitRevealConfig> = {

  // 1. LINE RISE — lines slide up from below a mask (mont-fort style)
  lineRise: {
    mode: 'lines',
    duration: 0.9,
    stagger: 0.08,
    yOffset: 80,
    ease: 'power3.out',
    overflowHidden: true,
    opacity: true,
  },

  // 2. WORD CASCADE — words fall in staggered (editorial heading style)
  wordCascade: {
    mode: 'words',
    duration: 0.75,
    stagger: 0.05,
    yOffset: 48,
    ease: 'power4.out',
    overflowHidden: false,
    opacity: true,
  },

  // 3. CHAR TUMBLE — chars rotate in with 3D tilt (display type, Bebas)
  charTumble: {
    mode: 'chars',
    duration: 0.6,
    stagger: 0.03,
    yOffset: 40,
    rotateX: 90,
    ease: 'back.out(1.4)',
    overflowHidden: true,
    opacity: true,
  },

  // 4. FADE WORDS — soft word-by-word opacity (body copy, Playfair italic)
  fadeWords: {
    mode: 'words',
    duration: 0.6,
    stagger: 0.04,
    yOffset: 0,
    ease: 'power2.out',
    overflowHidden: false,
    opacity: true,
  },

  // 5. SNAP LINES — instant line snap with no opacity (brutal/editorial)
  snapLines: {
    mode: 'lines',
    duration: 0.5,
    stagger: 0.1,
    yOffset: 100,
    ease: 'expo.out',
    overflowHidden: true,
    opacity: false,
  },

  // 6. CHAR DRIFT — chars drift in from left (DM Sans UI labels)
  charDrift: {
    mode: 'chars',
    duration: 0.5,
    stagger: 0.02,
    yOffset: 20,
    ease: 'power3.out',
    overflowHidden: false,
    opacity: true,
  },
}
