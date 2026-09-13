"use client";

export function MarqueeTicker() {
  return (
    <div className="w-full bg-primary text-on-primary py-1.5 px-4 md:px-8 flex items-center justify-between font-code-comment text-[11px] uppercase overflow-hidden select-none border-b border-outline">
      <div className="flex items-center gap-2 sm:gap-4 animate-pulse min-w-0">
        <span className="inline-block w-2 h-2 shrink-0 bg-secondary-container"></span>
        <span className="font-bold truncate text-[10px] sm:text-[11px]">
          SYSTEM ONLINE<span className="hidden sm:inline"> • STORE DEPOT</span>
        </span>
        <span className="hidden md:inline text-outline-variant">|</span>
        <span className="hidden md:inline">NATIONWIDE SHIPPING • 30-DAY RETURNS</span>
      </div>
      <div className="flex items-center gap-3 font-label-mono-bold text-[10px] sm:text-[11px] shrink-0">
        <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 font-bold">
          <span className="sm:hidden">[ ACTIVE ]</span>
          <span className="hidden sm:inline">[ NEW RELEASES: ACTIVE ]</span>
        </span>
        <span className="hidden lg:inline text-outline-variant">LOC: 10.8231° N, 106.6297° E</span>
      </div>
    </div>
  );
}
