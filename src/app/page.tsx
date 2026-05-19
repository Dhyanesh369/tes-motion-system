"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  TextReveal,
  RevealDisplay,
  RevealBody,
  RevealLabel,
  gradientSweep,
  textRevealPresets,
} from "../lib/motion";

export default function Home() {
  const [key, setKey] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState("lineRise");
  const shimmerRef = useRef<HTMLSpanElement>(null);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  const triggerShimmer = () => {
    if (shimmerRef.current) {
      gradientSweep(shimmerRef.current, {
        from: "#ffffff",
        sweep: "#F59E0B", // Golden-orange sweep
        duration: 1.4,
      });
    }
  };

  useEffect(() => {
    triggerShimmer();
  }, [key]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans select-none overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none z-0 h-[600px]" />

      <header className="relative w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center z-10 border-b border-white/5 backdrop-blur-md bg-neutral-950/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono tracking-widest text-xs text-neutral-400 uppercase">
            TES-OS // MOTION
          </span>
        </div>
        <div className="text-xs text-neutral-500 font-mono">v1.2.0-stable</div>
      </header>

      <main className="relative flex-1 w-full max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16 z-10">
        {/* Hero Section */}
        <section className="flex flex-col gap-6 max-w-3xl">
          <RevealLabel className="text-amber-500 font-mono text-xs uppercase tracking-widest">
            Production-Grade Text Motion System
          </RevealLabel>
          
          <RevealDisplay className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
            TES MOTION TEXT
          </RevealDisplay>

          <RevealBody className="text-neutral-400 text-lg md:text-xl leading-relaxed font-light" delay={0.25}>
            An editorial-grade layout engine enabling split-by-line, split-by-word, and split-by-character animations. Combines hardware-accelerated 3D tilts, soft masks, and gold sweeps.
          </RevealBody>
        </section>

        {/* Live Controller / Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preset Selector Panel */}
          <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-4">
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Select Preset
            </h3>
            <div className="flex flex-col gap-2">
              {Object.keys(textRevealPresets).map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setSelectedPreset(preset);
                    handleReplay();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm font-mono flex justify-between items-center ${
                    selectedPreset === preset
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                      : "bg-white/5 border-transparent text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{preset}</span>
                  <span className="text-[10px] text-neutral-500 uppercase">
                    {textRevealPresets[preset].mode}
                  </span>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleReplay}
              className="mt-4 w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold py-3 rounded-xl transition-all duration-200 text-sm shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-[0.98]"
            >
              Replay Animation
            </button>
          </div>

          {/* Canvas Preview Panel */}
          <div className="lg:col-span-2 min-h-[350px] bg-neutral-950 border border-white/5 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-mono text-neutral-600">
              PREVIEW CANVAS
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono text-neutral-600">
              EASE: {textRevealPresets[selectedPreset]?.ease}
            </div>

            {/* Target Text Wrapper */}
            <div key={key} className="max-w-xl mx-auto w-full text-center">
              <TextReveal
                preset={selectedPreset as keyof typeof textRevealPresets}
                className="text-3xl md:text-5xl font-semibold leading-snug tracking-tight text-white"
              >
                {selectedPreset === "lineRise" && "Architectural harmony meets museum-grade precision in design."}
                {selectedPreset === "wordCascade" && "We refine every element down to its essential structure."}
                {selectedPreset === "charTumble" && "ROTATE AND TILT IN THREE DIMENSIONS"}
                {selectedPreset === "fadeWords" && "Soft, cinematic, copy transitions designed for deep readability."}
                {selectedPreset === "snapLines" && "BRUTALIST SNAP ALIGNMENT SYSTEM"}
                {selectedPreset === "charDrift" && "micro-interaction character drifting labels"}
              </TextReveal>
            </div>
          </div>
        </section>

        {/* Shimmer Sweep Section */}
        <section className="bg-neutral-900/30 border border-white/5 rounded-2xl p-8 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-amber-500 font-mono text-xs uppercase tracking-widest">
              FEATURED UTILITY
            </span>
            <h3 className="text-2xl font-semibold text-white">
              <span ref={shimmerRef} className="transition-all duration-300">
                Gold Shimmer Gradient Sweep
              </span>
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Dynamically animates a linear-gradient shimmer effect across any text heading, then automatically cleans up background-clip overhead when finished.
            </p>
          </div>
          <button
            onClick={triggerShimmer}
            className="border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all font-mono text-sm active:scale-95 whitespace-nowrap"
          >
            Trigger Shimmer
          </button>
        </section>
      </main>

      <footer className="w-full border-t border-white/5 py-8 mt-16 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
          <div>TES-OS Front-End Motion Systems Library. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400">Documentation</a>
            <a href="#" className="hover:text-amber-400">Presets</a>
            <a href="#" className="hover:text-amber-400">GSAP Config</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
