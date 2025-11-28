"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { logout } from "@/lib/auth";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) return;
    setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    logout(); // clear cookie/localStorage
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
            <Link href={`/${user.company_slug}/publish`}>
              <Button
                variant={pathname.includes("publish") ? "default" : "outline"}
              >
                Publish
              </Button>
            </Link>

            <Link href={`/${user.company_slug}/edit-company`}>
              <Button
                variant={
                  pathname.includes("edit-company") ? "default" : "outline"
                }
              >
                Edit Company
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
