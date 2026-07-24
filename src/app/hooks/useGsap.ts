"use client";

import { useLayoutEffect, RefObject } from "react";
import { gsap } from "@/lib/gsap";

export default function useGsap(
  scope: RefObject<HTMLElement | null>,
  animation: () => void
) {
  useLayoutEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      animation();
    }, scope);

    return () => ctx.revert();

  }, [scope, animation]);
}
