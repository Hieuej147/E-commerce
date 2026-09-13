"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearCart } from "@/modules/cart/store/cart-slice";
import { selectCartHydrated, selectCartItems, selectCartSubtotal } from "@/modules/cart/store/cart-selectors";
import { CartItem } from "@/modules/cart/components/ui/cart-item";
import { CartSummary } from "@/modules/cart/components/ui/cart-summary";
import PaymentForm from "@/modules/cart/components/ui/paymentForm";
import ShippingForm, { type ShippingFormValues } from "@/modules/cart/components/ui/shippingForm";
import { useCreateOrder } from "@/features/orders/mutations/orders.mutations";
import { useCreateCheckoutSession } from "@/features/payments/mutations/payments.mutations";

const steps = [
  { id: 1, code: "01", title: "SHOPPING CART", shortTitle: "CART" },
  { id: 2, code: "02", title: "SHIPPING ADDRESS", shortTitle: "ADDRESS" },
  { id: 3, code: "03", title: "PAYMENT METHOD", shortTitle: "PAYMENT" },
];

function CartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const isCartHydrated = useAppSelector(selectCartHydrated);
  const subtotal = useAppSelector(selectCartSubtotal);
  const createOrderMutation = useCreateOrder();
  const checkoutMutation = useCreateCheckoutSession();
  const [shippingForm, setShippingForm] = useState<ShippingFormValues | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const orderIdempotencyKey = useRef(crypto.randomUUID());
  const checkoutIdempotencyKey = useRef(crypto.randomUUID());
  const requestedStep = Number(searchParams.get("step") ?? "1");
  const activeStep = Number.isInteger(requestedStep) && requestedStep >= 1 && requestedStep <= 3 ? requestedStep : 1;
  const total = subtotal;

  const handlePay = async () => {
    if (!shippingForm || cartItems.length === 0) return;

    const orderItems = cartItems.reduce<{ productId: string; quantity: number }[]>(
      (items, item) => {
        const existingItem = items.find((orderItem) => orderItem.productId === item.id);

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          items.push({ productId: item.id, quantity: item.quantity });
        }

        return items;
      },
      [],
    );

    try {
      const order = orderId
        ? { id: orderId }
        : await createOrderMutation.mutateAsync({
            items: orderItems,
            shippingAddress: shippingForm,
            idempotencyKey: orderIdempotencyKey.current,
          });
      if (!orderId) setOrderId(order.id);
      const checkout = await checkoutMutation.mutateAsync({
        orderId: order.id,
        successUrl: `${window.location.origin}/payment/success?orderId=${order.id}`,
        cancelUrl: `${window.location.origin}/payment/cancel?orderId=${order.id}`,
        idempotencyKey: checkoutIdempotencyKey.current,
      });
      if (!checkout.checkoutUrl) throw new Error("Checkout URL was not returned");
      dispatch(clearCart());
      window.location.assign(checkout.checkoutUrl);
    } catch {
      // The payment form renders the mutation error and keeps the cart intact.
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn && activeStep > 1) {
      void redirectToSignIn({ redirectUrl: "/cart?step=" + activeStep });
    }
  }, [activeStep, isLoaded, isSignedIn, redirectToSignIn]);

  const goToStep = (step: number) => {
    if (step > 1 && !isLoaded) {
      return;
    }

    if (step > 1 && !isSignedIn) {
      void redirectToSignIn({ redirectUrl: "/cart?step=" + step });
      return;
    }

    router.push("/cart?step=" + step, { scroll: false });
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Metric Sub-Bar */}
      <div className="w-full bg-surface-container-lowest border-b border-outline px-4 lg:px-8 py-2.5 flex flex-wrap items-center justify-between font-mono text-xs text-on-surface">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="inline-block w-3.5 h-3.5 bg-primary text-secondary-container text-center font-bold mr-1.5 leading-none">
              ■
            </span>
            <span className="font-bold text-primary tracking-wider">CHECKOUT</span>
          </div>
          <span className="text-outline hidden sm:inline">
            Secure Connection
          </span>
        </div>
        <div className="flex items-center gap-4 text-outline text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-secondary-container border border-primary inline-block" />
            SSL ENCRYPTED
          </span>
          <span className="hidden md:inline">PCI-DSS COMPLIANT</span>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Stepper Navigation Bar */}
        <div className="bg-surface-container-lowest border border-outline p-2 shadow-hard-sm">
          <div className="grid grid-cols-3 gap-2 font-mono text-xs uppercase">
            {steps.map((step) => {
              const isActive = step.id === activeStep;
              const isPassed = step.id < activeStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (isPassed || (step.id === 2 && cartItems.length > 0)) {
                      goToStep(step.id);
                    }
                  }}
                  disabled={!isPassed && step.id !== activeStep && (step.id === 3 && !shippingForm)}
                  className={`p-2.5 text-left flex flex-col justify-between border transition-all ${
                    isActive
                      ? "bg-secondary-container text-on-secondary-container border-primary shadow-hard-sm"
                      : isPassed
                        ? "bg-surface-container-low border-outline text-primary hover:bg-surface-container cursor-pointer"
                        : "bg-surface-container-lowest border-outline text-outline opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span>STEP {step.code}</span>
                    {isActive && <span>&bull;</span>}
                    {isPassed && <span>&check;</span>}
                  </div>
                  <span className="font-bold tracking-wider mt-1 text-[11px] truncate">
                    <span className="sm:hidden">{step.shortTitle}</span>
                    <span className="hidden sm:inline">{step.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Form / Steps */}
          <section className="lg:col-span-7 bg-surface-container-lowest border border-outline p-4 sm:p-6 shadow-hard-md min-h-96">
            {!isCartHydrated ? (
              <div className="flex min-h-72 items-center justify-center font-mono text-xs text-outline animate-pulse">
                Loading cart items...
              </div>
            ) : activeStep === 1 && (
              cartItems.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-outline">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary text-secondary-container px-2 py-0.5 font-mono text-xs font-bold">
                        {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                      </span>
                      <h2 className="font-sans font-bold text-base uppercase text-primary">
                        Your Cart
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-outline">In Stock</span>
                  </div>

                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id + item.selectedSize + item.selectedColor}
                        item={item}
                      />
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-outline">
                    <Link
                      href="/products"
                      className="font-mono text-xs text-outline hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-72 flex-col items-center justify-center gap-4 text-center p-8">
                  <ShoppingBag className="h-10 w-10 text-outline stroke-1" />
                  <p className="font-mono text-xs text-outline uppercase">
                    Your cart is currently empty
                  </p>
                  <p className="font-sans text-xs text-on-surface-variant max-w-sm">
                    You haven&apos;t added any items to your shopping cart yet.
                  </p>
                  <Link
                    href="/products"
                    className="border border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase px-5 py-2.5 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
                  >
                    Browse Products
                  </Link>
                </div>
              )
            )}

            {activeStep === 2 && (
              <ShippingForm
                onContinue={(data) => {
                  setShippingForm(data);
                  setOrderId(null);
                  orderIdempotencyKey.current = crypto.randomUUID();
                  checkoutIdempotencyKey.current = crypto.randomUUID();
                  goToStep(3);
                }}
              />
            )}

            {activeStep === 3 && shippingForm && (
              <PaymentForm
                total={total}
                isPending={createOrderMutation.isPending || checkoutMutation.isPending}
                error={createOrderMutation.error?.message || checkoutMutation.error?.message}
                onPay={() => void handlePay()}
              />
            )}

            {activeStep === 3 && !shippingForm && (
              <div className="flex min-h-72 flex-col items-center justify-center gap-4 text-center">
                <p className="font-mono text-xs text-outline uppercase">
                  Shipping address required
                </p>
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="font-mono text-xs font-bold text-primary underline underline-offset-4 uppercase"
                >
                  Return to Step 2: Shipping Address
                </button>
              </div>
            )}
          </section>

          {/* Right Column: Cart / Order Summary Panel */}
          <aside className="lg:col-span-5 bg-surface-container-lowest border-2 border-primary shadow-hard-md sticky top-24">
            {/* Header */}
            <div className="bg-primary text-on-primary p-4 flex items-center justify-between border-b border-outline">
              <div className="flex items-center gap-2">
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 font-mono text-xs font-bold">
                  Summary
                </span>
                <h3 className="font-sans font-bold text-sm uppercase text-on-primary tracking-tight">
                  Order Overview
                </h3>
              </div>
              <span className="font-mono text-[10px] text-secondary-container">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} ITEMS
              </span>
            </div>

            <div className="p-5 space-y-4">
              <CartSummary subtotal={subtotal} total={total} />

              {activeStep === 1 && cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="w-full mt-4 bg-primary hover:bg-secondary-container text-on-primary hover:text-on-secondary-container font-mono font-bold text-xs uppercase py-3.5 px-4 transition-all duration-300 shadow-hard-md flex items-center justify-between clip-chamfer-sm group"
                >
                  <span>Proceed to Shipping</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center font-mono text-xs text-primary">
          Loading checkout...
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}
