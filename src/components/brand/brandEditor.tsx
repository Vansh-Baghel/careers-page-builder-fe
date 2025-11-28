"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brand } from "@/lib/types";
import { uploadToCloudinary } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  brand: Brand;
  onChange: (updated: Partial<Brand>) => void;
};

function UploadedTick({ ok }: { ok: boolean }) {
  return (
    <span className={`text-sm ${ok ? "text-green-600" : "text-gray-400"}`}>
      {ok && <Check size={16} />}
    </span>
  );
}

export function BrandEditor({ brand, onChange }: Props) {
  const { companySlug } = useParams() as { companySlug: string };

  const [logoUploadLoader, setLogoUploadLoader] = useState(false);
  const [bannerUploadLoader, setBannerUploadLoader] = useState(false);

  const setValue = (field: keyof Brand, value: string) => {
    onChange({ [field]: value });
  };

  const handleUpload = async (field: keyof Brand, file?: File) => {
    if (!file) return;

    // pick correct loader setter
    const setLoader =
      field === "logo_url" ? setLogoUploadLoader : setBannerUploadLoader;

    try {
      setLoader(true);

      const { url, public_id } = await uploadToCloudinary(
        file,
        companySlug,
        field
      );

      const publicIdField = field.replace("_url", "_public_id") as keyof Brand;

      onChange({
        [field]: url,
        [publicIdField]: public_id,
      });

      toast.success("Uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border p-5 rounded-lg bg-white shadow-sm">
      {/* Logo */}
      <div className="space-y-2">
        <Label className="font-medium">Logo</Label>

        <div className="flex items-center gap-2">
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload("logo_url", e.target.files?.[0])}
          />

          <label
            htmlFor="logo-upload"
            className={`cursor-pointer border rounded-md px-3 py-2 text-sm bg-white shadow-sm flex items-center gap-2 ${
              logoUploadLoader ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {logoUploadLoader && <Loader2 size={16} className="animate-spin" />}

            {!logoUploadLoader
              ? brand.logo_url
                ? "File uploaded"
                : "Upload Logo"
              : "Uploading..."}
          </label>

          <UploadedTick ok={!!brand.logo_url} />
        </div>
      </div>

      {/* Banner */}
      <div className="space-y-2">
        <Label className="font-medium">Banner Image</Label>

        <div className="flex items-center gap-2">
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload("banner_url", e.target.files?.[0])}
          />

          <label
            htmlFor="banner-upload"
            className={`cursor-pointer border rounded-md px-3 py-2 text-sm bg-white shadow-sm flex items-center gap-2 ${
              bannerUploadLoader ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {bannerUploadLoader && (
              <Loader2 size={16} className="animate-spin" />
            )}

            {!bannerUploadLoader
              ? brand.banner_url
                ? "File uploaded"
                : "Upload Banner"
              : "Uploading..."}
          </label>

          <UploadedTick ok={!!brand.banner_url} />
        </div>
      </div>

      {/* Brand Color */}
      <div className="space-y-2">
        <Label className="font-medium">Brand Color</Label>
        <Input
          type="color"
          value={brand.brand_color || "#000000"}
          onChange={(e) => setValue("brand_color", e.target.value)}
          className="h-10 cursor-pointer"
        />
      </div>

      {/* Culture Video */}
      <div className="space-y-2">
        <Label className="font-medium">Culture Video</Label>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="YouTube URL"
            value={brand.culture_video_url || ""}
            onChange={(e) => setValue("culture_video_url", e.target.value)}
            className="text-sm"
          />
          <UploadedTick ok={!!brand.culture_video_url} />
        </div>
      </div>
    </div>
  );
}
