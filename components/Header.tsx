"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const links = [
  { name: "Work", id: "work" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
] as const;

let isScrollTriggerRegistered = false;

function registerScrollTrigger() {
  if (!isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }
}

export function Header() {
  const [active, setActive] = useState("");
  const shellRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerScrollTrigger();

    const handleScroll = () => {
      const sections = links.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach((section, i) => {
        if (
          section &&
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActive(links[i].id);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const shell = shellRef.current;
    const logo = logoRef.current;
    const linksEl = linksRef.current;
    const heroSection = document.getElementById("top");

    let ctx: ReturnType<typeof gsap.context> | null = null;

    if (shell && logo && linksEl && heroSection) {
      ctx = gsap.context(() => {
        const getFinalWidthPx = () => {
          const logoWidth = logo.offsetWidth;
          const linksWidth = linksEl.offsetWidth;
          const gapPx = parseFloat(getComputedStyle(shell).columnGap || "24");
          const horizontalPaddingPx = 24;
          const target =
            logoWidth + linksWidth + gapPx + horizontalPaddingPx * 2;
          const maxAllowed = window.innerWidth - 24;
          return Math.min(Math.ceil(target), maxAllowed);
        };

        const compactStyles = {
          width: () => `${getFinalWidthPx()}px`,
          borderRadius: "9999px",
          backgroundColor: "rgba(255,255,255,0.72)",
          borderColor: "rgba(0,0,0,0.06)",
          boxShadow: "0 10px 22px rgba(31,41,55,0.12)",
        };

        gsap.set([logo, linksEl], { x: 0 });

        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            const ringPinDistance = 980;

            gsap.set(shell, {
              width: "min(82rem, calc(100vw - 4rem))",
              borderRadius: "0.75rem",
              backgroundColor: "rgba(255,255,255,0)",
              borderColor: "rgba(0,0,0,0)",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
            });

            gsap.to(shell, {
              ...compactStyles,
              ease: "none",
              scrollTrigger: {
                trigger: heroSection,
                start: `top top-=${ringPinDistance}`,
                end: `top top-=${ringPinDistance + 800}`,
                scrub: 3,
                invalidateOnRefresh: true,
              },
            });
          },
          "(max-width: 1023px)": () => {
            gsap.set(shell, compactStyles);
          },
        });
      }, shell);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx?.revert();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 sm:top-6">
      <nav
        id="navbar-shell"
        ref={shellRef}
        className="flex items-center justify-between gap-4 border border-transparent px-4 py-2.5 shadow-none backdrop-blur-md sm:gap-6 sm:px-6 sm:py-3"
      >
        <button
          id="navbar-logo"
          ref={logoRef}
          type="button"
          onClick={() => scrollTo("top")}
          className="text-xl font-bold leading-none tracking-[-0.03em] text-title sm:text-2xl"
        >
          <span id="navbar-logo-text">
            YE
          </span>
        </button>

        <div ref={linksRef} className="flex gap-3 sm:gap-5">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={`text-sm transition-all duration-300 ${
                active === link.id
                  ? "font-medium text-title"
                  : "text-gray-500 hover:text-title"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
