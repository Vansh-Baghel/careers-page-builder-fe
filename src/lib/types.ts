export type CompanySection =
  | {
      type: "hero";
      description: string;
    }
  | {
      type: "about";
      description: string;
    }
  | {
      type: "benefits";
      description: string;
    }
  | {
      type: "jobs";
      heading?: string;
      description: string;
    };

export type Job = {
  id?: string;
  title: string;
  work_policy: WorkPolicy;
  location: string;
  department: string;
  employment_type: EmploymentType;
  experience_level: ExperienceLevel;
  job_type: JobType;
  salary_range: string;
  job_slug: string;
  posted_days_ago?: number;
};

export type CompanyPublic = {
  name: string;
  logo_url?: string | null;
  banner_url?: string | null;
  brand_color?: string | null;
  culture_video_url?: string | null;
  sections: CompanySection[] | null;
  jobs: Job[];
};

export type Brand = {
  logo_url?: string;
  logo_public_id?: string;

  banner_url?: string;
  banner_public_id?: string;

  brand_color?: string;

  culture_video_url?: string;
  culture_video_public_id?: string;
};

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship";

export type ExperienceLevel = "fresher" | "junior" | "mid" | "senior" | "lead";

export type WorkPolicy = "remote" | "hybrid" | "onsite";

export type JobType = "permanent`" | "contract";

export type JobFiltersType = {
  employment_type?: EmploymentType;
  experience_level?: ExperienceLevel;
  work_policy?: WorkPolicy;
  job_type?: JobType;
}
