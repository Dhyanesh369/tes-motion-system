import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { revealText } from './textReveal'
import { textRevealPresets } from './textPresets'
import type { SplitRevealConfig } from './splitUtils'

interface UseTextRevealOptions extends Partial<SplitRevealConfig> {
  preset?: keyof typeof textRevealPresets
  once?: boolean          // default: true — only reveal once
  threshold?: number      // default: 0.2
  scrollTrigger?: boolean // default: false — use ScrollTrigger instead of InView
}

export function useTextReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseTextRevealOptions = {}
) {
  const elRef = useRef<T>(null)
  const triggered = useRef(false)

  const { preset = 'lineRise', once = true, threshold = 0.2, ...overrides } = options
  const config: SplitRevealConfig = { ...textRevealPresets[preset], ...overrides }

  const { ref: inViewRef, inView } = useInView({ threshold, triggerOnce: once })

  // Merge refs
  const setRef = (el: T | null) => {
    ;(elRef as React.MutableRefObject<T | null>).current = el
    inViewRef(el)
  }

  useEffect(() => {
    if (!inView || !elRef.current) return
    if (once && triggered.current) return
    triggered.current = true
    revealText(elRef.current, config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return { ref: setRef, inView }
}
