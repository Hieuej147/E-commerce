"use client";

import { useState, type FormEvent } from "react";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full px-4 lg:px-8 py-16 bg-surface-container border-t border-outline">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-surface-container-lowest border border-outline p-6 md:p-10 shadow-hard-md clip-chamfer-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs font-bold mb-2">
                <span className="w-2 h-2 bg-secondary-container border border-primary inline-block" />
                <span>RESTOCK TRANSMISSION DISPATCH</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-primary">
                SUBSCRIBE FOR RESTOCK NOTIFICATIONS
              </h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant mt-2 max-w-xl leading-relaxed">
                Receive direct release alerts when limited capsule batches and technical drops arrive at the store depot. No spam, purely actionable drop windows.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative grow">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline font-mono text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-0"
                    placeholder="Enter your email address..."
                    required
                    type="email"
                  />
                </div>
                <button
                  className="px-5 py-2.5 bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary-container shadow-hard-sm transition-all whitespace-nowrap"
                  type="submit"
                >
                  JOIN DIRECTIVE
                </button>
              </form>

              {submitted && (
                <div className="mt-3 text-secondary font-mono text-xs font-bold animate-fadeIn">
                  &gt; TRANSMISSION REGISTERED. NOTIFICATION CHANNELS ARMED.
                </div>
              )}

              <div className="mt-3 font-mono text-[10px] text-outline flex items-center justify-between">
                <span>FREQUENCY: 1-2 UPDATES / MONTH</span>
                <span>UNSUBSCRIBE ANYTIME</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
