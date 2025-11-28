import { Job } from "@/lib/types";
import { Button } from "../../ui/button";
import { useState } from "react";

type Props = {
  job: Job;
  onEdit: () => void;
  onDelete: (slug: string) => void;
};

export function JobCard({ job, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <h3 className="font-medium text-lg">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.location}</p>

      <p className="text-xs text-gray-400 mt-1 capitalize">
        {job.experience_level} • {job.employment_type} • {job.work_policy} •{" "}
        {job.job_type}
      </p>

      <div className="flex gap-2 mt-4">
        <Button size="sm" variant="outline" onClick={onEdit}>
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(job.job_slug)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
