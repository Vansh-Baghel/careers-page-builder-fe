"use client";

import { getAllCompanies } from "@/lib/apis";
import { CompanyCareerType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: companies, isLoading } = useQuery({
    queryKey: ["all-companies"],
    queryFn: () => getAllCompanies().then((res) => res.data),
  });
  console.log("🚀 ~ Home ~ companies:", companies)

  if (isLoading) {
    return <main className="p-6">Loading companies...</main>;
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Companies Hiring</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companies.map((company: CompanyCareerType) => (
          <Link
            key={company.id}
            href={`/careers/${company.slug}`}
            className="border rounded-lg p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              {company.published_logo_url && (
                <Image
                  src={company.published_logo_url}
                  alt={company.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-md object-cover"
                />
              )}
              <div>
                <h2 className="font-semibold">{company.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {company.jobs_count} open positions
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
