"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
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
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
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
    <main className="mt-12 flex flex-col gap-8">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">Your edit, in progress</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight">Shopping cart</h1>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            <span className={step.id === activeStep ? "flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white" : "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-400"}>
              {step.id}
            </span>
            <span className={step.id === activeStep ? "text-sm font-medium text-gray-900" : "text-sm text-gray-400"}>{step.title}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <section className="min-h-[360px] border border-gray-100 p-5 shadow-sm sm:p-8">
          {!isCartHydrated ? (
            <div className="flex min-h-[300px] items-center justify-center text-sm text-gray-500">Loading your cart...</div>
          ) : activeStep === 1 && (
            cartItems.length ? (
              <div className="flex flex-col gap-6">
                {cartItems.map((item) => <CartItem key={item.id + item.selectedSize + item.selectedColor} item={item} />)}
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                <ShoppingBag className="h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500">Your cart is waiting for something good.</p>
                <Link href="/products" className="text-sm font-medium underline underline-offset-4">Browse products</Link>
              </div>
            )
          )}
          {activeStep === 2 && <ShippingForm onContinue={(data) => { setShippingForm(data); setOrderId(null); orderIdempotencyKey.current = crypto.randomUUID(); checkoutIdempotencyKey.current = crypto.randomUUID(); goToStep(3); }} />}
          {activeStep === 3 && shippingForm && (
            <PaymentForm
              total={total}
              isPending={createOrderMutation.isPending || checkoutMutation.isPending}
              error={createOrderMutation.error?.message || checkoutMutation.error?.message}
              onPay={() => void handlePay()}
            />
          )}
          {activeStep === 3 && !shippingForm && (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
              <p className="text-sm text-gray-500">Add your shipping address before payment.</p>
              <button type="button" onClick={() => goToStep(2)} className="text-sm font-medium underline underline-offset-4">Back to address</button>
            </div>
          )}
        </section>

        <aside className="h-max border border-gray-100 p-6 shadow-sm sm:p-8">
          <h2 className="font-semibold">Cart details</h2>
          <div className="mt-6">
            <CartSummary subtotal={subtotal} total={total} />
          </div>
          {activeStep === 1 && cartItems.length > 0 && (
            <button type="button" onClick={() => goToStep(2)} className="mt-8 flex w-full items-center justify-center gap-2 bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-700">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </aside>
      </div>
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="mt-12 text-center text-sm text-gray-500">Loading cart...</div>}>
      <CartPageContent />
    </Suspense>
  );
}
