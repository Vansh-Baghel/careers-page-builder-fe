"use client";

import { useEditorStore } from "@/store/editor";
import { Job } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function JobsEditor({ sectionIndex }: { sectionIndex: number }) {
  const { sections, setSections } = useEditorStore();

  const jobs: Job[] = sections[sectionIndex].jobs ?? [];

  const updateJob = (i: number, patch: Partial<Job>) => {
    const next = [...jobs];
    next[i] = { ...next[i], ...patch };
    updateSection(next);
  };

  const updateSection = (jobsUpdated: Job[]) => {
    const nextSecs = [...sections];
    nextSecs[sectionIndex] = { ...nextSecs[sectionIndex], jobs: jobsUpdated };
    setSections(nextSecs);
  };

  const addJob = () => {
    updateSection([
      ...jobs,
      {
        title: "",
        work_policy: "onsite",
        location: "",
        department: "",
        employment_type: "full-time",
        experience_level: "junior",
        job_type: "permanent",
        salary_range: "",
      },
    ]);
  };

  const removeJob = (i: number) => {
    updateSection(jobs.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-4">
      {jobs.map((job, i) => (
        <div key={i} className="border rounded-lg p-3 space-y-2 bg-gray-50">
          <Input placeholder="Job Title" value={job.title}
            onChange={(e) => updateJob(i, { title: e.target.value })}
          />
          <Input placeholder="Location" value={job.location}
            onChange={(e) => updateJob(i, { location: e.target.value })}
          />
          <Input placeholder="Salary Range" value={job.salary_range}
            onChange={(e) => updateJob(i, { salary_range: e.target.value })}
          />
          <Button variant="destructive" size="sm" onClick={() => removeJob(i)}>
            Remove Job
          </Button>
        </div>
      ))}

      <Button onClick={addJob}>+ Add Job</Button>
    </div>
  );
}
