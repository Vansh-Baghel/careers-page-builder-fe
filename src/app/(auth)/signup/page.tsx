import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="py-10">
      <h1 className="text-2xl font-semibold mb-6">Create a Recruiter Account</h1>
      <SignupForm />
    </main>
  );
}
