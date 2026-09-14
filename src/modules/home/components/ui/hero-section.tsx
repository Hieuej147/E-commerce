"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full px-4 md:px-8 py-8 md:py-16 bg-surface overflow-hidden border-b border-outline">
      {/* Background Dot/Grid Motif */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#7e7576 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Breadcrumb & Telemetry Header */}
        <div className="flex items-center justify-between font-code-comment text-xs text-on-surface-variant border-b border-surface-container-highest pb-3">
          <div className="flex items-center gap-2 truncate text-[11px] sm:text-xs">
            <span className="text-primary font-bold">+</span>
            <span className="truncate">Store Catalog 2026</span>
            <span className="text-outline">/</span>
            <span className="text-primary font-bold truncate">All-Weather Collection</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-label-mono-bold text-xs text-outline shrink-0">
            <span>SPEC: ISO CORDURA 1000D</span>
            <span>&bull;</span>
            <span className="text-on-surface">STOCK: AVAILABLE</span>
            <span className="text-primary font-bold">+</span>
          </div>
        </div>

        {/* Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start gap-4">
            {/* Tactical Hazard Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary-container text-on-secondary-container shadow-hard-sm border border-primary">
              <Shield className="w-3.5 h-3.5" />
              <span className="font-label-mono-bold text-[11px] tracking-widest uppercase">
                FIELD TESTED UTILITY
              </span>
            </div>

            {/* Display Hero Headline */}
            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-primary leading-none font-bold">
              ALL-WEATHER<br />
              <span className="text-primary">UTILITY GEAR</span>
            </h1>

            {/* Subtitle */}
            <p className="font-headline-md text-xl md:text-2xl italic text-on-surface-variant max-w-xl font-normal">
              Engineered apparel built for endurance and daily movement in volatile climates.
            </p>
            <p className="font-body-md text-sm md:text-base text-outline max-w-lg">
              Modular weatherproof fabrics with reinforced seam sealing, ergonomic cut-lines, and integrated hardware hooks designed for rapid urban navigation.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-label-mono-bold text-xs tracking-wider uppercase shadow-hard-md hover:bg-secondary-container hover:text-on-secondary-container transition-all clip-chamfer-sm"
              >
                <ArrowRight className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                <span>SHOP COLLECTION</span>
              </Link>
              <Link
                href="#materials"
                className="inline-flex items-center justify-center px-5 py-3 bg-surface-container-lowest text-primary border border-outline hover:bg-surface-container font-label-mono-bold text-xs uppercase tracking-wider transition-colors shadow-hard-sm"
              >
                <span className="mr-2 font-code-comment">[ + ]</span>
                <span>EXPLORE SPECS</span>
              </Link>
            </div>

            {/* Telemetry Stats */}
            <div className="w-full grid grid-cols-3 gap-2 pt-6 border-t border-surface-container-highest">
              <div className="min-w-0">
                <div className="font-display-hero text-2xl sm:text-3xl text-primary leading-none">
                  30K
                </div>
                <div className="font-code-comment text-[9px] sm:text-[10px] text-outline uppercase mt-1 truncate">
                  WATERPROOF MM
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display-hero text-2xl sm:text-3xl text-primary leading-none">
                  480G
                </div>
                <div className="font-code-comment text-[9px] sm:text-[10px] text-outline uppercase mt-1 truncate">
                  AVG SHELL WEIGHT
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display-hero text-2xl sm:text-3xl text-secondary leading-none">
                  100%
                </div>
                <div className="font-code-comment text-[9px] sm:text-[10px] text-outline uppercase mt-1 truncate">
                  SEAM TAPED
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Viewport Terminal Card */}
          <div className="lg:col-span-6 relative mr-1.5 sm:mr-0">
            {/* Backdrop Hard Shadow Plate */}
            <div className="absolute inset-0 bg-primary translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 pointer-events-none clip-chamfer-lg" />

            <div className="relative bg-surface-container-lowest border border-outline p-3 clip-chamfer-lg">
              {/* Terminal Header */}
              <div className="flex items-center justify-between bg-surface-container px-3 py-1.5 border-b border-surface-container-highest mb-2">
                <div className="flex items-center gap-2 font-code-comment text-xs font-bold text-primary">
                  <span className="w-2 h-2 rounded-full bg-secondary-container border border-primary animate-pulse" />
                  <span>Featured: Weatherproof Outerwear</span>
                </div>
                <div className="font-code-comment text-[10px] text-outline">
                  Live Look
                </div>
              </div>

              {/* Viewport Image Area */}
              <div className="relative w-full aspect-[4/3] bg-surface-container-high overflow-hidden border border-outline">
                <Image
                  src="/featured.png"
                  alt="Field Protocol Technical Weatherwear"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                  className="object-cover object-center filter contrast-105"
                />

                {/* HUD Coordinates */}
                <div className="absolute top-2 left-2 text-primary font-code-comment text-[10px] font-bold bg-surface-container-lowest/80 px-1 border border-outline">
                  + [10.82, 106.63]
                </div>
                <div className="absolute top-2 right-2 text-primary font-code-comment text-[10px] font-bold bg-surface-container-lowest/80 px-1">
                  +
                </div>
                <div className="absolute bottom-2 left-2 text-primary font-code-comment text-[10px] font-bold bg-surface-container-lowest/80 px-1">
                  +
                </div>

                {/* Center Reticle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                  <svg className="text-primary stroke-current" fill="none" height="80" viewBox="0 0 96 96" width="80" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="48" cy="48" r="36" strokeDasharray="4 4" strokeWidth="1" />
                    <line strokeWidth="1.5" x1="48" x2="48" y1="2" y2="18" />
                    <line strokeWidth="1.5" x1="48" x2="48" y1="78" y2="94" />
                    <line strokeWidth="1.5" x1="2" x2="18" y1="48" y2="48" />
                    <line strokeWidth="1.5" x1="78" x2="94" y1="48" y2="48" />
                  </svg>
                </div>

                {/* Tag Badge */}
                <div className="absolute bottom-3 right-3 bg-secondary-container text-on-secondary-container px-2 sm:px-3 py-1 border border-primary shadow-hard-sm font-label-mono-bold text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1.5 max-w-[85%]">
                  <span className="w-1.5 h-1.5 shrink-0 bg-on-secondary-container" />
                  <span className="truncate">FEATURED: FIELD SHELL ALPHA</span>
                </div>
              </div>

              {/* Terminal Footer Specs */}
              <div className="mt-2 bg-surface-container px-3 py-2 border-t border-surface-container-highest flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 font-code-comment text-[10px] sm:text-[11px] text-on-surface">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">SPEC:</span>
                  <span>WATERPROOF 30,000MM</span>
                  <span className="text-outline">&bull;</span>
                  <span>GRAPHENE COATED</span>
                </div>
                <div className="flex items-center gap-2 text-outline">
                  <span>WEIGHT 480G</span>
                  <span>&bull;</span>
                  <span className="text-secondary font-bold">MIL-STD-810H</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
