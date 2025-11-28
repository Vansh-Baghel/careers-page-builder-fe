"use client";

import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { logout } from "@/lib/auth";
import { toast } from "sonner";
import { User } from "@/lib/types";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);

  // 🔥 1. Read user from localStorage when navbar mounts or pathname changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, [pathname]); // reruns whenever URL changes → ensures updated user

  // 🔥 2. Protect /edit-company routes if slug doesn't match
  useEffect(() => {
    if (!user) return;
    if (!params?.companySlug) return;

    if (params.companySlug !== user.company_slug) {
      toast.error("You cannot access another company's dashboard.");
      router.push(`/${user.company_slug}/edit-company`);
    }
  }, [user, params, router]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <Link href="/" className="text-xl font-semibold">
        Careers
      </Link>

      <div className="flex items-center gap-4">
        {!user && (
          <Button onClick={() => router.push("/login")} variant="default">
            Login
          </Button>
        )}

        {user && (
          <>
            <Link href={`/${user.company_slug}/edit-jobs`}>
              <Button
                variant={pathname.includes("edit-jobs") ? "default" : "outline"}
              >
                Edit Jobs
              </Button>
            </Link>

            <Link href={`/${user.company_slug}/edit-company`}>
              <Button
                variant={
                  pathname.includes("edit-company") ? "default" : "outline"
                }
              >
                Edit Page
              </Button>
            </Link>

            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
