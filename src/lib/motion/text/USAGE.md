## Text Reveal — Usage Reference

### React Component (recommended)
```tsx
import { RevealHeading, RevealBody, RevealDisplay, RevealLabel } from 'tes-motion-system'

// Heading — lines rise up (lineRise preset)
<RevealHeading className="section-title">
  Where Form Meets Function
</RevealHeading>

// Hero display — chars tumble in with rotateX
<RevealDisplay as="h1">
  FORMA Studio
</RevealDisplay>

// Body copy — words fade in softly
<RevealBody delay={0.3}>
  Furniture conceived with intention...
</RevealBody>

// Custom preset override
<TextReveal as="h3" preset="wordCascade" stagger={0.08} duration={1.1}>
  Autumn Collection 2026
</TextReveal>
```

### Hook (when you need ref control)
```tsx
const { ref } = useTextReveal({ preset: 'lineRise', threshold: 0.3 })
return <h2 ref={ref}>Your heading</h2>
```

### Direct function (GSAP scroll-hijack pages)
```ts
import { revealText, textRevealPresets } from 'tes-motion-system'
revealText(headingEl, textRevealPresets.charTumble)
```

### Gold shimmer on brand names
```ts
import { gradientSweep } from 'tes-motion-system'
gradientSweep(logoEl, { sweep: '#C9A84C', duration: 1.4, delay: 0.5 })
```

### HTML data attribute (no JS config needed)
```html
<h2 data-text-reveal="wordCascade">Section Title</h2>
<p  data-text-reveal="fadeWords">Body paragraph here.</p>
```
Then call once in your page init:
```ts
import { bindTextScrollTriggers } from 'tes-motion-system'
bindTextScrollTriggers()  // scans entire DOM automatically
```

## Preset → Use Case Map
| Preset      | Best For                         | Element      |
|-------------|----------------------------------|--------------|
| lineRise    | Section headings, editorial H2   | h2, h3       |
| wordCascade | Hero subheadings, Playfair       | h1, h2       |
| charTumble  | Brand name, Bebas Neue display   | h1, .display |
| fadeWords   | Body copy, Playfair italic       | p, blockquote|
| snapLines   | Brutalist / dark minimal sites   | h2, h3       |
| charDrift   | Labels, eyebrows, DM Sans caps   | span, p.label|
