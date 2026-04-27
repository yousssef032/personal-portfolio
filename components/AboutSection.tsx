import { site } from "@/lib/site-content";

export function AboutSection() {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-card p-8 shadow-sm sm:p-10">
      <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
        {site.about}
      </p>
    </div>
  );
}
