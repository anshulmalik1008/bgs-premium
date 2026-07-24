"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

import type { FloatingCardItem } from "./floatingData";

type Props = {
  item: FloatingCardItem;
  index: number;
};

export default function FloatingCard({ item, index }: Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    {
      stiffness: 180,
      damping: 18,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    {
      stiffness: 180,
      damping: 18,
    }
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{
        y: [0, -18, 0],
      }}
      transition={{
        duration: 4 + (index % 4),
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.08,
        z: 200,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        left: item.desktop.left,
        top: item.desktop.top,
        width: item.desktop.width,
        height: item.desktop.height,
      }}
      className="group absolute cursor-pointer"
    >
      {/* Shadow */}
      <div className="absolute inset-0 rounded-[32px] bg-black blur-3xl opacity-50 translate-y-8 scale-95" />

      {/* Glass Card */}
      <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl">

        {/* Gold glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_center,rgba(212,175,55,.28),transparent_70%)]" />

        {/* Image */}
        <motion.div
          style={{
            transform: `translateZ(${item.desktop.depth}px)`,
          }}
          className="absolute inset-0"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Reflection */}
        <div className="pointer-events-none absolute -left-32 top-0 h-full w-24 rotate-[18deg] bg-white/15 blur-2xl transition duration-1000 group-hover:translate-x-[320px]" />

        {/* Badge */}
        {item.badge && (
          <div
            style={{
              transform: "translateZ(90px)",
            }}
            className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={11} className="text-amber-400" />

              <span className="text-[8px] uppercase tracking-[0.22em] text-white">
                {item.badge}
              </span>
            </div>
          </div>
        )}

        {/* Bottom */}
        <div
          style={{
            transform: "translateZ(110px)",
          }}
          className="absolute inset-x-0 bottom-0 p-5"
        >
          <p className="text-[8px] uppercase tracking-[0.25em] text-amber-300">
            {item.category}
          </p>

          <h3 className="mt-2 text-[20px] font-medium text-white">
            {item.title}
          </h3>

          <button className="mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl transition group-hover:bg-white group-hover:text-black">
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Border */}
        <div className="absolute inset-0 rounded-[32px] ring-1 ring-white/5 group-hover:ring-amber-400/40 transition duration-500" />
      </div>
    </motion.div>
  );
}
