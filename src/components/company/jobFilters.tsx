"use client";

import { Job, JobFiltersType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Funnel } from "lucide-react";

export function JobFilters({
  filters,
  onChange,
  jobs,
}: {
  filters: JobFiltersType & { search: string; location: string };
  onChange: (filters: JobFiltersType) => void;
  jobs: Job[];
}) {
  // dynamic locations
  const uniqueLocations = [
    "all",
    ...Array.from(new Set(jobs.map((j) => j.location))),
  ];

  const update = (field: string, value: string) =>
    onChange({ ...filters, [field]: value });

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Funnel className="h-4 w-4 opacity-70" />
        <h2 className="text-sm font-semibold">Filters</h2>
      </div>

      {/* Search */}
      <Input
        placeholder="Search jobs..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="w-full"
      />

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Location</label>
          <Select
            value={filters.location}
            onValueChange={(v) => update("location", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc === "all" ? "All locations" : loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employment Type */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Employment Type</label>
          <Select
            value={filters.employment_type}
            onValueChange={(v) => update("employment_type", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Experience</label>
          <Select
            value={filters.experience_level}
            onValueChange={(v) => update("experience_level", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="mid">Mid</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Work Policy */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Work Policy</label>
          <Select
            value={filters.work_policy}
            onValueChange={(v) => update("work_policy", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">Onsite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Job Type</label>
          <Select
            value={filters.job_type}
            onValueChange={(v) => update("job_type", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="permanent">Permanent</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="temporary">Temporary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
