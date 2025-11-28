"use client";

import { JobFiltersType } from "@/lib/types";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

export function JobFilters({
  filters,
  onChange,
}: {
  filters: JobFiltersType;
  onChange: (filters: JobFiltersType) => void;
}) {
  const update = (field: keyof JobFiltersType, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="flex gap-6 my-4 items-end">
      {/* Experience */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Experience</label>
        <Select
          value={filters.experience_level}
          onValueChange={(v) => update("experience_level", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="mid">Mid</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Employment Type */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Employment Type</label>
        <Select
          value={filters.employment_type}
          onValueChange={(v) => update("employment_type", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Employment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Work Policy */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Work Policy</label>
        <Select
          value={filters.work_policy}
          onValueChange={(v) => update("work_policy", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Work Policy" />
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
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Job Type</label>
        <Select
          value={filters.job_type}
          onValueChange={(v) => update("job_type", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="permanent">Permanent</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
