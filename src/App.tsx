import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadershipSection } from "@/components/LeadershipSection";
import { ScrollRevealManager } from "@/components/ScrollRevealManager";
import { Section } from "@/components/Section";
import { SkillsSection } from "@/components/SkillsSection";
import { projects, site } from "@/lib/site-content";

const getProjectLabel = (tags: readonly string[]) => {
  if (tags.some((tag) => tag.toLowerCase().includes("flutter"))) {
    return "Mobile App";
  }
  if (tags.some((tag) => tag.toLowerCase().includes("node"))) {
    return "Backend System";
  }
  return "Product Build";
};

function WorkResultsCarousel() {
  return (
    <div className="sticky top-0 z-10 flex w-full items-start border-y border-black/[0.06] bg-card px-4 py-12 shadow-[0_-12px_30px_rgba(31,41,55,0.12)] sm:px-8 sm:py-14 lg:px-12 lg:pb-12 lg:pt-28">
      <div className="mx-auto w-full max-w-6xl space-y-3">
        <div className="p-4 sm:p-5">
          <h3 className="text-center text-3xl font-bold tracking-tight text-title sm:text-4xl lg:text-[2.9rem]">
            What we&apos;ve built
          </h3>
          <div className="mt-4 flex h-11 items-center rounded-xl border border-black/[0.06] bg-card px-4">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="mr-3 h-4 w-4 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="text-sm font-medium text-muted">Selected work</span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const label = getProjectLabel(project.tags);

            return (
              <article
                key={project.title}
                className={`py-2.5 sm:py-3 lg:py-3.5 ${
                  index === projects.length - 1 ? "" : "border-b border-black/[0.06]"
                }`}
              >
                <div className="grid items-center gap-1.5 lg:grid-cols-2 lg:gap-2.5">
                  <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                    <div className="overflow-hidden rounded-lg max-w-[96%] lg:max-w-[94%] max-h-[220px] sm:max-h-[260px] lg:max-h-[290px]">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="h-auto w-full object-contain"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>

                  <div className={isEven ? "order-2" : "order-2 lg:order-1"}>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted/90">
                      {label}
                    </p>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold tracking-wide text-muted/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-sm font-medium tracking-tight text-title">
                        {project.title}
                      </h4>
                    </div>
                    <p className="mt-1.5 max-w-xl text-xs leading-snug text-muted [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
                      {project.description}
                    </p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <li key={`${project.title}-${tag}`}>
                          <span className="inline-flex items-center rounded-full border border-black/[0.06] bg-surface px-2.5 py-1 text-xs font-medium text-ink/90">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="mt-1.5 inline-flex text-[11px] font-semibold text-accent transition hover:text-title"
                    >
                      View project →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <ScrollRevealManager />
        <Hero />
        <Section
          id="work"
          eyebrow="Builds"
          title="Builds"
          description="Mobile-first products with dependable backends and cloud-native delivery."
          hideHeader
          className="relative z-10 h-[1100px] -mt-[420px] py-0 sm:h-[1200px] sm:-mt-[520px] lg:h-[1320px] lg:-mt-[1040px]"
          fullWidth
        >
          <WorkResultsCarousel />
        </Section>
        <Section
          id="expertise"
          eyebrow="Expertise"
          title="Expertise"
          description="Core capabilities across mobile, full-stack, AI/CV, and cloud delivery."
        >
          <SkillsSection />
        </Section>
        <Section
          id="leadership"
          eyebrow="Leadership & Experience"
          title="Leadership & experience"
          description="Highlights from leading product engineering and AI/CV execution."
        >
          <LeadershipSection />
        </Section>
        <Section
          id="about"
          eyebrow="About"
          title="About"
          description="A short summary of how I work and what I value."
        >
          <AboutSection />
        </Section>
        <Section
          id="contact"
          eyebrow="Contact"
          title="Let’s build something solid"
          description="Reach out for roles, consulting, or a conversation about your next product initiative."
        >
          <ContactSection />
        </Section>
      </main>
      <footer className="border-t border-black/[0.06] bg-surface py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="font-medium text-ink transition hover:text-accent"
          >
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
