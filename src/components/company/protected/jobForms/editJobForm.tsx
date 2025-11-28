"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { JobForm } from "./jobForm";
import { editJob, getSingleJob } from "@/lib/apis";

export function EditJobForm() {
  const { companySlug, jobSlug } = useParams<{
    companySlug: string;
    jobSlug: string;
  }>();

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

  const update = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", companySlug],
    queryFn: () =>
      getSingleJob({ companySlug, jobSlug }).then((res) => res.data),
  });

  useEffect(() => {
    if (!job) return;
    setForm(job);
  }, [job]);

  const { mutate, isPending } = useMutation({
    mutationFn: editJob,
    onSuccess: () => {
      toast.success("Job updated");
      router.push(`/${companySlug}/edit-jobs`);
      router.refresh();
    },
    onError: () => toast.error("Failed to update job"),
  });

  const saveJobHandler = () => {
    mutate({
      companySlug,
      jobSlug,
      ...form,
    });
  };

  if (isLoading) return <p>Loading job...</p>;

  return (
    <main className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Edit Job</h1>

      <JobForm
        form={form}
        update={update}
        isSubmitting={isPending}
        onSubmit={saveJobHandler}
        mode="edit"
      />
    </main>
  );
}
