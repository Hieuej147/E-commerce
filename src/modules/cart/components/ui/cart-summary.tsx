"use client";

import { useState } from "react";
import { formatVnd } from "@/lib/formatters/currency";

export function CartSummary({
  subtotal,
  total,
}: {
  subtotal: number;
  total: number;
}) {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hazard Stripe Mini Accent Bar */}
      <div className="w-full h-2 hazard-stripes border-y border-primary" />

      {/* Summary Matrix */}
      <div className="space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span>Items Subtotal:</span>
          <span className="font-bold text-on-surface">{formatVnd(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span>Shipping Fee:</span>
            <span className="bg-secondary-container text-on-secondary-container text-[9px] px-1 py-0.5 font-bold uppercase">
              Free Shipping
            </span>
          </div>
          <span className="font-bold text-on-surface">0 VND</span>
        </div>

        {/* Promo Code Input Field */}
        <form onSubmit={handleApplyPromo} className="pt-2 border-t border-surface-container-high">
          <label className="block text-[10px] text-outline uppercase mb-1">
            Promo code / Voucher:
          </label>
          <div className="flex gap-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="e.g. ENDFIELD-2026"
              className="grow bg-surface-container-lowest border border-outline px-2 py-1 text-xs font-mono uppercase text-primary placeholder:text-outline focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary px-3 py-1 font-mono text-xs font-bold uppercase hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
            >
              APPLY
            </button>
          </div>
          {promoApplied && (
            <p className="font-mono text-[10px] text-secondary font-bold mt-1">
              Promo code applied successfully.
            </p>
          )}
        </form>

        {/* Total Block */}
        <div className="pt-3 mt-3 border-t-2 border-primary flex items-end justify-between">
          <div>
            <span className="block font-sans font-bold text-base uppercase text-primary leading-none">
              Total Amount
            </span>
            <span className="font-mono text-[10px] text-outline">
              VAT included where applicable
            </span>
          </div>
          <div className="text-right">
            <span className="font-sans font-bold text-xl md:text-2xl text-primary tracking-tight leading-none">
              {formatVnd(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
