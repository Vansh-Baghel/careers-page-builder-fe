import { create } from "zustand";
import { Brand, CompanySection } from "@/lib/types";

type EditorState = {
  sections: CompanySection[];
  brand: Brand;
  companyName: string;

  setCompanyName: (name: string) => void;
  setSections: (s: CompanySection[]) => void;
  setBrand: (b: Partial<Brand>) => void;

  hydrate: (data: {
    sections: CompanySection[];
    brand: Brand;
    companyName: string;
  }) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  sections: [],
  brand: {
    logo_url: "",
    banner_url: "",
    brand_color: "",
    culture_video_url: "",
  },
  companyName: "",

  setCompanyName: (companyName) => set({ companyName }),
  setSections: (sections) => set({ sections }),
  setBrand: (brand) => set((prev) => ({ brand: { ...prev.brand, ...brand } })),

  hydrate: (data) =>
    set({
      sections: data.sections,
      brand: data.brand,
      companyName: data.companyName,
    }),
}));
