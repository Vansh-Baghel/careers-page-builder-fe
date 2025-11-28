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
  work_policy: "remote" | "hybrid" | "onsite";
  location: string;
  department: string;
  employment_type: "full-time" | "part-time" | "internship";
  experience_level: "junior" | "mid" | "senior";
  job_type: "permanent" | "contract";
  salary_range: string;
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
