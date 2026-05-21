"use client";

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: any;
}

export function SmoothScrollProvider({ children, options = {} }: SmoothScrollProviderProps) {
  // Sync GSAP ScrollTrigger with Lenis
  useEffect(() => {
    // Note: ReactLenis internally handles RAF, but if we need strict GSAP sync:
    function update(time: number) {
      ScrollTrigger.update();
    }
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
        ...options,
      }}
    >
      {children}
    </ReactLenis>
  );
}
