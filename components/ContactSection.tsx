import { site } from "@/lib/site-content";

const links = [
  {
    label: "Email",
    display: site.contact.email,
    href: site.contact.emailHref,
    external: false,
  },
  {
    label: "GitHub",
    display: "GitHub profile",
    href: site.contact.github,
    external: true,
  },
  {
    label: "LinkedIn",
    display: "LinkedIn profile",
    href: site.contact.linkedin,
    external: true,
  },
] as const;

export function ContactSection() {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-card p-8 shadow-sm sm:p-10">
      <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {links.map((link) => (
          <div key={link.label} className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {link.label}
            </span>
            <a
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-base font-medium text-ink underline-offset-4 transition hover:text-accent hover:underline"
            >
              {link.display}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
