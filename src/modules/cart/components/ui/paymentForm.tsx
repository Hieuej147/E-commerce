"use client";

import { CreditCard, ShieldCheck, Lock } from "lucide-react";
import { formatVnd } from "@/lib/formatters/currency";

const PaymentForm = ({
  total,
  isPending,
  error,
  onPay,
}: {
  total: number;
  isPending: boolean;
  error?: string;
  onPay: () => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-outline">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-secondary-container px-2 py-0.5 font-mono text-xs font-bold">
            02
          </span>
          <h2 className="font-sans font-bold text-base uppercase text-primary tracking-tight">
            Payment Method
          </h2>
        </div>
        <span className="font-mono text-xs text-outline">Step 2 of 2</span>
      </div>

      {/* Payment Selection Block */}
      <div className="space-y-3">
        {/* Selected Option: Stripe Card Payment */}
        <div className="border-2 border-primary p-4 bg-surface-container-low transition-all shadow-hard-sm">
          <div className="flex items-start gap-3">
            <input
              type="radio"
              id="payment_stripe"
              checked
              readOnly
              className="mt-1 accent-primary"
            />
            <div className="grow">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <label
                  htmlFor="payment_stripe"
                  className="font-mono font-bold text-xs uppercase text-primary cursor-pointer flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Stripe Encrypted Checkout (Cards / Apple Pay)
                </label>
                <div className="flex gap-1">
                  <span className="bg-primary text-on-primary text-[9px] font-mono px-1">VISA</span>
                  <span className="bg-primary text-on-primary text-[9px] font-mono px-1">MC</span>
                  <span className="bg-primary text-on-primary text-[9px] font-mono px-1">JCB</span>
                </div>
              </div>
              <p className="font-sans text-xs text-on-surface-variant">
                Direct handoff to Stripe&apos;s PCI-DSS compliant secure session. Zero card credentials are stored locally.
              </p>
            </div>
          </div>
        </div>

        {/* Informational VietQR note */}
        <div className="border border-outline p-4 bg-surface-container-lowest opacity-75">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-outline uppercase flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              VietQR / Domestic Bank Gateway
            </span>
            <span className="font-mono text-[10px] bg-surface-container px-1.5 py-0.5 text-on-surface-variant">
              INTEGRATED VIA STRIPE
            </span>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center gap-2 font-mono text-[10px] text-outline pt-1">
        <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
        <span>256-Bit SSL Encrypted Connection</span>
      </div>

      {/* Error readout */}
      {error && (
        <div className="border border-error bg-error-container/20 p-3 font-mono text-xs text-error">
          Payment error: {error}
        </div>
      )}

      {/* Execute Payment Button */}
      <button
        type="button"
        disabled={isPending}
        onClick={onPay}
        className={`w-full font-mono font-bold text-xs uppercase py-3.5 px-4 transition-all duration-300 shadow-hard-md clip-chamfer-sm flex items-center justify-center gap-2 ${
          isPending
            ? "bg-surface-container text-outline cursor-not-allowed"
            : "bg-primary hover:bg-secondary-container text-on-primary hover:text-on-secondary-container"
        }`}
      >
        {isPending ? (
          "Processing payment..."
        ) : (
          `Pay ${formatVnd(total)}`
        )}
      </button>
    </div>
  );
};

export default PaymentForm;
