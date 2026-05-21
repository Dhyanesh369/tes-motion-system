"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  color?: string;
}

export const Reveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0.25, 
  duration = 0.6,
  color = "var(--primary, #ffffff)",
  className,
  ...props
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !slideRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Content reveal setup
    gsap.set(contentRef.current, { opacity: 0, y: 75 });
    
    // Slide cover animation
    tl.fromTo(
      slideRef.current,
      { left: 0, right: "100%" },
      { right: 0, duration: duration, ease: "power3.inOut", delay }
    )
    .to(
      slideRef.current,
      { left: "100%", duration: duration, ease: "power3.inOut" }
    )
    // Content animation
    .to(
      contentRef.current,
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      `-=${duration}`
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === ref.current) t.kill();
      });
    };
  }, [delay, duration]);

  return (
    <div 
      ref={ref} 
      style={{ position: "relative", width, overflow: "hidden" }} 
      className={className} 
      {...props}
    >
      <div ref={contentRef}>
        {children}
      </div>
      <div
        ref={slideRef}
        className="absolute bottom-1 top-1 z-20"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
