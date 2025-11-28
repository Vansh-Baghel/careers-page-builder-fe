"use client";

import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type JobFormProps = {
  form: {
    title: string;
    work_policy: string;
    location: string;
    department: string;
    employment_type: string;
    experience_level: string;
    job_type: string;
    salary: string;
  };
  update: (field: string, value: string) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  mode: "add" | "edit";
};

export function JobForm({
  form,
  update,
  isSubmitting,
  onSubmit,
  mode,
}: JobFormProps) {
  return (
    <div className="space-y-4 border rounded-lg p-6 bg-white shadow-sm">

      {/* TITLE */}
      <div className="grid gap-1">
        <Label>Job Title</Label>
        <Input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      {/* WORK POLICY */}
      <div className="grid gap-1">
        <Label>Work Policy</Label>
        <Select
          value={form.work_policy}
          onValueChange={(v) => update("work_policy", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select work policy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="onsite">Onsite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* LOCATION */}
      <div className="grid gap-1">
        <Label>Location</Label>
        <Input
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
        />
      </div>

      {/* DEPARTMENT */}
      <div className="grid gap-1">
        <Label>Department</Label>
        <Input
          value={form.department}
          onChange={(e) => update("department", e.target.value)}
        />
      </div>

      {/* EMPLOYMENT TYPE */}
      <div className="grid gap-1">
        <Label>Employment Type</Label>
        <Select
          value={form.employment_type}
          onValueChange={(v) => update("employment_type", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full_time">Full-time</SelectItem>
            <SelectItem value="part_time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* EXPERIENCE LEVEL */}
      <div className="grid gap-1">
        <Label>Experience Level</Label>
        <Select
          value={form.experience_level}
          onValueChange={(v) => update("experience_level", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="mid">Mid</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* JOB TYPE */}
      <div className="grid gap-1">
        <Label>Job Type</Label>
        <Select
          value={form.job_type}
          onValueChange={(v) => update("job_type", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="permanent">Permanent</SelectItem>
            <SelectItem value="temporary">Temporary</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* SALARY */}
      <div className="grid gap-1">
        <Label>Salary Range (Yearly)</Label>
        <Input
          value={form.salary}
          onChange={(e) => update("salary", e.target.value)}
        />
      </div>

      <Button disabled={isSubmitting} onClick={onSubmit}>
        {isSubmitting ? (mode === "add" ? "Adding..." : "Saving...") : mode === "add" ? "Add Job" : "Save Changes"}
      </Button>
    </div>
  );
}
