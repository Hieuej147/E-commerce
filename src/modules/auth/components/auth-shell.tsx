import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthShell({
  mode,
  children,
}: {
  mode: "sign-in" | "sign-up";
  children: React.ReactNode;
}) {
  const isSignIn = mode === "sign-in";

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-surface">
      <div className="grid min-h-screen w-full lg:grid-cols-12">
        {/* Left Column: Technical Terminal Identity (5 cols on lg) */}
        <section className="relative hidden min-h-screen overflow-hidden bg-[#151718] text-white p-10 xl:p-14 lg:col-span-5 lg:flex lg:flex-col lg:justify-between border-r border-outline select-none">
          {/* Subtle Blueprint Matrix Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Corner Reticle Marks */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-outline">
            + [SECURE AUTH GATEWAY]
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-outline">
            LAT: 10.77 • LNG: 106.69
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-outline">
            SYS_HASH: 0x889F_SECURE
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-outline">
            PROTOCOL: 01
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-secondary-container text-on-secondary-container flex items-center justify-center border border-primary shadow-hard-sm">
                <span className="font-display text-lg font-bold">FP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg uppercase tracking-tight text-white leading-none">
                  FIELD PROTOCOL
                </span>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-0.5">
                  Storefront
                </span>
              </div>
            </Link>
          </div>

          {/* Middle Operational Brief */}
          <div className="relative z-10 max-w-md my-auto py-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface-container-high/30 border border-outline/50 mb-4 font-mono text-xs text-secondary-container font-bold">
              <span className="w-2 h-2 bg-secondary-container inline-block" />
              <span>
                {isSignIn ? "SIGN IN" : "CREATE ACCOUNT"}
              </span>
            </div>

            <h1 className="font-display text-4xl xl:text-5xl uppercase tracking-tight text-white leading-tight">
              {isSignIn ? "WELCOME BACK" : "CREATE YOUR ACCOUNT"}
            </h1>

            <p className="mt-4 font-sans text-xs md:text-sm text-gray-400 leading-relaxed">
              {isSignIn
                ? "Sign in to access your saved orders, checkout faster, and track your gear shipments."
                : "Create an account to track shipments, save your delivery preferences, and access exclusive drops."}
            </p>

            {/* Diagnostics Telemetry Plate */}
            <div className="mt-8 border border-outline/60 bg-black/40 p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-gray-400 border-b border-outline/30 pb-1.5">
                <span>Encryption:</span>
                <span className="text-white font-bold">TLS 1.3 (256-Bit)</span>
              </div>
              <div className="flex items-center justify-between text-gray-400 border-b border-outline/30 pb-1.5">
                <span>Server Node:</span>
                <span className="text-secondary-container font-bold">HCM_DEPOT_04</span>
              </div>
              <div className="flex items-center justify-between text-gray-400 pt-0.5">
                <span>Access:</span>
                <span className="text-white font-bold">Customer Account</span>
              </div>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="relative z-10 pt-4 border-t border-outline/40 flex items-center justify-between font-mono text-[11px] text-gray-400">
            <span>&copy; 2026 FIELD PROTOCOL</span>
            <span className="text-secondary-container font-bold">SYSTEM ACTIVE</span>
          </div>
        </section>

        {/* Right Column: Interactive Auth Form (7 cols on lg) */}
        <section className="flex min-h-screen flex-col justify-center px-4 py-8 sm:px-10 sm:py-12 lg:col-span-7 lg:px-16 xl:px-24 bg-surface-container-lowest overflow-x-hidden">
          {/* Mobile Back / Brand Header */}
          <div className="mb-6 flex items-center justify-between lg:hidden border-b border-outline pb-3">
            <Link href="/" className="flex items-center gap-2 text-primary group">
              <div className="w-7 h-7 bg-primary text-white flex items-center justify-center font-display text-sm font-bold">
                FP
              </div>
              <span className="font-display text-sm uppercase">FIELD PROTOCOL</span>
            </Link>
            <Link
              href="/"
              className="font-mono text-xs text-outline hover:text-primary transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
          </div>

          <div className="mx-auto w-full max-w-md">
            {/* Header Telemetry */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs text-outline uppercase font-bold">
                  Account Access
                </span>
                <Link
                  href="/"
                  className="hidden lg:inline-flex items-center gap-1 font-mono text-xs text-outline hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
                </Link>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-primary">
                {isSignIn ? "SIGN IN" : "REGISTER"}
              </h2>

              <p className="font-sans text-xs text-on-surface-variant mt-1">
                {isSignIn
                  ? "Enter your credentials to access your account."
                  : "Fill in your information to start shopping."}
              </p>
            </div>

            {/* Form Slot (Clerk SignIn / SignUp) */}
            <div className="border border-outline bg-surface-container-lowest p-3 sm:p-6 md:p-8 shadow-hard-md clip-chamfer-sm overflow-hidden">
              {children}
            </div>

            {/* Bottom Meta Information */}
            <div className="mt-4 sm:mt-6 flex items-center justify-between font-mono text-[10px] text-outline">
              <span>Encrypted &amp; Secure</span>
              <span>PCI-DSS Compliant</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
