import { skillGroups } from "@/lib/site-content";

export function SkillsSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <div
          key={group.label}
          className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm sm:p-7"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {group.label}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <li key={skill}>
                <span className="inline-flex rounded-lg bg-surface px-3 py-1.5 text-sm font-medium text-ink ring-1 ring-black/[0.05]">
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
