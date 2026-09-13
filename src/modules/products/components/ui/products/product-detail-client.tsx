"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductInteraction } from "./product-interaction";
import { formatVnd } from "@/lib/formatters/currency";
import { useProduct } from "@/features/products/queries/products.queries";
import { Star, ArrowLeft } from "lucide-react";

export function ProductDetailClient({ id }: { id: string }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "shipping" | "reviews">("desc");

  const productQuery = useProduct(id);

  if (productQuery.isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="border border-outline bg-surface-container p-8 animate-pulse text-center font-mono text-xs text-primary">
          &gt; CALIBRATING_FIELD_SPEC_TELEMETRY...
        </div>
      </div>
    );
  }

  if (productQuery.isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="border border-error bg-error-container/20 p-8 text-center shadow-hard-sm">
          <p className="font-mono font-bold text-xs uppercase text-error">
            [ ALERT: PRODUCT_MANIFEST_UNAVAILABLE ]
          </p>
          <p className="font-sans text-xs text-on-surface-variant mt-2">
            {productQuery.error instanceof Error
              ? productQuery.error.message
              : "Unable to retrieve equipment telemetry from depot."}
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block border border-primary bg-primary text-on-primary font-mono text-xs uppercase px-4 py-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all"
          >
            [ RETURN TO CATALOG ]
          </Link>
        </div>
      </div>
    );
  }

  const product = productQuery.data;
  const colors = product.colors?.length ? product.colors : ["#000000"];
  const currentColor = selectedColor || colors[0] || "";
  const imagesMap = (product.images as Record<string, string>) || {};
  const activeImage =
    imagesMap[currentColor] ||
    Object.values(imagesMap)[0] ||
    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200";

  const imageEntries = Object.entries(imagesMap);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Breadcrumb & Status Strip */}
      <section className="w-full bg-surface-container-lowest border-b border-outline px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <Link href="/" className="hover:text-primary hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> HQ
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary hover:underline">
              CATALOG
            </Link>
            <span>/</span>
            <span className="text-primary font-bold uppercase">{product.name}</span>
            <span className="text-outline hidden sm:inline">
              SKU: {product.sku || product.id.slice(0, 8).toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-secondary font-bold">
              <span className="w-2 h-2 bg-secondary-container border border-primary inline-block" />
              STATUS: READY FOR DISPATCH
            </span>
            <span className="text-outline hidden md:inline">MIL-STD-810H CERTIFIED</span>
          </div>
        </div>
      </section>

      {/* 2. Main Product Workspace: 12-Column Industrial Dual Tray */}
      <section className="w-full px-4 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Technical Viewer & Imagery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Image Frame with Chamfers and Crosshair Matrix */}
            <div className="relative bg-surface-container-lowest border border-outline p-3 shadow-hard-md clip-chamfer-md">
              {/* Corner Bracket Registration Marks */}
              <div className="absolute top-2 left-2 font-mono text-[10px] text-outline select-none pointer-events-none z-10">
                + VIEW 01
              </div>
              <div className="absolute top-2 right-2 font-mono text-[10px] text-outline select-none pointer-events-none z-10">
                + 45° ISO
              </div>
              <div className="absolute bottom-2 left-2 font-mono text-[10px] text-outline select-none pointer-events-none z-10">
                ZOOM READY
              </div>
              <div className="absolute bottom-2 right-2 font-mono text-[10px] text-outline select-none pointer-events-none z-10">
                FIELD SPEC
              </div>

              {/* Spec Pill Badge */}
              <div className="absolute top-6 left-6 z-20 bg-primary text-on-primary font-mono text-[10px] px-2 py-0.5 shadow-hard-sm">
                SPEC: {product.categorySlug ? product.categorySlug.toUpperCase() : "MIL_SPEC"}
              </div>

              {/* Image Viewport */}
              <div className="relative w-full aspect-square bg-surface-container overflow-hidden border border-outline">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />

                {/* Sub-strip watermark */}
                <div className="absolute bottom-2 right-2 bg-surface-container-lowest/90 border border-outline px-2 py-0.5 font-mono text-[9px] text-primary">
                  VERIFIED: HASH.{product.id.slice(0, 6)}
                </div>
              </div>
            </div>

            {/* Thumbnails Strip */}
            {imageEntries.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {imageEntries.map(([colorKey, imgUrl], idx) => (
                  <button
                    key={colorKey + idx}
                    type="button"
                    onClick={() => setSelectedColor(colorKey)}
                    className={`relative w-20 h-20 shrink-0 border overflow-hidden transition-all ${
                      currentColor === colorKey
                        ? "border-primary ring-2 ring-secondary-container shadow-hard-sm"
                        : "border-outline hover:border-primary opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} preview`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    <span className="absolute bottom-0 right-0 bg-primary text-on-primary font-mono text-[8px] px-1">
                      {colorKey.slice(0, 3).toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Field Testing Banner Strip */}
            <div className="bg-surface-container-low border border-outline p-3 flex items-center justify-between font-mono text-xs">
              <span className="text-primary font-bold">
                FIELD TESTING: METEOROLOGICAL VALIDATION
              </span>
              <span className="text-secondary font-bold">PASS: 100% RETENTION</span>
            </div>
          </div>

          {/* Right Column: Product Info & Action Tray (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-lowest border border-outline p-6 shadow-hard-md space-y-5">
              {/* Category Marker */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs bg-surface-container px-2 py-0.5 text-on-surface-variant font-bold uppercase">
                  {product.categorySlug ? product.categorySlug.toUpperCase() : "EQUIPMENT"}
                </span>
                <span className="font-mono text-xs text-secondary font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-secondary-container border border-primary inline-block" />
                  {product.stockQuantity > 0
                    ? `IN STOCK - ${product.stockQuantity} UNITS`
                    : "OUT OF STOCK"}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-primary leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 border-b border-surface-container-highest pb-3">
                <div className="flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="font-mono font-bold text-xs text-on-surface">4.9 / 5.0</span>
                <span className="text-outline font-mono text-xs">(48 Customer Reports)</span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-2">
                <span className="font-sans font-bold text-3xl text-primary tracking-tight">
                  {formatVnd(product.price.amountMinor)}
                </span>
                <span className="font-mono text-xs text-outline uppercase ml-auto">
                  [ TAX INCL. - VAT 8% ]
                </span>
              </div>

              {/* Description summary */}
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {product.description ||
                  "Advanced multi-climate protective garment engineered with technical articulated patterning and weather-sealed seams."}
              </p>

              {/* Product Interaction (Swatches, Sizes, Stepper, Actions) */}
              <ProductInteraction
                product={product}
                selectedColor={currentColor}
                onColorChange={setSelectedColor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specifications & Information Tabbed Accordion Tray */}
      <section className="w-full px-4 lg:px-8 py-8 max-w-7xl mx-auto" id="specs">
        <div className="w-full bg-surface-container-lowest border border-outline shadow-hard-md">
          {/* Tab Header Strip */}
          <div className="flex flex-wrap border-b border-outline bg-surface-container-low font-mono text-xs font-bold uppercase">
            <button
              type="button"
              onClick={() => setActiveTab("desc")}
              className={`px-5 py-3 border-r border-outline transition-all ${
                activeTab === "desc"
                  ? "bg-surface-container-lowest text-primary border-t-2 border-t-primary"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
              }`}
            >
              [ 01. Overview ]
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`px-5 py-3 border-r border-outline transition-all ${
                activeTab === "specs"
                  ? "bg-surface-container-lowest text-primary border-t-2 border-t-primary"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
              }`}
            >
              [ 02. Materials &amp; Specs ]
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`px-5 py-3 border-r border-outline transition-all ${
                activeTab === "shipping"
                  ? "bg-surface-container-lowest text-primary border-t-2 border-t-primary"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
              }`}
            >
              [ 03. Shipping &amp; Delivery ]
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`px-5 py-3 transition-all ${
                activeTab === "reviews"
                  ? "bg-surface-container-lowest text-primary border-t-2 border-t-primary"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
              }`}
            >
              [ 04. Customer Reviews (48) ]
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === "desc" && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-display text-xl md:text-2xl uppercase text-primary">
                  Engineered Barrier for Environmental Volatility
                </h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  <div className="border border-outline p-3 bg-surface-container-low">
                    <span className="block font-mono text-[10px] text-outline uppercase">WEATHER RATING</span>
                    <span className="font-mono text-xs font-bold text-primary">STORM-GRADE PROOF</span>
                  </div>
                  <div className="border border-outline p-3 bg-surface-container-low">
                    <span className="block font-mono text-[10px] text-outline uppercase">ZIPPER SYSTEM</span>
                    <span className="font-mono text-xs font-bold text-primary">YKK AQUAGUARD</span>
                  </div>
                  <div className="border border-outline p-3 bg-surface-container-low">
                    <span className="block font-mono text-[10px] text-outline uppercase">SEAM INTEGRITY</span>
                    <span className="font-mono text-xs font-bold text-primary">100% TAPED HEAT SEAL</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-4 max-w-3xl font-mono text-xs">
                <h3 className="font-display text-xl uppercase text-primary font-sans">
                  TECHNICAL SPECIFICATION MATRIX
                </h3>
                <div className="border border-outline overflow-hidden">
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-outline bg-surface-container-low">
                        <td className="p-3 text-outline uppercase w-1/3">Fabric Shell</td>
                        <td className="p-3 text-primary font-bold">Cordura 1000D Ballistic Nylon / 3-Ply Graphene Membrane</td>
                      </tr>
                      <tr className="border-b border-outline">
                        <td className="p-3 text-outline uppercase">Breathability</td>
                        <td className="p-3 text-primary font-bold">25,000 g/m²/24h Reticle Permeability</td>
                      </tr>
                      <tr className="border-b border-outline bg-surface-container-low">
                        <td className="p-3 text-outline uppercase">Water Column</td>
                        <td className="p-3 text-primary font-bold">30,000 mm Hydrostatic Head</td>
                      </tr>
                      <tr className="border-b border-outline">
                        <td className="p-3 text-outline uppercase">Hardware</td>
                        <td className="p-3 text-primary font-bold">Fidlock V-Buckle &amp; Matte Anodized Aluminum Pulls</td>
                      </tr>
                      <tr className="bg-surface-container-low">
                        <td className="p-3 text-outline uppercase">Care Protocol</td>
                        <td className="p-3 text-primary font-bold">Cold wash 30°C delicate. Drip dry in shade. Do not iron membrane.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-display text-xl uppercase text-primary">
                  LOGISTICS DISPATCH TIMELINE
                </h3>
                <p className="font-sans text-sm text-on-surface-variant">
                  All orders are dispatched from our Central Logistics Depot in Ho Chi Minh City within 24 hours of verification.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                  <div className="border border-outline p-4 bg-surface-container-low">
                    <span className="text-secondary font-bold">Express Metro Delivery</span>
                    <p className="text-primary font-bold text-sm mt-1">24 - 48 Hours</p>
                    <p className="text-on-surface-variant text-[11px] mt-1">Hanoi, Da Nang, HCMC metropolitan areas.</p>
                  </div>
                  <div className="border border-outline p-4 bg-surface-container-low">
                    <span className="text-secondary font-bold">Standard Provincial Delivery</span>
                    <p className="text-primary font-bold text-sm mt-1">2 - 4 Business Days</p>
                    <p className="text-on-surface-variant text-[11px] mt-1">Tracking telemetry provided via encrypted SMS/Email.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center justify-between border-b border-outline pb-3">
                  <h3 className="font-display text-xl uppercase text-primary">
                    CUSTOMER REVIEWS &amp; FIELD REPORTS
                  </h3>
                  <span className="font-mono text-xs bg-secondary-container text-on-secondary-container px-2 py-0.5 font-bold">
                    VERIFIED BUYERS ONLY
                  </span>
                </div>
                <div className="space-y-4 font-sans text-xs">
                  <div className="border border-outline p-4 bg-surface-container-lowest">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-primary">Verified Buyer A.</span>
                      <span className="font-mono text-outline text-[10px]">3 WEEKS AGO</span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed">
                      Survived heavy monsoon conditions without a drop penetrating the collar or zips. The magnetic buckle is crisp and functional with one hand while riding.
                    </p>
                  </div>
                  <div className="border border-outline p-4 bg-surface-container-lowest">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-primary">Verified Buyer K.</span>
                      <span className="font-mono text-outline text-[10px]">1 MONTH AGO</span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed">
                      Incredible fabric handfeel and structural silhouette. The cut allows full shoulder mobility without bunching up. Highly recommended.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
