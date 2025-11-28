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
  salary: string;
  job_slug: string;
  posted_days_ago?: string;
};

export type AllJobs = {
  jobs: Job[];
  totalJobs: number;
  pagination: Pagination;
};

export type Pagination = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  nextPage: number;
  prevPage: number;
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

export type EmploymentType = "all" | "full_time" | "part_time" | "contract";

export type ExperienceLevel = "all" | "junior" | "mid" | "senior";

export type WorkPolicy = "all" | "remote" | "hybrid" | "onsite";

export type JobType = "all" | "permanent" | "temporary" | "internship";

export type JobFiltersType = {
  employment_type?: EmploymentType;
  experience_level?: ExperienceLevel;
  work_policy?: WorkPolicy;
  job_type?: JobType;
  search: string,
  location: string,
};

export type CompanyCareerType = {
  id: string;
  name: string;
  slug: string;
  published_logo_url: string | null;
  published_banner_url: string | null;
  published_brand_color: string | null;
  jobs_count: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  company_slug: string;
}