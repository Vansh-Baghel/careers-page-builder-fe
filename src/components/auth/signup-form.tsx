"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/apis";
import { saveToLocalStorage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Minimum 4 characters"),
  company_name: z.string().min(2, "Company name required"),
  company_slug: z.string().optional(),
});

type SignupFormValues = z.infer<typeof schema>;

export function SignupForm() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      const { token, user } = res.data;

      saveToLocalStorage("token", token);
      saveToLocalStorage("user", JSON.stringify(user));
      
      toast.success("Account created!");

      router.push(`/${user.company_slug}/edit-company`);
    },
    onError: () => {
      toast.error("Failed to sign up");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: SignupFormValues) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} placeholder="John Doe" />
      </div>

      <div>
        <Label htmlFor="email">Work Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@company.com"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="••••••••"
        />
      </div>

      <div>
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          id="company_name"
          {...register("company_name")}
          placeholder="Acme Corp"
        />
      </div>

      <div>
        <Label htmlFor="company_slug">Custom URL (optional)</Label>
        <Input
          id="company_slug"
          {...register("company_slug")}
          placeholder="my-company"
        />
        <p className="text-xs text-muted-foreground">
          This will be used in your company page URL. Leave blank to
          auto-generate.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isPending}
        className="w-full"
      >
        {isSubmitting || isPending ? "Creating account..." : "Sign Up"}
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-primary">
          Login
        </Link>
      </p>
    </form>
  );
}
