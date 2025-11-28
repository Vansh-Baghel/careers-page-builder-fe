"use client";

import { CompanySection } from "@/lib/types";

export function PublishCareersSections({ sections }: { sections: CompanySection[] }) {
  return (
    <section className="space-y-6">
      {sections.map((s, idx) => {
        switch (s.type) {
          case "hero":
            return (
              <div key={idx} className="space-y-2">
                {/* <h2 className="text-xl font-semibold">Introduction</h2> */}
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            );

          case "about":
            return (
              <div key={idx} className="space-y-2">
                <h2 className="text-lg font-semibold">About</h2>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {s.description}
                </p>
              </div>
            );

          case "benefits":
            return (
              <div key={idx} className="space-y-2">
                <h2 className="text-lg font-semibold">Benefits</h2>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {s.description}
                </p>
              </div>
            );

          default:
            return null;
        }
      })}
    </section>
  );
}
