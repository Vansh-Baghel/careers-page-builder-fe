"use client";

import { CareersJobsList } from "@/components/company/protected/careersJobsList";
import { getPublishedCompanyData } from "@/lib/apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PreviewView } from "./previewView";

export default function CompanyPublishedPage() {
  const { companySlug } = useParams<{ companySlug: string }>();

  const fetchPublicCompany = async () => {
    try {
      const response = await getPublishedCompanyData(companySlug);
      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to load public company data");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["published-company-data", companySlug],
    queryFn: fetchPublicCompany,
  });

  if (isLoading) {
    return (
      <main className="py-12">
        <p>Loading careers page...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="py-12">
        <p>Company not found.</p>
      </main>
    );
  }

  const { sections } = data;
  console.log("🚀 ~ CompanyPublishedPage ~ data:", data)

  return (
    <main className="space-y-10 py-10">
      {/* Sections */}
      {sections && sections.length > 0 && <PreviewView company={data} isLoading={isLoading} />}

      {/* Jobs */}
      <CareersJobsList companySlug={companySlug} />
    </main>
  );
}
