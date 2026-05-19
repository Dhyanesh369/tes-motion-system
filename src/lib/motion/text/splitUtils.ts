export type SplitMode = 'lines' | 'words' | 'chars' | 'lines,words' | 'words,chars'
export type RevealEase = 'power2.out' | 'power3.out' | 'power4.out' | 'expo.out' | 'back.out(1.4)'

export interface SplitRevealConfig {
  mode: SplitMode
  duration?: number          // default 0.9
  stagger?: number           // default 0.06
  delay?: number             // default 0
  ease?: RevealEase          // default 'power3.out'
  yOffset?: number           // default 60 — translate distance in px
  rotateX?: number           // default 0 — adds 3D tilt on chars
  opacity?: boolean          // default true
  overflowHidden?: boolean   // default true — wraps lines in overflow:hidden mask
  onComplete?: () => void
}

export const splitDefaults: Required<Omit<SplitRevealConfig,'onComplete'|'mode'>> = {
  duration: 0.9,
  stagger: 0.06,
  delay: 0,
  ease: 'power3.out',
  yOffset: 60,
  rotateX: 0,
  opacity: true,
  overflowHidden: true,
}
