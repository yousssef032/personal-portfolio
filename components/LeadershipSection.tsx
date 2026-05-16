import { leadership } from "@/lib/site-content";

export function LeadershipSection() {
  return (
    <div className="divide-y divide-black/[0.08]">
      {leadership.map((item) => (
        <article
          key={item.title}
          className="grid py-10 lg:py-12 lg:grid-cols-2 gap-6 items-start"
        >
          <h3 className="text-[clamp(1rem,1.5vw,1.25rem)] font-semibold tracking-tight text-title leading-snug">
            {item.title}
          </h3>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  className="mt-[0.45em] h-1.5 w-1.5 shrink-0 bg-ink/30"
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
