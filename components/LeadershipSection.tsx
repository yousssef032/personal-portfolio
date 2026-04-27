import { leadership } from "@/lib/site-content";

export function LeadershipSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {leadership.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm transition duration-300 hover:shadow-md sm:p-8"
        >
          <h3 className="text-lg font-semibold tracking-tight text-title">
            {item.title}
          </h3>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
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
