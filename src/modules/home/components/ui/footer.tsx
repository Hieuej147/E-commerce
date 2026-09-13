import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm uppercase tracking-tight text-primary font-bold">
                  FIELD PROTOCOL
                </span>
                <span className="bg-secondary-container text-on-secondary-container font-code-comment text-[10px] px-1.5 py-0.5 uppercase font-bold">
                  STORE
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant max-w-sm">
                High-performance engineered tactical wear and modular hardware systems designed for volatile metropolitan environments and rapid deployment field operations.
              </p>
            </div>
            <div className="flex items-center gap-2 font-code-comment text-xs text-on-surface">
              <span className="border border-outline px-2 py-1 bg-surface-container-lowest">
                CURRENCY: [ VND ]
              </span>
              <span className="border border-outline px-2 py-1 bg-surface-container-lowest">
                LATENCY: 12MS
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-label-mono-bold text-xs uppercase tracking-wider text-primary mb-3">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-1 font-body-sm">
              <li className="text-on-surface-variant hover:text-primary transition-colors">
                <Link href="/orders">Order Status & Tracking</Link>
              </li>
              <li className="text-on-surface-variant hover:text-primary transition-colors">
                <Link href="/products">Product Catalog</Link>
              </li>
              <li className="text-on-surface-variant hover:text-primary transition-colors">
                <Link href="/cart">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-mono-bold text-xs uppercase tracking-wider text-primary mb-3">
              CATEGORIES
            </h4>
            <ul className="space-y-1 font-body-sm">
              <li className="text-on-surface-variant hover:text-primary transition-colors">
                <Link href="/products">All Collections</Link>
              </li>
              <li className="text-on-surface-variant hover:text-primary transition-colors">
                <Link href="/products?category=outerwear">Weatherproof Shells</Link>
              </li>
              <li className="text-on-surface-variant hover:text-primary transition-colors">
                <Link href="/products?category=pants">Articulated Pants</Link>
              </li>
              <li className="text-on-surface-variant hover:text-primary transition-colors">
                <Link href="/products?category=accessories">Modular Bags & Gear</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-mono-bold text-xs uppercase tracking-wider text-primary mb-3">
              SPEC &amp; COMPLIANCE
            </h4>
            <ul className="space-y-1.5 font-code-comment text-xs text-on-surface-variant">
              <li>[✓] ISO 9001 Certified</li>
              <li>[✓] MIL-STD-810H Tested</li>
              <li>[✓] Graphene Nano-Weave</li>
              <li>[✓] 100% Weather Seam Tape</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-outline flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-code-comment text-xs text-outline">
          <div className="flex items-center gap-2">
            <span>© 2026 FIELD PROTOCOL. ALL RIGHTS RESERVED.</span>
            <span>[SYS_SPEC: MIL-STD-810H]</span>
          </div>
          <div className="flex items-center gap-4">
            <span>STATUS: OPERATIONAL_READY</span>
            <span>REGION: SE-ASIA (VN)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
