"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseSpotlight() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const x = useSpring(mouseX, {
    stiffness: 120,
    damping: 25,
  });

  const y = useSpring(mouseY, {
    stiffness: 120,
    damping: 25,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 220);
      mouseY.set(e.clientY - 220);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        left: x,
        top: y,
      }}
      className="
      pointer-events-none
      fixed
      z-[1]
      h-[440px]
      w-[440px]
      rounded-full
      bg-[#D4AF37]/10
      blur-[120px]
      mix-blend-screen
      "
    />
  );
}
