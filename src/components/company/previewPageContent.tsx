// components/company/PreviewPageContent.tsx
"use client";

import { PreviewView } from "@/components/company/previewView";
import { useParams, useRouter } from "next/navigation";

export default function PreviewPageContent() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Preview</h1>
        <button
          className="text-sm underline"
          onClick={() => router.push(`/${companySlug}/edit`)}
        >
          Back to edit
        </button>
      </div>

      <PreviewView companySlug={companySlug} />
    </main>
  );
}
