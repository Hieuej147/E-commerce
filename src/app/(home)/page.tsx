import { HeroSection } from "@/modules/home/components/ui/hero-section";
import { FeaturesStrip } from "@/modules/home/components/ui/features-strip";
import { MaterialSpecsSection } from "@/modules/home/components/ui/material-specs-section";
import { NewsletterSection } from "@/modules/home/components/ui/newsletter-section";
import { ProductsListClient } from "@/modules/products/components/ui/products/products-list-client";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Tactical Features Strip */}
      <FeaturesStrip />

      {/* 3. High-Detail Product Matrix */}
      <section className="w-full px-4 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-secondary font-bold mb-1">
            <span className="w-2 h-2 bg-secondary-container border border-primary inline-block" />
            <span>FEATURED COLLECTION</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-primary">
            ALL-WEATHER GEAR &amp; APPAREL
          </h2>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-2xl mt-1">
            Field-tested apparel and gear engineered to rigorous standards for demanding environmental conditions.
          </p>
        </div>

        <ProductsListClient category={category} />
      </section>

      {/* 4. 3-Tier Layer Material Specs Breakdown */}
      <MaterialSpecsSection />

      {/* 5. Restock Notification / Newsletter Bar */}
      <NewsletterSection />
    </div>
  );
}
