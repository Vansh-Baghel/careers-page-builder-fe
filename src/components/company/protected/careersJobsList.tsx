"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getJobs } from "@/lib/apis";
import { Job, JobFiltersType } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useRef, useEffect, useState } from "react";
import { JobFilters } from "../jobFilters";

type Props = {
  companySlug: string;
};

export function CareersJobsList({ companySlug }: Props) {
  const [filters, setFilters] = useState<JobFiltersType>({
    search: "",
    location: "all",
    employment_type: "all",
    experience_level: "all",
    work_policy: "all",
    job_type: "all",
  });
  const limit = 10;

  // ---------- Infinite Query ----------
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["public-jobs-infinite", companySlug],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        getJobs(companySlug, pageParam, limit).then((res) => res.data),
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage,
    });

  // ---------- Flatten all loaded pages ----------
  const allJobs: Job[] = useMemo(() => {
    return data?.pages.flatMap((p: { jobs: Job[] }) => p.jobs) ?? [];
  }, [data]);

  // ---------- Filtering ----------
  const filtered = useMemo(() => {
    return allJobs.filter((job) => {
      if (
        filters.search &&
        !job.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;

      if (filters.location !== "all" && job.location !== filters.location)
        return false;

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

      if (
        filters.work_policy !== "all" &&
        job.work_policy !== filters.work_policy
      )
        return false;

      if (filters.job_type !== "all" && job.job_type !== filters.job_type)
        return false;

      return true;
    });
  }, [allJobs, filters]);

  // ---------- Infinite Scroll Observer ----------
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
  }, [fetchNextPage, hasNextPage]);

  return (
    <section className="space-y-4">
      {/* Filters */}
      <JobFilters filters={filters} onChange={setFilters} jobs={allJobs} />

      {/* Job List */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No jobs match your filters.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((job: Job) => (
            <Card key={job.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-base">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{job.location}</p>
                <p>
                  {job.employment_type} · {job.work_policy}
                </p>
                <p>Experience: {job.experience_level}</p>
                <p>Salary: {job.salary}</p>
                <p className="text-xs">Posted {job.posted_days_ago}</p>
              </CardContent>
            </Card>
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
    </section>
  );
}
