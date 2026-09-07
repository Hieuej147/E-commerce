"use client";

import Link from "next/link";
import { CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

import { useOrder } from "@/features/orders/queries/orders.queries";

export function PaymentResult({ mode }: { mode: "success" | "cancel" }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? undefined;
  const { isLoaded, isSignedIn } = useAuth();
  const orderQuery = useOrder(mode === "success" ? orderId : undefined);

  if (!isLoaded) {
    return <ResultMessage icon={<LoaderCircle className="h-10 w-10 animate-spin text-gray-400" />} title="Checking your payment..." />;
  }

  if (!isSignedIn) {
    return <ResultMessage icon={<CircleAlert className="h-10 w-10 text-amber-500" />} title="Sign in to view this payment." action={<Link href="/sign-in" className="bg-gray-900 px-5 py-3 text-sm font-medium text-white">Sign in</Link>} />;
  }

  if (mode === "cancel") {
    return <ResultMessage icon={<CircleAlert className="h-10 w-10 text-amber-500" />} title="Payment was cancelled." description="Your cart is still available if you want to try again." action={<Link href="/cart" className="bg-gray-900 px-5 py-3 text-sm font-medium text-white">Return to cart</Link>} />;
  }

  if (!orderId) {
    return <ResultMessage icon={<CircleAlert className="h-10 w-10 text-red-500" />} title="We could not find this order." action={<Link href="/orders" className="underline underline-offset-4">View orders</Link>} />;
  }

  if (orderQuery.isPending) {
    return <ResultMessage icon={<LoaderCircle className="h-10 w-10 animate-spin text-gray-400" />} title="Confirming your payment..." description="Stripe has returned you to the store. We are waiting for the webhook confirmation." />;
  }

  if (orderQuery.isError) {
    return <ResultMessage icon={<CircleAlert className="h-10 w-10 text-red-500" />} title="We could not confirm this order yet." description="Check your orders in a moment." action={<Link href="/orders" className="underline underline-offset-4">View orders</Link>} />;
  }

  const isPaid = orderQuery.data.paymentStatus === "PAID";
  const isFailed = orderQuery.data.paymentStatus === "FAILED";

  return <ResultMessage
    icon={isPaid ? <CheckCircle2 className="h-10 w-10 text-green-600" /> : <LoaderCircle className="h-10 w-10 animate-spin text-gray-400" />}
    title={isPaid ? "Payment successful." : isFailed ? "Payment failed." : "Payment is being confirmed."}
    description={isPaid ? "Your order is confirmed and being prepared." : isFailed ? "The payment was not completed. You can review the order and try again." : "This page will update when Stripe confirms the payment."}
    action={<Link href="/orders" className="bg-gray-900 px-5 py-3 text-sm font-medium text-white">View orders</Link>}
  />;
}

function ResultMessage({ icon, title, description, action }: { icon: React.ReactNode; title: string; description?: string; action?: React.ReactNode }) {
  return <main className="flex min-h-[60vh] items-center justify-center py-16"><section className="flex max-w-lg flex-col items-center gap-5 border border-gray-100 bg-white p-10 text-center shadow-sm">{icon}<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>{description && <p className="text-sm leading-6 text-gray-500">{description}</p>}{action}</section></main>;
}
