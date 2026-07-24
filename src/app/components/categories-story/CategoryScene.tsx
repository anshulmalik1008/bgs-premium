"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import type { CategoryItem } from "./categoryData";

type CategorySceneProps = {
  item: CategoryItem;
  index: number;
  total: number;
};

export default function CategoryScene({
  item,
  index,
  total,
}: CategorySceneProps) {
  return (
    <article
      className="category-scene absolute inset-0 overflow-hidden"
      style={{
        background: item.background,
        color: item.textColor,
        zIndex: index + 1,
      }}
      data-scene-index={index}
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Top light */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />

      {/* Main category glow */}
      <div
        className="category-glow pointer-events-none absolute right-[6%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-[150px] sm:h-[560px] sm:w-[560px]"
        style={{
          backgroundColor: item.accent,
          opacity: 0.2,
        }}
      />

      {/* Large background number */}
      <div className="category-number absolute left-8 top-8 z-20">
  <span
    className="text-5xl font-medium tracking-[-0.05em] xl:text-6xl"
    style={{
      color: item.accent,
      opacity: 0.12,
    }}
  >
    {item.number}
  </span>

  <div
    className="mt-3 h-[2px] w-14 rounded-full"
    style={{
      background: item.accent,
      opacity: 0.4,
    }}
  />
</div>


      {/* Background vertical label */}
      <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] font-semibold uppercase tracking-[0.38em] opacity-30 lg:block">
        BGS Luxury Collection
      </div>

      <div className="relative z-10 mx-auto grid h-full max-w-[1500px] items-center gap-24 xl:gap-32 px-5 pb-16 pt-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12 lg:px-14 lg:py-16 xl:px-20">
        {/* Content */}
        <div className="category-content relative z-20 max-w-xl">
          <div className="category-eyebrow flex items-center gap-4">
            <span
              className="h-px w-10 sm:w-14"
              style={{
                backgroundColor: item.accent,
              }}
            />

            <p
              className="text-[9px] font-semibold uppercase tracking-[0.3em] sm:text-[11px]"
              style={{
                color: item.accent,
              }}
            >
              {item.eyebrow}
            </p>
          </div>

          <h2  className="category-title mt-8 max-w-[760px]
text-5xl
lg:text-6xl
xl:text-7xl
font-medium
leading-[0.95]
tracking-[-0.05em]">
            {item.title}
          </h2>

          <p className="category-description mt-7
max-w-[520px]
text-lg
leading-8
text-current/65" >
            {item.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.button
              type="button"
              whileHover={{
                x: 5,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="category-button group inline-flex items-center gap-4 rounded-full border border-current/15 bg-white/10 py-2.5 pl-5 pr-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl transition-colors duration-300 hover:bg-white/15 sm:text-[10px]"
            >
              Explore Collection

              <span
                className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
                style={{
                  backgroundColor: item.accent,
                  color: "#111111",
                }}
              >
                <ArrowUpRight size={16} />
              </span>
            </motion.button>

            <div className="category-meta hidden items-center gap-3 sm:flex">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: item.accent,
                }}
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] opacity-50">
                Premium Selection
              </span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex h-[360px] items-center justify-center sm:h-[470px] lg:h-[620px]">
          <div className="category-image-shell relative h-[92%] w-[90%] max-w-[540px] rounded-[42px] overflow-hidden">
            {/* Image shadow */}
            <div className="pointer-events-none absolute bottom-[2%] left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-full bg-black/30 blur-[42px]" />

            {/* Glow behind product */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
              style={{
                backgroundColor: item.accent,
                opacity: 0.16,
              }}
            />

            {/* Rings */}
            <div
              className="category-ring absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                borderColor: `${item.accent}66`,
              }}
            >
              <span
                className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                style={{
                  backgroundColor: item.accent,
                  boxShadow: `0 0 24px ${item.accent}`,
                }}
              />
            </div>

            <div
              className="category-ring-secondary absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{
                borderColor: `${item.accent}40`,
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

            {/* Top floating label */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="category-tag absolute right-[2%] top-10 right-10 z-20 hidden rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white shadow-2xl backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-2">
                <Sparkles
                  size={13}
                  style={{
                    color: item.accent,
                  }}
                />

                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  BGS Exclusive
                </p>
              </div>

              <p className="mt-1.5 text-sm font-semibold">
                Premium Selection
              </p>
            </motion.div>

            {/* Bottom glass card */}
            <motion.div
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="category-detail-card absolute bottom-[8%] left-[1%] z-20 hidden min-w-[180px] rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-white shadow-2xl backdrop-blur-xl lg:block"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Collection
              </p>

              <div className="mt-2 flex items-center justify-between gap-5">
                <p className="text-sm font-semibold">{item.title}</p>

                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: item.accent,
                    boxShadow: `0 0 16px ${item.accent}`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scene counter */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
        <span
          className="h-[4px] w-12 rounded-full sm:w-16"
          style={{
            backgroundColor: item.accent,
          }}
        />

        <span className="text-[8px] font-semibold tracking-[0.24em] opacity-50 sm:text-[9px]">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/10 to-transparent" />
    </article>
  );
}
