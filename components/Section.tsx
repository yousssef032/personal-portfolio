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
      className={`reveal scroll-mt-24 ${className}`}
    >
      {hideHeader ? null : (
        <div
          className="editorial-grid"
          style={{
            paddingBlockStart: "clamp(48px, 7vw, 120px)",
            paddingBlockEnd: "clamp(24px, 3vw, 56px)",
          }}
        >
          <div className="col-span-12 lg:col-span-7">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted mb-5">
                {eyebrow}
              </p>
            ) : null}
            <h2
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 5.5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
              }}
              className="font-normal text-title"
            >
              {title}
            </h2>
          </div>
          {description ? (
            <div className="col-span-12 lg:col-start-9 lg:col-span-4 flex items-end pt-6 lg:pt-0 pb-1">
              <p className="text-[15px] leading-relaxed text-muted">
                {description}
              </p>
            </div>
          ) : null}
        </div>
      )}
      <div
        className={
          fullWidth
            ? "w-full"
            : "editorial-pad"
        }
        style={fullWidth ? undefined : { paddingBlockEnd: "clamp(48px, 7vw, 120px)" }}
      >
        {children}
      </div>
    </section>
  );
}
