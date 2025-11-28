"use client";

import { PreviewView } from "@/components/company/protected/previewView";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { deleteJob, getPreview, publishCompany } from "@/lib/apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function PreviewPageContent() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();

  const { data: company, isLoading } = useQuery({
    queryKey: [`get-${companySlug}-company-draft`, companySlug],
    queryFn: () => getPreview(companySlug).then((r) => r.data),
  });

  const { mutate } = useMutation({
    mutationFn: publishCompany,
    onSuccess: () => {
      toast.success("Company published");
    },
    onError: () => {
      toast.error("Failed to publish the company");
    },
  });

  const publishOnClickHandler = () => {
    mutate({ companySlug });
    router.push(`/careers/${companySlug}`);
  };

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Preview</h1>

        <div className="flex items-center gap-2">
          <Button
            className="text-sm"
            onClick={() => router.push(`/${companySlug}/edit-company`)}
          >
            Back to edit
          </Button>

          <Button
            className="text-sm"
            variant="default"
            onClick={publishOnClickHandler}
          >
            Publish
          </Button>
        </div>
      </div>

      <PreviewView company={company} isLoading={isLoading} />
    </main>
  );
}
