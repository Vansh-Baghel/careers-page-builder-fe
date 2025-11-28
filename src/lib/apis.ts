import axios from "@/lib/axios";
import { CompanyPublic, CompanySection, Job } from "./types";

export const signUp = ({
  name,
  email,
  password,
  company_name,
  company_slug,
}: {
  name: string;
  email: string;
  password: string;
  company_name: string;
  company_slug?: string;
}) => {
  return axios.post("/auth/signup", {
    name,
    email,
    password,
    company_name,
    company_slug,
  });
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios.post("/auth/login", { email, password });
};

export const saveCompanyPreview = ({
  sections,
  logo_url,
  logo_public_id,
  banner_url,
  banner_public_id,
  brand_color,
  culture_video_url,
  culture_video_public_id,
  companySlug,
}: {
  sections?: CompanySection[];
  logo_url?: string;
  logo_public_id?: string;
  banner_url?: string;
  banner_public_id?: string;
  brand_color?: string;
  culture_video_url?: string;
  culture_video_public_id?: string;
  companySlug: string;
}) => {
  return axios.patch(`/company/${companySlug}/edit`, {
    sections,
    logo_url,
    logo_public_id,
    banner_url,
    banner_public_id,
    brand_color,
    culture_video_url,
    culture_video_public_id,
  });
};

export async function getPreview(slug: string) {
  return await axios.get(`/company/${slug}/preview`);
}

export async function uploadLogoOrBanner(
  companySlug: string,
  field: string,
  form: FormData
) {
  const res = await axios.post(`/file-upload/${companySlug}/${field}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return {
    url: res.data.url,
    public_id: res.data.public_id,
  };
}

export async function getAllCompanies() {
  return await axios.get(`/companies`);
}

export async function getSingleJob({
  companySlug,
  jobSlug,
}: {
  companySlug: string;
  jobSlug: string;
}) {
  return await axios.get(`/${companySlug}/job/${jobSlug}`);
}

export async function getPublishedCompanyData(companySlug: string) {
  return await axios.get(`/company/${companySlug}/get-published`);
}

export async function getJobs(
  companySlug: string,
  page: number,
  limit: number
) {
  return await axios.get(`/${companySlug}/jobs?page=${page}&limit=${limit}`);
}

export async function createJob({
  title,
  work_policy,
  location,
  department,
  employment_type,
  experience_level,
  job_type,
  salary,
  slug,
}: {
  title: string;
  work_policy: string;
  location: string;
  department: string;
  employment_type: string;
  experience_level: string;
  job_type: string;
  salary: string;
  slug: string;
}) {
  return await axios.post(`/${slug}/job`, {
    title,
    work_policy,
    location,
    department,
    employment_type,
    experience_level,
    job_type,
    salary,
  });
}

export async function deleteJob({
  companySlug,
  jobSlug,
}: {
  companySlug: string;
  jobSlug: string;
}) {
  return await axios.delete(`/${companySlug}/job/${jobSlug}/delete`);
}

export async function editJob({
  companySlug,
  jobSlug,
  title,
  work_policy,
  location,
  department,
  employment_type,
  experience_level,
  job_type,
  salary,
}: {
  companySlug: string;
  jobSlug: string;
  title: string;
  work_policy: string;
  location: string;
  department: string;
  employment_type: string;
  experience_level: string;
  job_type: string;
  salary: string;
}) {
  return await axios.patch(`/${companySlug}/job/${jobSlug}/edit`, {
    title,
    work_policy,
    location,
    department,
    employment_type,
    experience_level,
    job_type,
    salary,
  });
}

export const publishCompany = ({ companySlug }: { companySlug: string }) => {
  return axios.patch(`/publish/${companySlug}`);
};
