"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { site } from "@/lib/site-content";

let isScrollTriggerRegistered = false;

function registerScrollTrigger() {
  if (!isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }
}

const floatingPreviews = [
  {
    src: "/projects/ring-feature.png",
    alt: "Featured project preview",
    size: "h-32 w-32",
    x: 0,
    y: -258,
    tilt: -4,
    fit: "cover",
    zoom: "scale-[1]",
    position: "center",
    offset: "translate-x-0",
    chrome: "none",
  },
  {
    src: "/projects/app-2.svg",
    alt: "Project preview two",
    size: "h-32 w-32",
    x: 224,
    y: -130,
    tilt: 4,
    fit: "cover",
    zoom: "scale-100",
    position: "center",
    offset: "translate-x-0",
    chrome: "ring",
  },
  {
    src: "/projects/ring-third.png",
    alt: "Third featured project preview",
    size: "h-32 w-32",
    x: 224,
    y: 130,
    tilt: 0,
    fit: "cover",
    zoom: "scale-[1.3]",
    position: "center",
    offset: "translate-x-0",
    chrome: "ring",
  },
  {
    src: "/projects/app-2.svg",
    alt: "Project preview four",
    size: "h-32 w-32",
    x: 0,
    y: 258,
    tilt: 5,
    fit: "cover",
    zoom: "scale-100",
    position: "center",
    offset: "translate-x-0",
    chrome: "ring",
  },
  {
    src: "/projects/ring-aws.png",
    alt: "AWS console project preview",
    size: "h-32 w-32",
    x: -224,
    y: 130,
    tilt: 4,
    fit: "cover",
    zoom: "scale-[1.8]",
    position: "center",
    offset: "-translate-x-[-15%]",
    chrome: "ring",
  },
  {
    src: "/projects/ring-cv.png",
    alt: "Computer vision project preview",
    size: "h-32 w-32",
    x: -224,
    y: -130,
    tilt: -5,
    fit: "cover",
    zoom: "scale-100",
    position: "center",
    offset: "translate-x-0",
    chrome: "ring",
  },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingWrapRef = useRef<HTMLDivElement>(null);
  const ringTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !contentRef.current ||
      !floatingWrapRef.current ||
      !ringTrackRef.current
    ) {
      return;
    }
    registerScrollTrigger();

    const section = sectionRef.current;
    const floatingWrap = floatingWrapRef.current;
    const ringTrack = ringTrackRef.current;

    const ctx = gsap.context(() => {
      gsap.set(ringTrack, { transformOrigin: "50% 50%", willChange: "transform" });
      const circles = gsap.utils.toArray<HTMLElement>(".hero-float", floatingWrap);
      const circleMedia = gsap.utils.toArray<HTMLElement>(
        ".hero-float-media",
        floatingWrap
      );

      const highlightLeftCircle = () => {
        if (!circles.length) return;
        const ringBounds = ringTrack.getBoundingClientRect();
        const ringCenterX = ringBounds.left + ringBounds.width / 2;

        let activeCircle: HTMLElement | null = null;
        let smallestX = Number.POSITIVE_INFINITY;

        circles.forEach((circle) => {
          const bounds = circle.getBoundingClientRect();
          const centerX = bounds.left + bounds.width / 2;
          const relativeX = centerX - ringCenterX;
          if (relativeX < smallestX) {
            smallestX = relativeX;
            activeCircle = circle;
          }
        });

        circles.forEach((circle) => {
          gsap.to(circle, {
            scale: circle === activeCircle ? 1.2 : 1,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      ScrollTrigger.matchMedia({
        "(max-width: 1023px)": () => {
          const mobileScrollTrigger = {
            trigger: section,
            start: "top top",
            end: "+=900",
            pin: section,
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: highlightLeftCircle,
            onRefresh: highlightLeftCircle,
          };

          const mobileTl = gsap.timeline({
            scrollTrigger: mobileScrollTrigger,
          });

          mobileTl.to(
            ringTrack,
            {
              rotate: 220,
              ease: "none",
            },
            0
          );

          circleMedia.forEach((media) => {
            mobileTl.to(
              media,
              {
                rotate: -220,
                ease: "none",
              },
              0
            );
          });
        },
        "(min-width: 1024px)": () => {
          const desktopPinTrigger = {
            trigger: section,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: section,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: highlightLeftCircle,
            onRefresh: highlightLeftCircle,
          };
          const desktopRotateTrigger = {
            trigger: section,
            start: "top top",
            end: "+=980",
            scrub: 1.4,
            invalidateOnRefresh: true,
          };

          gsap.to(ringTrack, {
            rotate: 220,
            ease: "none",
            scrollTrigger: desktopRotateTrigger,
          });

          circleMedia.forEach((media) => {
            gsap.to(media, {
              rotate: -220,
              ease: "none",
              scrollTrigger: desktopRotateTrigger,
            });
          });

          // Keep the hero pinned after ring rotation so the next section
          // can fully overlay before normal document scrolling resumes.
          ScrollTrigger.create(desktopPinTrigger);
        },
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-visible border-b border-black/[0.06] bg-surface pb-16 pt-24 sm:pb-24 sm:pt-28 lg:pb-16 lg:pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(107,79,58,0.14),rgba(107,79,58,0.06),transparent_72%)] blur-3xl sm:h-[36rem] sm:w-[36rem]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(500px,640px)]">
          <div
            ref={contentRef}
            className="relative min-w-0 text-center lg:text-left lg:-translate-y-36"
          >
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-title sm:text-4xl lg:max-w-2xl lg:text-[3rem] lg:leading-[0.98]">
              {site.name}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-[15px] lg:mx-0 lg:mt-5 lg:max-w-sm">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7 lg:mt-8 lg:justify-start lg:gap-4">
              <a
                href="#work"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(58,36,24,0.22)] transition hover:scale-[1.02] hover:bg-accent/90"
              >
                Builds
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/[0.12] bg-card px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/40 hover:text-accent"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div
            ref={floatingWrapRef}
            className="relative mt-2 h-[24rem] w-full overflow-visible sm:mt-0 sm:h-[30rem] lg:-ml-8 lg:-translate-y-32 lg:h-[54rem]"
            aria-hidden
          >
            <div className="relative mx-auto h-[24rem] w-[24rem] scale-[0.62] sm:h-[34rem] sm:w-[34rem] sm:scale-[0.82] lg:h-[54rem] lg:w-[54rem] lg:scale-100">
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-8 text-center">
                <p className="text-xs font-semibold text-title/80 sm:text-sm">
                  Mobile & Full-Stack Engineer | Tech Lead
                </p>
              </div>
              <div ref={ringTrackRef} className="absolute inset-0">
              {floatingPreviews.map((preview, index) => (
                <div
                  key={`${preview.src}-${index}`}
                  className={`hero-float absolute left-1/2 top-1/2 ${preview.size} overflow-hidden rounded-full shadow-[0_6px_14px_rgba(31,41,55,0.10)] transition-transform duration-300 hover:scale-105 ${
                    preview.chrome === "none" ? "" : "ring-1 ring-black/[0.04]"
                  }`}
                  style={{
                    transform: `translate(calc(-50% + ${preview.x}px), calc(-50% + ${preview.y}px)) rotate(${preview.tilt}deg)`,
                  }}
                >
                  <div className="hero-float-media h-full w-full">
                    <div
                      className={`hero-float-zoom h-full w-full transition-transform duration-300 ${preview.zoom} ${preview.offset}`}
                    >
                      <img
                        src={preview.src}
                        alt={preview.alt}
                        className="h-full w-full rounded-full object-cover"
                        style={{ objectPosition: preview.position }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
