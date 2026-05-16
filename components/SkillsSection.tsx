import { skillGroups } from "@/lib/site-content";

export function SkillsSection() {
  return (
    <div className="grid gap-12 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <div key={group.label}>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted border-b border-black/[0.1] pb-3 mb-6">
            {group.label}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <li key={skill}>
                <span className="inline-flex border border-black/[0.12] px-3 py-1.5 text-sm font-medium text-ink">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
