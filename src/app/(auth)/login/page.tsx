import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="py-10">
      <h1 className="text-2xl font-semibold mb-6">Recruiter Login</h1>
      <LoginForm />
    </main>
  );
}
