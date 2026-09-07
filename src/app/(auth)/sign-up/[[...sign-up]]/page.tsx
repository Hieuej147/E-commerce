import { SignUp } from '@clerk/nextjs';
import { AuthShell } from '@/modules/auth/components/auth-shell';

export default function SignUpPage() {
  return (
    <AuthShell mode="sign-up"><SignUp fallbackRedirectUrl="/" appearance={{ elements: { rootBox: "w-full", card: "w-full shadow-none p-0" } }} /></AuthShell>
  );
}
