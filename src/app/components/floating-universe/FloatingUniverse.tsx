"use client";

import type { MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import FloatingBackground from "./FloatingBackground";
import FloatingCard from "./FloatingCard";
import MouseLight from "./MouseLight";
import { floatingCards } from "./floatingData";

export default function FloatingUniverse() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 55,
    damping: 24,
    mass: 0.8,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 55,
    damping: 24,
    mass: 0.8,
  });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="floating-universe relative h-screen min-h-[720px] overflow-hidden bg-[#050505] text-white"
    >
      <FloatingBackground />
      <MouseLight />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-6 py-8 lg:px-10">
        <header className="relative z-40 flex shrink-0 items-start justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-amber-300/80">
              BGS Luxury Universe
            </p>

            <h2 className="mt-3 max-w-md text-3xl font-medium leading-none tracking-[-0.05em] lg:text-[42px]">
              Gifts floating beyond the ordinary.
            </h2>
          </div>

          <div className="hidden text-right lg:block">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
              Move your cursor
            </p>

            <p className="mt-1 text-xs text-white/60">
              Explore the collection in 3D
            </p>
          </div>
        </header>

        <div
          className="relative mt-4 min-h-0 flex-1"
          style={{
            perspective: "1600px",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative h-full w-full"
          >
            {floatingCards.map((item, index) => (
              <FloatingCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
