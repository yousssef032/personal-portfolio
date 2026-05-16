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
    <div className="grid gap-0 sm:grid-cols-3 border-t border-black/[0.08]">
      {links.map((link) => (
        <div key={link.label} className="py-8 sm:pr-8 border-b sm:border-b-0 sm:border-r border-black/[0.08] last:border-0 flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted/70">
            {link.label}
          </span>
          <a
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-base font-medium text-ink border-b border-current pb-0.5 w-fit hover:opacity-60 transition-opacity"
          >
            {link.display}
          </a>
        </div>
      ))}
    </div>
  );
}
