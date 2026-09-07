import Image from "next/image";
import Link from "next/link";

export function AuthShell({ mode, children }: { mode: "sign-in" | "sign-up"; children: React.ReactNode }) {
  const isSignIn = mode === "sign-in";

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-[#fafaf8]">
      <div className="grid min-h-screen w-full bg-white lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-[#1f2937] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#f5b83d] opacity-90" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[36px] border-[#f97316] opacity-80" />
          <Link href="/" className="relative z-10 flex items-center gap-2"><Image src="/logo.png" alt="Tendollama" width={40} height={40} /><span className="tracking-[0.18em]">TENDOLLAMA.</span></Link>
          <div className="relative z-10 max-w-sm">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-[#f5b83d]">{isSignIn ? "Your everyday edit" : "Make it yours"}</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight">{isSignIn ? "Welcome back to your everyday edit." : "Build a wardrobe that feels like you."}</h1>
            <p className="mt-6 text-sm leading-7 text-gray-300">Thoughtful essentials, expressive details, and a little room for your next favorite thing.</p>
          </div>
          <p className="relative z-10 text-xs text-gray-400">Curated for the way you move.</p>
        </section>
        <section className="flex min-h-screen flex-col justify-center px-5 py-10 sm:px-12 lg:px-16 xl:px-24">
          <div className="mb-10 lg:hidden"><Link href="/" className="flex items-center gap-2 text-sm tracking-[0.18em]"><Image src="/logo.png" alt="Tendollama" width={32} height={32} />TENDOLLAMA.</Link></div>
          <div className="mx-auto w-full max-w-[440px]">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">{isSignIn ? "Sign in" : "Create account"}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1f2937]">{isSignIn ? "Good to see you again." : "Start your edit."}</h2>
            <p className="mt-2 text-sm text-gray-500">{isSignIn ? "Continue where you left off." : "Save favorites and keep your cart close."}</p>
            <div className="mt-8">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
