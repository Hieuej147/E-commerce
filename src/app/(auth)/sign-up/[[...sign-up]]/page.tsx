import { SignUp } from "@clerk/nextjs";
import { AuthShell } from "@/modules/auth/components/auth-shell";

export default function SignUpPage() {
  return (
    <AuthShell mode="sign-up">
      <SignUp
        fallbackRedirectUrl="/"
        appearance={{
          elements: {
            rootBox: "w-full max-w-full",
            cardBox: "w-full max-w-full shadow-none border-0 bg-transparent p-0 rounded-none",
            card: "w-full max-w-full shadow-none p-0 bg-transparent border-0 rounded-none",
            main: "w-full max-w-full p-0 gap-3",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            formButtonPrimary:
              "bg-primary hover:bg-secondary-container text-on-primary hover:text-on-secondary-container font-mono text-xs font-bold uppercase py-3 rounded-none border border-primary shadow-hard-sm transition-all",
            formFieldInput:
              "bg-surface-container-lowest border border-outline rounded-none font-mono text-xs text-on-surface py-2.5 px-3 focus:outline-none focus:border-primary focus:border-l-4 focus:border-l-secondary-container transition-all",
            formFieldLabel: "font-mono text-xs uppercase text-primary font-bold",
            socialButtonsBlockButton:
              "bg-surface-container-lowest border border-outline rounded-none font-mono text-xs uppercase text-primary hover:bg-surface-container shadow-hard-sm transition-all",
            socialButtonsBlockButtonText: "font-mono text-xs font-bold",
            dividerLine: "bg-outline",
            dividerText: "font-mono text-[10px] uppercase text-outline bg-surface-container-lowest px-2",
            footerActionLink: "font-mono text-xs font-bold text-primary underline uppercase hover:text-secondary",
            footerActionText: "font-sans text-xs text-on-surface-variant",
            formFieldErrorText: "font-mono text-xs text-error font-bold",
            identityPreviewText: "font-mono text-xs text-primary",
            identityPreviewEditButton: "font-mono text-xs text-primary underline",
            formFieldSuccessText: "font-mono text-xs text-secondary font-bold",
            otpCodeFieldInput:
              "border border-outline rounded-none font-mono text-base font-bold text-primary bg-surface-container-lowest",
          },
        }}
      />
    </AuthShell>
  );
}
