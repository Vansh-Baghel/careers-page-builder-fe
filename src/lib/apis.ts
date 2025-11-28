import axios from "@/lib/axios";
import { CompanyPublic, CompanySection } from "./types";

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

export async function getPublicCompany(slug: string) {
  return await axios.get(`/company/public/${slug}/careers`);
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
