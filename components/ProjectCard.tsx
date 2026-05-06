import type { Project } from "@/lib/site-content";

type ProjectCardProps = {
  project: Project;
  index: number;
  label: string;
  priority?: boolean;
};

export function ProjectCard({
  project,
  index,
  label,
  priority = false,
}: ProjectCardProps) {
  const resultNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-card p-3 shadow-[0_8px_20px_rgba(31,41,55,0.08)] transition duration-300 ease-out hover:-translate-y-1 hover:bg-[#fffdfa] hover:shadow-[0_14px_26px_rgba(31,41,55,0.14)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface">
        <img
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-1 pb-1 pt-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted/90">
          {label}
        </p>

        <div className="flex items-baseline gap-2.5">
          <span className="text-xs font-semibold tracking-wide text-muted/80">
            {resultNumber}
          </span>
          <h3 className="text-lg font-semibold tracking-tight text-title">{project.title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center rounded-full border border-black/[0.06] bg-surface px-2.5 py-1 text-xs font-medium text-ink/90">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
