"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyPublic, CompanySection } from "@/lib/types";
import Image from "next/image";

export function PreviewView({ company, isLoading }: { company: CompanyPublic, isLoading: boolean }) {
  if (isLoading) return <p>Loading…</p>;
  const renderSection = (s: CompanySection, idx: number) => (
    <Card key={idx}>
      <CardHeader>
        <CardTitle className="capitalize">{s.type}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm text-slate-700">
          {s.description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Hero / Banner */}
      <section className="rounded-xl overflow-hidden border bg-white">
        {company.banner_url && (
          <div className="relative h-40 w-full">
            <Image
              src={company.banner_url}
              alt={`${company.name} banner`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4 flex items-center gap-4">
          {company.logo_url && (
            <Image
              src={company.logo_url}
              alt={company.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-md object-cover border"
            />
          )}
          <div>
            <h1 className="text-xl font-semibold">{company.name}</h1>
            <p className="text-sm text-muted-foreground">
              Careers at {company.name}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Text Sections */}
      {company.sections && company.sections.length > 0 && (
        <section className="space-y-4">{company.sections.map(renderSection)}</section>
      )}

      {/* Culture Video */}
      {company.culture_video_url && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Culture Video</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden border bg-black">
            <iframe
              src={company.culture_video_url}
              className="w-full h-full"
              title={`${company.name} culture video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </div>
  );
}
