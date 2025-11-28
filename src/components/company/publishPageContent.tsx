"use client";

import { deleteJob, getJobs } from "@/lib/apis";
import { Job, JobFiltersType } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { JobCard } from "./jobCard";
import { JobFilters } from "./jobFilters";
import { PreviewView } from "./previewView";
import { DeleteJobDialog } from "../modals/deleteJobModal";

export default function PublishPageContent() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();
  const [filters, setFilters] = useState<JobFiltersType>({});
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    jobSlug: "",
    title: "",
  });

  const queryClient = useQueryClient();

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ["jobs", companySlug],
    queryFn: () => getJobs(companySlug).then((res) => res.data),
  });

  const filteredJobs = useMemo(() => {
    if (!jobsData) return [];

    return jobsData.filter((job: Job) => {
      if (
        filters.employment_type &&
        job.employment_type !== filters.employment_type
      )
        return false;

      if (
        filters.experience_level &&
        job.experience_level !== filters.experience_level
      )
        return false;

      if (filters.job_type && job.job_type !== filters.job_type) return false;

      return true;
    });
  }, [jobsData, filters]);

  const handleFilter = (filters: JobFiltersType) => {
    setFilters(filters);
  };

  const { mutate } = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success("Job deleted");
      queryClient.invalidateQueries({ queryKey: ["jobs", companySlug] });
    },
    onError: () => {
      toast.error("Failed to delete the job");
    },
  });

  const handleDeleteOnClickHandler = (jobSlug: string) => {
    setDeleteModal({
      open: true,
      jobSlug,
      title: "Are you sure you want to delete this job?",
    });
  };

  const confirmDelete = () => {
    mutate({ companySlug, jobSlug: deleteModal.jobSlug });
    setDeleteModal({ open: false, jobSlug: "", title: "" });
  };

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Publish</h1>

      <PreviewView companySlug={companySlug} />

      <JobFilters onFilter={handleFilter} />

      {isLoading ? (
        <p>Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job: Job, idx: number) => (
            <JobCard
              key={idx}
              job={job}
              onDelete={() => handleDeleteOnClickHandler(job.job_slug)}
              onEdit={() =>
                router.push(`/${companySlug}/publish/edit/${job.job_slug}`)
              }
            />
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={() => router.push(`/${companySlug}/publish/add-job`)}>
          Add Job
        </Button>
      </div>

      <DeleteJobDialog
        open={deleteModal.open}
        jobTitle={deleteModal.title}
        onClose={() => setDeleteModal({ open: false, jobSlug: "", title: "" })}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
