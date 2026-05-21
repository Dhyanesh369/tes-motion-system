"use client";

import { useLenis } from '@studio-freight/react-lenis';
import { useEffect, useState } from 'react';

/**
 * useScroll
 * A hook to get the current scroll position and velocity from Lenis.
 */
export function useScroll() {
  const [scroll, setScroll] = useState({ scroll: 0, velocity: 0, progress: 0 });

  useLenis(({ scroll, velocity, progress }: any) => {
    setScroll({ scroll, velocity, progress });
  });

  return scroll;
}
