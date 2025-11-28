"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { CareersJobsList } from "@/components/company/protected/careersJobsList";
import { getPublishedCompanyData } from "@/lib/apis";
import { PublishCareersSections } from "./publishCareersSections";

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

  const { name, logo_url, banner_url, culture_video_url, sections } = data;

  return (
    <main className="space-y-10 py-10">
      {/* Banner / Hero */}
      <section className="rounded-xl overflow-hidden border bg-white">
        {banner_url && (
          <div className="relative h-40 w-full">
            <Image
              src={banner_url}
              alt={`${name} banner`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4 flex items-center gap-4">
          {logo_url && (
            <Image
              src={logo_url}
              alt={name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-md border object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl font-semibold">{name} · Careers</h1>
            <p className="text-sm text-muted-foreground">
              Explore roles and learn about working here.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections && sections.length > 0 && <PublishCareersSections sections={sections} />}

      {/* Jobs */}
      <CareersJobsList companySlug={companySlug} />

      {/* Culture video */}
      {culture_video_url && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Life at {name}</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden border bg-black">
            <iframe
              src={culture_video_url}
              className="w-full h-full"
              title={`${name} culture video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </main>
  );
}
