type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  fullWidth?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  hideHeader = false,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`reveal scroll-mt-24 py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div
        className={
          fullWidth ? "w-full" : "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        }
      >
        {hideHeader ? null : (
          <header className="max-w-2xl">
            {eyebrow ? (
              <p className="text-sm font-medium uppercase tracking-wider text-accent">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-title sm:text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            ) : null}
          </header>
        )}
        <div className={hideHeader ? "" : "mt-10 sm:mt-12"}>{children}</div>
      </div>
    </section>
  );
}
