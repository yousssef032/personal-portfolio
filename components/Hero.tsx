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
    src: "/projects/app-1.svg",
    alt: "Project preview one",
    size: "h-32 w-32",
    x: 0,
    y: -236,
    tilt: -8,
  },
  {
    src: "/projects/app-2.svg",
    alt: "Project preview two",
    size: "h-32 w-32",
    x: 204,
    y: -118,
    tilt: 7,
  },
  {
    src: "/projects/app-3.svg",
    alt: "Project preview three",
    size: "h-32 w-32",
    x: 204,
    y: 118,
    tilt: -10,
  },
  {
    src: "/projects/app-2.svg",
    alt: "Project preview four",
    size: "h-32 w-32",
    x: 0,
    y: 236,
    tilt: 9,
  },
  {
    src: "/projects/app-3.svg",
    alt: "Project preview six",
    size: "h-32 w-32",
    x: -204,
    y: 118,
    tilt: 8,
  },
  {
    src: "/projects/app-2.svg",
    alt: "Project preview seven",
    size: "h-32 w-32",
    x: -204,
    y: -118,
    tilt: -9,
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
            scale: circle === activeCircle ? 1.3 : 1,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      ScrollTrigger.matchMedia({
        "(max-width: 1023px)": () => {
          const mobileTrigger = {
            trigger: floatingWrap,
            start: "top 92%",
            end: "bottom top",
            scrub: 1.1,
            invalidateOnRefresh: true,
            onUpdate: highlightLeftCircle,
            onRefresh: highlightLeftCircle,
          };
          const mobileCircleTrigger = {
            trigger: floatingWrap,
            start: "top 92%",
            end: "bottom top",
            scrub: 1.1,
            invalidateOnRefresh: true,
          };

          gsap.to(ringTrack, {
            rotate: 220,
            ease: "none",
            scrollTrigger: mobileTrigger,
          });

          circles.forEach((circle) => {
            gsap.to(circle, {
              rotate: -220,
              ease: "none",
              scrollTrigger: mobileCircleTrigger,
            });
          });
        },
        "(min-width: 1024px)": () => {
          const desktopTrigger = {
            trigger: section,
            start: "top top",
            end: "+=950",
            scrub: 1.4,
            pin: section,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: highlightLeftCircle,
            onRefresh: highlightLeftCircle,
          };
          const desktopCircleTrigger = {
            trigger: section,
            start: "top top",
            end: "+=950",
            scrub: 1.4,
            invalidateOnRefresh: true,
          };

          gsap.to(ringTrack, {
            rotate: 220,
            ease: "none",
            scrollTrigger: desktopTrigger,
          });

          circles.forEach((circle) => {
            gsap.to(circle, {
              rotate: -220,
              ease: "none",
              scrollTrigger: desktopCircleTrigger,
            });
          });
        },
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-visible border-b border-black/[0.06] bg-surface pb-24 pt-20 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(107,79,58,0.14),rgba(107,79,58,0.06),transparent_72%)] blur-3xl sm:h-[36rem] sm:w-[36rem]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
          <div ref={contentRef} className="relative min-w-0 lg:-translate-y-16">
            <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.03em] text-title sm:text-6xl lg:text-[4.25rem] lg:leading-[0.95]">
              {site.name}
            </h1>
            {/* <p className="mt-3 max-w-3xl text-lg font-medium text-title/90 sm:text-xl">
              {site.title}
            </p> */}
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {site.description}
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(58,36,24,0.22)] transition hover:scale-[1.02] hover:bg-accent/90"
              >
                View Selected Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-black/[0.12] bg-card px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-accent/40 hover:text-accent"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div
            ref={floatingWrapRef}
            className="relative -translate-y-7 mt-0 h-[28rem] w-full overflow-hidden pt-0 sm:h-[32rem] sm:pt-0 lg:-ml-40 lg:-translate-y-12 lg:h-[44rem] lg:overflow-visible lg:pt-0"
            aria-hidden
          >
            <div
              className="relative mx-auto h-[28rem] w-[28rem] scale-[0.76] sm:h-[34rem] sm:w-[34rem] sm:scale-[0.84] lg:h-[42rem] lg:w-[42rem] lg:scale-100"
            >
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-8 text-center">
                <p className="text-sm font-semibold text-title/80">
                  Mobile & Full-Stack Engineer | Tech Lead
                </p>
              </div>
              <div ref={ringTrackRef} className="absolute inset-0">
              {floatingPreviews.map((preview, index) => (
                <div
                  key={`${preview.src}-${index}`}
                  className={`hero-float absolute left-1/2 top-1/2 ${preview.size} rounded-full shadow-[0_12px_28px_rgba(31,41,55,0.16)] ring-1 ring-black/[0.08] transition-transform duration-300 hover:scale-105`}
                  style={{
                    transform: `translate(calc(-50% + ${preview.x}px), calc(-50% + ${preview.y}px)) rotate(${preview.tilt}deg)`,
                  }}
                >
                  <img
                    src={preview.src}
                    alt={preview.alt}
                    className="h-full w-full rounded-full object-cover"
                    loading="lazy"
                  />
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
