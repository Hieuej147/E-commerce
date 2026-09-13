import Image from "next/image";

export function MaterialSpecsSection() {
  return (
    <section className="w-full px-4 lg:px-8 py-16 bg-surface-container-low border-t border-outline">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-outline pb-2 mb-8 font-mono text-xs text-on-surface-variant">
          <span className="font-bold text-primary">MATERIAL SCIENCE DIVISION</span>
          <span>LAB REF: FIELD-POLYMER-2026</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Technical Diagram & Innovation Stack */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 self-start px-2 py-0.5 bg-surface-container text-on-surface border border-outline">
              <span className="font-mono text-xs font-bold">R&amp;D REPORT: SPECIFICATION MATRIX</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-primary">
              ENGINEERED MULTI-LAYER BARRIER
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Every garment from Field Protocol undergoes extreme meteorological simulation. We partner with advanced textile laboratories to deliver maximum abrasion durability without compromising mobility.
            </p>

            {/* 3-Tier Layer Breakdown Plate */}
            <div className="space-y-3 pt-2">
              {/* Layer 1 */}
              <div className="bg-surface-container-lowest border border-outline p-4 flex items-start gap-4">
                <div className="bg-primary text-on-primary font-display text-lg w-10 h-10 flex items-center justify-center shrink-0">
                  01
                </div>
                <div className="grow">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="font-sans font-bold text-sm uppercase text-primary tracking-wide">
                      Cordura 1000D Ballistic Nylon
                    </h4>
                    <span className="font-mono text-xs text-secondary font-bold">OUTER SHIELD</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">
                    High-tenacity filament nylon engineered to withstand intense friction, concrete scuffs, and exterior weather debris.
                  </p>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="bg-surface-container-lowest border border-outline p-4 flex items-start gap-4">
                <div className="bg-secondary-container text-on-secondary-container font-display text-lg w-10 h-10 flex items-center justify-center shrink-0 border border-primary">
                  02
                </div>
                <div className="grow">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="font-sans font-bold text-sm uppercase text-primary tracking-wide">
                      Graphene Polymer Membrane
                    </h4>
                    <span className="font-mono text-xs text-secondary font-bold">ACTIVE THERMAL</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">
                    Micro-porous layer that regulates core body temperature, vents internal perspiration, and repels 100% of liquid penetration.
                  </p>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="bg-surface-container-lowest border border-outline p-4 flex items-start gap-4">
                <div className="bg-surface-container text-primary font-display text-lg w-10 h-10 flex items-center justify-center shrink-0 border border-outline">
                  03
                </div>
                <div className="grow">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="font-sans font-bold text-sm uppercase text-primary tracking-wide">
                      DWR Durable Water Repellent
                    </h4>
                    <span className="font-mono text-xs text-secondary font-bold">HYDROPHOBIC</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">
                    Eco-conscious fluorocarbon-free surface treatment ensuring rainfall beads and rolls off instantaneously upon contact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Operator Badge & Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-surface-container border border-outline p-4 shadow-hard-md">
              {/* Badge Metadata Header */}
              <div className="flex items-center justify-between border-b border-surface-container-highest pb-2 mb-3 font-mono text-xs">
                <span className="text-primary font-bold">OPERATOR SPEC: PROTO-08</span>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 font-bold">VERIFIED</span>
              </div>

              {/* Operator Portrait Visual */}
              <div className="relative w-full aspect-square bg-surface-container-high overflow-hidden border border-outline">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeMwdPFbX5mVxRZVorGnCbjyzcx4duEMCczq6ebj0JgcwKpRJ1Cqrr1WPSn5EIP1MRmPtOday_uVKcrVKqLnYTaOTiXi30Qf33_ajphj5o5HB-ZWK2E8oZ6qZbzQnGDzk7t9-DlkJ34k5oaqeqSmzYSk8eCw-QGDCYMc1_rQX2T-dNQRIbFuh1q6hjCujg-aCQrQE8Qc5rnlEZ0nLkpokIleLsw6JMLwLEZWhIxGeRNmXH-FMa9B8o"
                  alt="Anime heroine operator wearing tactical high-collar techwear jacket"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  unoptimized
                />
                {/* Reticle Corner Elements */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary pointer-events-none" />

                {/* Vertical Decorative Label */}
                <div className="absolute right-2 top-8 [writing-mode:vertical-rl] font-mono text-[10px] text-primary bg-surface-container-lowest/90 px-1 py-2 font-bold tracking-widest uppercase select-none border border-outline">
                  MIL-SPEC GRADE A
                </div>
              </div>

              {/* Diagnostics Data Bar */}
              <div className="mt-3 bg-surface-container-lowest p-2 border border-surface-container-highest flex items-center justify-between font-mono text-xs text-on-surface">
                <span>TENSILE STRENGTH: 980 MPA</span>
                <span className="text-secondary font-bold">STATUS: READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
