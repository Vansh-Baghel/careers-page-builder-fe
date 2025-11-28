"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/apis";
import { saveToLocalStorage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { token, user } = res.data;
      saveToLocalStorage("token", token);
      saveToLocalStorage("user", JSON.stringify(user));
      router.push(`/${user.company_slug}/edit-company`);
    },
    onError: () => {
      toast.error("Failed to log in");
    },
  });

  const onSubmit = (values: LoginFormValues) => mutate(values);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || isPending}
        className="w-full"
      >
        {isSubmitting || isPending ? "Logging in..." : "Login"}
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        New here?{" "}
        <a href="/signup" className="underline hover:text-primary">
          Create account
        </a>
      </p>
    </form>
  );
}
