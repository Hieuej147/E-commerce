import { SignIn } from '@clerk/nextjs';
import { AuthShell } from '@/modules/auth/components/auth-shell';

export default function SignInPage() {
  return (
    <AuthShell mode="sign-in"><SignIn fallbackRedirectUrl="/" appearance={{ elements: { rootBox: "w-full", card: "w-full shadow-none p-0" } }} /></AuthShell>
  );
}
