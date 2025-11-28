"use client";

import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { logout } from "@/lib/auth";
import { toast } from "sonner";
import { User } from "@/lib/types";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);

  // Mobile menu
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, [pathname]);

  useEffect(() => {
    if (!user) return;
    if (!params?.companySlug) return;

    // Only protect edit pages
    const isProtected =
      pathname.includes("/edit-company") || pathname.includes("/edit-jobs");
    if (!isProtected) return;

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

      {/* Mobile menu toggle */}
      <button
        className="md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop items */}
      <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-16 z-10 right-4 w-48 rounded-lg shadow-md bg-white border p-4 flex flex-col gap-3 md:hidden">
          {!user && (
            <Button
              onClick={() => {
                setOpen(false);
                router.push("/login");
              }}
            >
              Login
            </Button>
          )}

          {user && (
            <>
              <Button
                variant={pathname.includes("edit-jobs") ? "default" : "outline"}
                onClick={() => {
                  setOpen(false);
                  router.push(`/${user.company_slug}/edit-jobs`);
                }}
              >
                Edit Jobs
              </Button>

              <Button
                variant={
                  pathname.includes("edit-company") ? "default" : "outline"
                }
                onClick={() => {
                  setOpen(false);
                  router.push(`/${user.company_slug}/edit-company`);
                }}
              >
                Edit Page
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
