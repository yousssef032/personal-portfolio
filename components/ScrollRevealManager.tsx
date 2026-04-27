"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ScrollRevealManager() {
  useScrollReveal(".reveal");
  return null;
}
