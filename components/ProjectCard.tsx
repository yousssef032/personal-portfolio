import type { Project } from "@/lib/site-content";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-card shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
        <img
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-title">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
            {project.description}
          </p>
        </div>
        <ul className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center rounded-full border border-black/[0.06] bg-surface px-3 py-1 text-xs font-medium text-ink/90">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
