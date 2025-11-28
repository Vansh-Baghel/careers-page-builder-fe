"use client";

import { deleteJob, getJobs, getPublishedCompanyData } from "@/lib/apis";
import { Job, JobFiltersType } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DeleteJobDialog } from "../../modals/deleteJobModal";
import { Button } from "../../ui/button";
import { JobCard } from "../reusableComponents/jobCard";
import { JobFilters } from "../jobFilters";
import Pagination from "../reusableComponents/pagination";
import { PreviewView } from "./previewView";

export default function EditJobsContent() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 10;

  const [filters, setFilters] = useState<JobFiltersType>({});
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    jobSlug: "",
    title: "",
  });

  const queryClient = useQueryClient();

  // ---------- FETCH COMPANY DATA ----------
  const { data: publishedCompanyData, isLoading: loadingPublishedData } =
    useQuery({
      queryKey: [`publishedCompanyData-${companySlug}`, companySlug],
      queryFn: () =>
        getPublishedCompanyData(companySlug).then((res) => res.data),
    });

  // ---------- FETCH PAGINATED JOBS ----------
  const {
    data: jobsData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["jobs", companySlug, page, limit],
    queryFn: () => getJobs(companySlug, page, limit).then((res) => res.data),
  });

  // ---------- FILTER JOBS LOCALLY ----------
  const filteredJobs = useMemo(() => {
    if (!jobsData?.jobs) return [];

    return jobsData.jobs.filter((job: Job) => {
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

  // ---------- DELETE JOB ----------
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
      <h1 className="text-2xl font-semibold">Jobs</h1>

      <div className="flex justify-between items-center">
        <JobFilters onFilter={handleFilter} />

        <div className="flex justify-end">
          <Button
            onClick={() => router.push(`/${companySlug}/add-job`)}
          >
            Add Job
          </Button>
        </div>
      </div>

      {isLoading || isFetching ? (
        <p>Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job: Job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={() => handleDeleteOnClickHandler(job.job_slug)}
              onEdit={() =>
                router.push(`/${companySlug}/edit-job/${job.job_slug}`)
              }
            />
          ))}
        </div>
      )}

      {jobsData && (
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Showing {filteredJobs.length} of {jobsData.totalJobs} jobs
          </p>

          <Pagination
            currentPage={jobsData.pagination.currentPage}
            totalPages={jobsData.pagination.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}

      <DeleteJobDialog
        open={deleteModal.open}
        jobTitle={deleteModal.title}
        onClose={() => setDeleteModal({ open: false, jobSlug: "", title: "" })}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
