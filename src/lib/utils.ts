import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { uploadLogoOrBanner } from "./apis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadToCloudinary(
  file: File,
  companySlug: string,
  field: string
): Promise<{ url: string; public_id: string }> {
  const form = new FormData();
  form.append("file", file);

  return uploadLogoOrBanner(companySlug, field, form);
}

export const saveToLocalStorage = (key: string, value: string) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      localStorage.setItem(key, value);
    });
  } else {
    setTimeout(() => {
      localStorage.setItem(key, value);
    }, 0);
  }
};
