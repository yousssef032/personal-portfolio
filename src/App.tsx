import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadershipSection } from "@/components/LeadershipSection";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollRevealManager } from "@/components/ScrollRevealManager";
import { Section } from "@/components/Section";
import { SkillsSection } from "@/components/SkillsSection";
import { projects, site } from "@/lib/site-content";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <ScrollRevealManager />
        <Hero />
        <Section
          id="work"
          eyebrow="Selected Work"
          title="Selected work"
          description="Mobile-first products with dependable backends and cloud-native delivery."
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                priority={index === 0}
              />
            ))}
          </div>
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
