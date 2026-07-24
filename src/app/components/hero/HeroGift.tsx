"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function HeroGift() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useTransform(mouseX, [-300, 300], [-12, 12]);
  const rotateX = useTransform(mouseY, [-300, 300], [12, -12]);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 120,
    damping: 18,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <div className="relative hidden flex-1 items-center justify-center lg:flex">

      {/* Gold Glow */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
        absolute
        h-[520px]
        w-[520px]
        rounded-full
        bg-[#D4AF37]/20
        blur-[120px]
        "
      />

      {/* Shadow */}

      <motion.div
        animate={{
          scaleX: [1, 1.15, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
        absolute
        bottom-10
        h-12
        w-[280px]
        rounded-full
        bg-black/20
        blur-2xl
        "
      />

      {/* Gift */}

      <motion.div
      className="hero-gift relative"
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -20, 0],
          rotateZ: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        
      >
        <Image
          src="/images/hero/gift-box.webp"
          alt="Luxury Gift"
          width={650}
          height={650}
          priority
          className="select-none drop-shadow-[0_50px_80px_rgba(0,0,0,.18)]"
        />
      </motion.div>

    </div>
  );
}