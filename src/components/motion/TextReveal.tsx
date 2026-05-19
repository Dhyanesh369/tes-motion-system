import React, { ElementType } from 'react'
import { useTextReveal } from '../../lib/motion/text/useTextReveal'
import type { SplitRevealConfig } from '../../lib/motion/text/splitUtils'
import { textRevealPresets } from '../../lib/motion/text/textPresets'

interface TextRevealProps extends Partial<SplitRevealConfig> {
  as?: ElementType              // default: 'p'
  preset?: keyof typeof textRevealPresets
  once?: boolean
  threshold?: number
  className?: string
  children: React.ReactNode;
}

export function TextReveal({
  as: Tag = 'p',
  preset = 'lineRise',
  once = true,
  threshold = 0.2,
  className,
  children,
  ...config
}: TextRevealProps) {
  const { ref } = useTextReveal({ preset, once, threshold, ...config })
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

// Convenience variants — pre-bound to correct preset + element
export const RevealHeading = (p: Omit<TextRevealProps,'preset'>) =>
  <TextReveal as="h2" preset="lineRise" {...p} />

export const RevealDisplay = (p: Omit<TextRevealProps,'preset'>) =>
  <TextReveal as="h1" preset="charTumble" {...p} />

export const RevealBody = (p: Omit<TextRevealProps,'preset'>) =>
  <TextReveal as="p" preset="fadeWords" {...p} />

export const RevealLabel = (p: Omit<TextRevealProps,'preset'>) =>
  <TextReveal as="span" preset="charDrift" {...p} />
