"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createJob } from "@/lib/apis";
import { JobForm } from "./jobForm";

export function AddJobForm() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    work_policy: "",
    location: "",
    department: "",
    employment_type: "",
    experience_level: "",
    job_type: "",
    salary: "",
  });

  const update = (f: string, v: string) =>
    setForm((p) => ({ ...p, [f]: v }));

  const { mutate, isPending } = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success("Job added");
      router.push(`/${companySlug}/edit-jobs`);
      router.refresh();
    },
    onError: () => toast.error("Failed to add job"),
  });

  const saveJobHandler = () => {
    mutate({ slug: companySlug, ...form });
  };

  return (
    <main className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Add Job</h1>

      <JobForm
        form={form}
        update={update}
        isSubmitting={isPending}
        onSubmit={saveJobHandler}
        mode="add"
      />
    </main>
  );
}
