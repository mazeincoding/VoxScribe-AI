import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-dvh flex-col items-center justify-center px-6 py-8 lg:py-0">
      <AuthForm type="login" />
    </section>
  );
}
