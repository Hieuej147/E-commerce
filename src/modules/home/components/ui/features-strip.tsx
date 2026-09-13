import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export function FeaturesStrip() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Feature 01 */}
        <div className="bg-surface-container border border-outline p-5 flex flex-col justify-between hover:bg-surface-container-high transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-mono-bold text-xs text-secondary tracking-widest">01. LOGISTICS</span>
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-headline-sm text-base uppercase text-primary font-bold mb-1">Free Delivery</h3>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Complimentary insured standard dispatch on all domestic orders over 500,000 VND.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-surface-container-highest flex items-center justify-between font-code-comment text-[11px] text-outline">
            <span>TRACKING: INCLUDED</span>
            <span>SPEED: 24-48H</span>
          </div>
        </div>

        {/* Feature 02 */}
        <div className="bg-surface-container border border-outline p-5 flex flex-col justify-between hover:bg-surface-container-high transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-mono-bold text-xs text-secondary tracking-widest">02. ASSURANCE</span>
            <RotateCcw className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-headline-sm text-base uppercase text-primary font-bold mb-1">30-Day Returns</h3>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Hassle-free exchange policy. Exchange size, color, or modular hardware with zero friction.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-surface-container-highest flex items-center justify-between font-code-comment text-[11px] text-outline">
            <span>PORTAL: SELF-SERVE</span>
            <span>POLICY: 100% REFUND</span>
          </div>
        </div>

        {/* Feature 03 */}
        <div className="bg-surface-container border border-outline p-5 flex flex-col justify-between hover:bg-surface-container-high transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-mono-bold text-xs text-secondary tracking-widest">03. DURABILITY</span>
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-headline-sm text-base uppercase text-primary font-bold mb-1">Weatherproof</h3>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Lab-tested for storm defense, tear resistance, and optimal body climate regulation.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-surface-container-highest flex items-center justify-between font-code-comment text-[11px] text-outline">
            <span>GRADE: ALL-TERRAIN</span>
            <span>RATING: CERTIFIED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
