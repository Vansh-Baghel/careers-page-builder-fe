import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="py-10">
      <h1 className="text-2xl font-semibold mb-6">Recruiter Login</h1>

      <LoginForm />

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-3">
          Not a recruiter?
        </p>

        <Link href="/">
          <Button variant="outline" className="w-full md:w-auto">
            Continue as Job Seeker
          </Button>
        </Link>
      </div>
    </main>
  );
}
