"use client";

import { BrandEditor } from "@/components/brand/brandEditor";
import { SectionsEditor } from "@/components/company/protected/sectionsEditor";
import { Button } from "@/components/ui/button";
import { getPreview, saveCompanyPreview } from "@/lib/apis";
import { CompanySection } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CompanyEditor() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();
  const [sections, setSections] = useState<CompanySection[]>([]);

  const [logoUploaded, setLogoUploaded] = useState(false);
  const [bannerUploaded, setBannerUploaded] = useState(false);

  const [brand, setBrand] = useState({
    logo_url: "",
    logo_public_id: "",

    banner_url: "",
    banner_public_id: "",

    brand_color: "",

    culture_video_url: "",
    culture_video_public_id: "",
  });

  const [companyName, setCompanyName] = useState("");

  const { data: preview, isLoading } = useQuery({
    queryKey: [`get-${companySlug}-preview`, companySlug],
    queryFn: () => getPreview(companySlug).then((r) => r.data),
  });

  useEffect(() => {
    if (!preview) return;

    startTransition(() => {
      setSections(preview.sections || []);
      setBrand({
        logo_url: preview.logo_url || "",
        banner_url: preview.banner_url || "",
        brand_color: preview.brand_color || "",
        culture_video_url: preview.culture_video_url || "",
        logo_public_id: preview.logo_public_id || "",
        banner_public_id: preview.banner_public_id || "",
        culture_video_public_id: preview.culture_video_public_id || "",
      });
      setCompanyName(preview.name || "");
    });
  }, [preview]);

  const { mutate, isPending } = useMutation({
    mutationFn: saveCompanyPreview,
    onSuccess: () => toast.success("Preview saved"),
    onError: () => toast.error("Failed to save preview"),
  });

  if (isLoading) return <p>Loading…</p>;

  const previewSaveHandler = () => {
    mutate({
      sections,
      logo_url: brand.logo_url,
      banner_url: brand.banner_url,
      brand_color: brand.brand_color,
      culture_video_url: brand.culture_video_url,
      logo_public_id: brand.logo_public_id,
      banner_public_id: brand.banner_public_id,
      culture_video_public_id: brand.culture_video_public_id,
      companySlug,
    });

    router.push(`/${companySlug}/preview`);
  };

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Edit Careers Page – {companyName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Customize branding and sections. Preview before publishing.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={previewSaveHandler}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Preview"}
          </Button>
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="font-medium">Brand</h2>
        <BrandEditor
          brand={brand}
          onChange={(updated) => setBrand((prev) => ({ ...prev, ...updated }))}
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-medium">Content Sections</h2>
        <SectionsEditor sections={sections} setSections={setSections} />
      </section>
    </main>
  );
}
