"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useRef } from "react";

export default function MouseLight() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 22,
    mass: 0.7,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 22,
    mass: 0.7,
  });

  useEffect(() => {
    const section = document.querySelector(
      ".floating-universe"
    ) as HTMLElement | null;

    if (!section) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();

      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      mouseX.set(-500);
      mouseY.set(-500);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      {/* Main cursor glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/12 blur-[110px]"
      />

      {/* Bright inner glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute left-0 top-0 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/10 blur-[55px]"
      />

      {/* Fine highlight ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute left-0 top-0 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/10 opacity-70 blur-[2px]"
      />

      {/* Small cursor core */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/70 shadow-[0_0_22px_rgba(253,230,138,0.85)]"
      />
    </div>
  );
}