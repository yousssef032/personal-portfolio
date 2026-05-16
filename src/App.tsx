import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadershipSection } from "@/components/LeadershipSection";
import { ScrollRevealManager } from "@/components/ScrollRevealManager";
import { Section } from "@/components/Section";
import { SkillsSection } from "@/components/SkillsSection";
import { projects } from "@/lib/site-content";

const getProjectLabel = (tags: readonly string[]) => {
  if (tags.some((tag) => tag.toLowerCase().includes("flutter"))) {
    return "Mobile App";
  }
  if (tags.some((tag) => tag.toLowerCase().includes("node"))) {
    return "Backend System";
  }
  return "Product Build";
};

function ProjectText({
  index,
  label,
  title,
  description,
  tags,
}: {
  index: number;
  label: string;
  title: string;
  description: string;
  tags: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-4">
        <span
          style={{
            fontSize: "clamp(2.5rem, 5vw, 6rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
          className="font-normal text-muted/[0.18] select-none leading-none"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted/70 mb-2">
          {label}
        </p>
        <h3
          style={{
            fontSize: "clamp(1.25rem, 2.2vw, 2.25rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
          }}
          className="font-normal text-title"
        >
          {title}
        </h3>
      </div>
      <p className="text-[15px] leading-relaxed text-muted">{description}</p>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={`${title}-${tag}`}>
            <span className="inline-flex border border-black/[0.1] px-3 py-1 text-xs font-medium text-ink/80">
              {tag}
            </span>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="inline-flex w-fit text-sm font-medium text-ink border-b border-current pb-0.5 hover:opacity-60 transition-opacity"
      >
        View project →
      </a>
    </div>
  );
}

function WorkProjectsList() {
  return (
    <div style={{ paddingBlockEnd: "clamp(48px, 7vw, 120px)" }}>
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        const label = getProjectLabel(project.tags);

        return (
          <article
            key={project.title}
            className="editorial-grid items-center border-t border-black/[0.06]"
            style={{
              paddingBlock: "clamp(40px, 5vw, 80px)",
              paddingInline: undefined,
            }}
          >
            {isEven ? (
              <>
                <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
                  <ProjectText
                    index={index}
                    label={label}
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                  />
                </div>
                <div className="col-span-12 lg:col-start-7 lg:col-span-6 order-1 lg:order-2">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-auto object-contain"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-12 lg:col-span-7 order-1">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-12 lg:col-start-9 lg:col-span-4 order-2">
                  <ProjectText
                    index={index}
                    label={label}
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                  />
                </div>
              </>
            )}
          </article>
        );
      })}
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
          title="Selected work"
          description="Mobile-first products with dependable backends and cloud-native delivery."
          className="relative z-10 bg-surface border-t border-black/[0.06] shadow-[0_-16px_48px_rgba(0,0,0,0.07)] -mt-[420px] sm:-mt-[520px] lg:-mt-[1040px]"
          fullWidth
        >
          <WorkProjectsList />
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
          title="Let's build something solid"
          description="Reach out for roles, consulting, or a conversation about your next product initiative."
        >
          <ContactSection />
        </Section>
      </main>
      <footer
        className="border-t border-black/[0.06] bg-surface"
        style={{ paddingBlock: "clamp(32px, 4vw, 64px)" }}
      >
        <div
          className="editorial-pad flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center"
        >
          <p>© {new Date().getFullYear()} Youssef ElShohary. All rights reserved.</p>
          <a
            href="#top"
            className="font-medium text-ink border-b border-current pb-0.5 hover:opacity-60 transition-opacity"
          >
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
