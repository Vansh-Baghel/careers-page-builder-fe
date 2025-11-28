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
import { Job } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Pagination from "../reusableComponents/pagination";

type Props = {
  companySlug: string;
};

export function CareersJobsList({ companySlug }: Props) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<string>("all");
  const [employmentType, setEmploymentType] = useState<string>("all");

  const [page, setPage] = useState(1);
  const limit = 10;

  // ---------- FETCH PAGINATED JOBS ----------
  const { data, isLoading } = useQuery({
    queryKey: ["public-jobs", companySlug, page, limit],
    queryFn: () => getJobs(companySlug, page, limit).then((res) => res.data),
  });

  const jobs = useMemo(() => {
    return data?.jobs || [];
  }, [data]);

  // ---------- UNIQUE LOCATIONS ----------
  const uniqueLocations = useMemo(() => {
    return [
      "all",
      ...Array.from(new Set(jobs.map((j: Job) => j.location))),
    ] as string[];
  }, [jobs]);

  // ---------- FILTERING ----------
  const filtered = useMemo(() => {
    return jobs.filter((job: Job) => {
      if (search && !job.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (location !== "all" && job.location !== location) return false;
      if (employmentType !== "all" && job.employment_type !== employmentType)
        return false;

      return true;
    });
  }, [jobs, search, location, employmentType]);

  if (isLoading) return <p>Loading jobs...</p>;

  return (
    <section className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:flex-1"
        />

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {uniqueLocations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc === "all" ? "All locations" : loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={employmentType} onValueChange={setEmploymentType}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="full_time">Full-time</SelectItem>
            <SelectItem value="part_time">Part-time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

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

      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <Pagination
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
