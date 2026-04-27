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
        const isDesktop = window.innerWidth >= 1024;
        const ringPinDistance = 750;
        const shrinkStart = isDesktop
          ? `top top-=${ringPinDistance + 30}`
          : "top top+=24";
        const shrinkEnd = isDesktop
          ? `top top-=${ringPinDistance + 280}`
          : "top top-=240";

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

        gsap.set(shell, {
          width: "min(82rem, calc(100vw - 4rem))",
          borderRadius: "0.75rem",
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgba(0,0,0,0)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        });

        gsap.to(shell, {
          width: () => `${getFinalWidthPx()}px`,
          borderRadius: "9999px",
          backgroundColor: "rgba(255,255,255,0.72)",
          borderColor: "rgba(0,0,0,0.06)",
          boxShadow: "0 10px 22px rgba(31,41,55,0.12)",
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: shrinkStart,
            end: shrinkEnd,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.set([logo, linksEl], { x: 0 });
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
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <nav
        id="navbar-shell"
        ref={shellRef}
        className="flex items-center justify-between gap-6 border border-transparent px-6 py-3 shadow-none backdrop-blur-md"
      >
        <button
          id="navbar-logo"
          ref={logoRef}
          type="button"
          onClick={() => scrollTo("top")}
          className="text-2xl font-bold leading-none tracking-[-0.03em] text-title"
        >
          <span id="navbar-logo-text">
            YE
          </span>
        </button>

        <div ref={linksRef} className="flex gap-5">
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
