"use client";

import { deleteJob, getJobs } from "@/lib/apis";
import { Job, JobFiltersType } from "@/lib/types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import { DeleteJobDialog } from "../../modals/deleteJobModal";
import { Button } from "../../ui/button";
import { JobFilters } from "../jobFilters";
import { JobCard } from "../reusableComponents/jobCard";

export default function EditJobsContent() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const limit = 10;

  const [filters, setFilters] = useState<JobFiltersType>({
    employment_type: "all",
    experience_level: "all",
    work_policy: "all",
    job_type: "all",
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    jobSlug: "",
    title: "",
  });

  // ---- Infinite Query ----
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["jobs-infinite", companySlug],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        getJobs(companySlug, pageParam, limit).then((res) => res.data),
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage,
    });

  // ---- Flatten Pages ----
  const allJobs: Job[] = useMemo(() => {
    return data?.pages.flatMap((p: { jobs: Job[] }) => p.jobs) ?? [];
  }, [data]);

  // ---- Local Filters on Infinite Data ----
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job: Job) => {
      if (
        filters.employment_type !== "all" &&
        job.employment_type !== filters.employment_type
      )
        return false;

      if (
        filters.experience_level !== "all" &&
        job.experience_level !== filters.experience_level
      )
        return false;

      if (filters.job_type !== "all" && job.job_type !== filters.job_type)
        return false;

      if (
        filters.work_policy !== "all" &&
        job.work_policy !== filters.work_policy
      )
        return false;

      return true;
    });
  }, [allJobs, filters]);

  // ---- Intersection Observer (load more) ----
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // ---- DELETE JOB ----
  const { mutate } = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success("Job deleted");
      queryClient.invalidateQueries({
        queryKey: ["jobs-infinite", companySlug],
      });
    },
    onError: () => toast.error("Failed to delete the job"),
  });

  const handleDeleteOnClick = (jobSlug: string) => {
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
      <h1 className="text-2xl font-semibold">Jobs</h1>

      <div className="flex justify-between items-center">
        <JobFilters filters={filters} onChange={setFilters} />

        <Button onClick={() => router.push(`/${companySlug}/add-job`)}>
          Add Job
        </Button>
      </div>

      {/* Job List */}
      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job: Job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={() => handleDeleteOnClick(job.job_slug)}
              onEdit={() =>
                router.push(`/${companySlug}/edit-job/${job.job_slug}`)
              }
            />
          ))}
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="h-12 flex items-center justify-center">
        {isFetchingNextPage
          ? "Loading more jobs..."
          : hasNextPage
          ? "Scroll to load more"
          : "No more jobs"}
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
