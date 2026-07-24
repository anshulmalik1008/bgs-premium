"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { CategoryItem } from "./categoryData";

type CategorySceneProps = {
  item: CategoryItem;
  index: number;
};

export default function CategoryScene({
  item,
  index,
}: CategorySceneProps) {
  return (
    <article
      className="category-scene absolute inset-0 overflow-hidden"
      style={{
        background: item.background,
        color: item.textColor,
        zIndex: index + 1,
      }}
      data-index={index}
    >
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Large ambient glow */}
      <div
        className="category-glow pointer-events-none absolute right-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-[150px]"
        style={{
          backgroundColor: item.accent,
          opacity: 0.18,
        }}
      />

      {/* Oversized number */}
      {/* Premium Section Number */}
<div className="category-number absolute left-8 top-8 z-20 select-none">
  <span
    className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl"
    style={{
      color: item.accent,
      opacity: 0.14,
    }}
  >
    {item.number}
  </span>

  <div
    className="mt-3 h-[2px] w-14 rounded-full"
    style={{
      background: item.accent,
      opacity: 0.35,
    }}
  />
</div>

      <div className="relative z-10 mx-auto grid h-full max-w-[1500px] items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-14 xl:px-20">
        {/* Text side */}
        <div className="category-content relative z-20 max-w-xl">
          <div className="category-eyebrow flex items-center gap-4">
            <span
              className="h-px w-12"
              style={{
                backgroundColor: item.accent,
              }}
            />

            <p
              className="text-[10px] font-semibold uppercase tracking-[0.34em] sm:text-xs"
              style={{
                color: item.accent,
              }}
            >
              {item.eyebrow}
            </p>
          </div>

          <h2 className="category-title mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-[88px]">
            {item.title}
          </h2>

          <p className="category-description mt-6 max-w-lg text-base leading-7 opacity-70 sm:text-lg sm:leading-8">
            {item.description}
          </p>

          <motion.button
            type="button"
            whileHover={{
              x: 6,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="category-button mt-9 inline-flex items-center gap-4 rounded-full border border-current/15 bg-white/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-xl transition hover:bg-white/15"
          >
            Explore Collection

            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                backgroundColor: item.accent,
                color: "#111111",
              }}
            >
              <ArrowUpRight size={16} />
            </span>
          </motion.button>
        </div>

        {/* Image side */}
        <div className="relative flex h-[430px] items-center justify-center sm:h-[520px] lg:h-[620px]">
          <div className="category-image-shell relative h-[88%] w-[82%] max-w-[570px]">
            {/* Image shadow */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-[75%] -translate-x-1/2 rounded-full bg-black/25 blur-[45px]" />

            {/* Back ring */}
            <div
              className="category-ring absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                borderColor: `${item.accent}55`,
              }}
            />

            <div
              className="category-ring-secondary absolute left-1/2 top-1/2 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{
                borderColor: `${item.accent}35`,
              }}
            />

            {/* Product image */}
            <div className="category-image relative z-10 h-full w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.28)]"
              />
            </div>

            {/* Floating tag */}
            <motion.div
              animate={{
                y: [0, -9, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="category-tag absolute bottom-[12%] right-0 z-20 hidden rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white shadow-2xl backdrop-blur-xl sm:block"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-white/50">
                BGS Luxury
              </p>

              <p className="mt-1 text-sm font-semibold">
                Premium Selection
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
        <span
          className="h-[5px] w-16 rounded-full"
          style={{
            backgroundColor: item.accent,
          }}
        />

        <span className="text-[9px] font-semibold tracking-[0.24em] opacity-50">
          {item.number} / 06
        </span>
      </div>
    </article>
  );
}
