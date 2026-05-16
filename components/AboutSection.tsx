import { site } from "@/lib/site-content";

export function AboutSection() {
  return (
    <div className="border-t border-black/[0.08] pt-10">
      <p
        style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.7 }}
        className="text-muted max-w-3xl"
      >
        {site.about}
      </p>
    </div>
  );
}
