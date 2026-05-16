"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isScrollTriggerRegistered = false;

function registerScrollTrigger() {
  if (!isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }
}

const RING_RADIUS = 320;

const IMAGE_SOURCES = [
  { src: "/projects/ring-feature.png", alt: "Featured project preview" },
  { src: "/projects/ring-fourth.png", alt: "Project preview two" },
  { src: "/projects/ring-second.png", alt: "Third featured project preview" },
  { src: "/projects/ring-third.png", alt: "Project preview four" },
  { src: "/projects/ring-aws.png", alt: "AWS console project preview" },
  { src: "/projects/ring-cv.png", alt: "Computer vision project preview" },
];

// Place images evenly on the ring, starting from the top (270°)
const floatingPreviews = IMAGE_SOURCES.map((img, i) => {
  const angleDeg = 180 + (i / IMAGE_SOURCES.length) * 360;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    ...img,
    x: Math.round(RING_RADIUS * Math.cos(angleRad)),
    y: Math.round(RING_RADIUS * Math.sin(angleRad)),
    baseDeg: angleDeg,
  };
});

// 180° = leftmost point = the dominant "selected" / foreground position
function getDepthProps(effectiveDeg: number) {
  let delta = effectiveDeg - 180;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;

  // Sharp curve → only the circle nearest 180° scales up
  const tSharp = Math.max(0, Math.cos((delta / 180) * Math.PI * 2.5));
  const scale = 0.65 + 0.85 * tSharp; // 0.65 (background) → 1.5 (foreground)

  // Soft curve → smooth depth gradient across all positions
  const tSoft = (Math.cos((delta / 180) * Math.PI) + 1) / 2; // 0 → 1

  const opacity = 0.52 + 0.48 * tSoft;       // 0.52 (deep) → 1.0 (front)
  const blur = (1 - tSoft) * 2.5;            // 2.5px (deep) → 0px (front)
  const brightness = 0.78 + 0.22 * tSoft;    // 0.78 (deep) → 1.0 (front)
  const filter = `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(3)})`;

  return { scale, opacity, filter };
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !ringTrackRef.current) return;
    registerScrollTrigger();

    const section = sectionRef.current;
    const ringTrack = ringTrackRef.current;

    const ctx = gsap.context(() => {
      gsap.set(ringTrack, { transformOrigin: "50% 50%", willChange: "transform" });

      const circles = gsap.utils.toArray<HTMLElement>(".hero-float", ringTrack);
      const circleMedia = gsap.utils.toArray<HTMLElement>(".hero-float-media", ringTrack);

      // Let GSAP own all transforms on each circle so scale + position don't conflict
      circles.forEach((circle, i) => {
        const { scale, opacity, filter } = getDepthProps(floatingPreviews[i].baseDeg);
        gsap.set(circle, {
          xPercent: -50,
          yPercent: -50,
          x: floatingPreviews[i].x,
          y: floatingPreviews[i].y,
          scale,
          opacity,
          filter,
        });
      });

      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        const trigger = {
          trigger: section,
          start: "top top",
          end: "+=900",
          pin: section,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        };
        const tl = gsap.timeline({ scrollTrigger: trigger });
        tl.to(ringTrack, { rotate: 360, ease: "none" }, 0);
        circleMedia.forEach((media) => tl.to(media, { rotate: -360, ease: "none" }, 0));
      });

      mm.add("(min-width: 1024px)", () => {
        const rotateTrigger = {
          trigger: section,
          start: "top top",
          end: "+=1400",
          scrub: 1.2,
          invalidateOnRefresh: true,
        };
        gsap.to(ringTrack, { rotate: 360, ease: "none", scrollTrigger: rotateTrigger });
        circleMedia.forEach((media) =>
          gsap.to(media, { rotate: -360, ease: "none", scrollTrigger: rotateTrigger })
        );
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=2000",
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });
    }, sectionRef);

    // Update each circle's scale every frame based on its current ring position
    const onTick = () => {
      if (!ringTrackRef.current) return;
      const rot = gsap.getProperty(ringTrackRef.current, "rotation") as number;
      const circles = ringTrackRef.current.querySelectorAll<HTMLElement>(".hero-float");
      circles.forEach((circle, i) => {
        const eff = ((floatingPreviews[i].baseDeg + rot) % 360 + 360) % 360;
        const { scale, opacity, filter } = getDepthProps(eff);
        gsap.set(circle, { scale, opacity, filter });
      });
    };

    gsap.ticker.add(onTick);

    return () => {
      ctx.revert();
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden border-b border-black/[0.06] bg-surface"
    >
      {/* Decorative blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.10),rgba(0,0,0,0.04),transparent_72%)] blur-3xl sm:h-[36rem] sm:w-[36rem]"
      />

      {/* Text content */}
      <div className="relative z-10 min-h-screen">
        {/* Eyebrow + build. — stacked at bottom-left */}
        <div
          className="absolute flex flex-col"
          style={{ bottom: 0, left: 0 }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted"
            style={{ paddingLeft: "var(--ed-pad)", marginBottom: "20px" }}
          >
            Mobile &amp; Full-Stack · Tech Lead
          </p>
          <h1
            className="font-normal text-title"
            style={{
              fontSize: "clamp(5rem, 14vw, 16rem)",
              lineHeight: 0.78,
              letterSpacing: "-0.03em",
              marginBottom: "-0.1em",
            }}
          >
            build.
          </h1>
        </div>
      </div>

      {/* Half-wheel: center pinned to the right viewport edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2"
        style={{ right: "-80px", transform: "translate(50%, -50%)" }}
      >
        <div
          className="origin-center scale-[0.42] sm:scale-[0.62] lg:scale-100"
          style={{ width: `${RING_RADIUS * 2}px`, height: `${RING_RADIUS * 2}px` }}
        >
          <div ref={ringTrackRef} className="absolute inset-0">
            {floatingPreviews.map((preview, index) => {
              const isSecond = index === 1;
              return (
              <div
                key={index}
                className={`hero-float absolute left-1/2 top-1/2 ${
                  isSecond
                    ? "h-40 w-[15.25rem] sm:h-44 sm:w-[18.75rem] lg:h-48 lg:w-[17.75rem]"
                    : "h-44 w-[16.9rem] sm:h-48 sm:w-[20.75rem] lg:h-52 lg:w-[19.75rem]"
                }`}
              >
                <div className="hero-float-media h-full w-full">
                  <img
                    src={preview.src}
                    alt={preview.alt}
                    className="h-full w-full object-contain"
                    style={{
                      filter:
                        "drop-shadow(0 24px 48px rgba(0,0,0,0.22)) drop-shadow(0 6px 12px rgba(0,0,0,0.10))",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
