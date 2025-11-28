"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Ensure this only runs client-side
    setReady(true);

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setAllowed(true);
  }, [router]);

  // Prevent hydration mismatch
  if (!ready) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // If still checking token
  if (!allowed) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
}
