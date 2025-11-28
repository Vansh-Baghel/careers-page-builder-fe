import type { Metadata } from "next";
import { Toaster } from "sonner";
import QueryProvider from "../components/providers/query-provider";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Careers Page Builder",
  description: "Recruiter careers page builder assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <QueryProvider>
          <Toaster
            position="bottom-right"
            expand
            duration={2000}
            closeButton
            toastOptions={{
              classNames: {
                icon: "w-[38px] flex justify-center",
                content: "pr-4",
                closeButton:
                  "left-auto right-0 -translate-x-2/4 -translate-y-2/4 top-2/4",
              },
            }}
          />
          <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
