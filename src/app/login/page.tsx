import { AuthForm } from "@/components/auth-form";
import { BackButton } from "@/components/back-button";

export default function LoginPage() {
  return (
    <section>
      <BackButton className="absolute left-4 top-4" />
      <div className="mx-auto flex min-h-dvh flex-col items-center justify-center px-6 py-8 lg:py-0">
        <AuthForm type="login" />
      </div>
    </section>
  );
}
