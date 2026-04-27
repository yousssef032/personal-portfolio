"use client";

import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isScrollTriggerRegistered = false;

function registerScrollTrigger() {
  if (!isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }
}

export function useScrollReveal(selector = ".reveal") {
  useEffect(() => {
    registerScrollTrigger();

    const sections = gsap.utils.toArray<HTMLElement>(selector);
    if (!sections.length) return;

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 84%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [selector]);
}
