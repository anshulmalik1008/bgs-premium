"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HeroSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 90,
    damping: 18,
  });

  const y = useSpring(mouseY, {
    stiffness: 90,
    damping: 18,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        left: x,
        top: y,
      }}
      className="
      pointer-events-none
      absolute
      h-[500px]
      w-[500px]
      rounded-full
      bg-[radial-gradient(circle,rgba(212,175,55,.18),transparent_70%)]
      blur-[90px]
      "
    />
  );
}
