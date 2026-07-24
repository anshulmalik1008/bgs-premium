"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { PremiumCategory } from "./premiumData";

type PremiumCategoryCardProps = {
  category: PremiumCategory;
  index: number;
};

export default function PremiumCategoryCard({
  category,
  index,
}: PremiumCategoryCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
      }}
      className="group relative min-w-[210px] overflow-hidden rounded-[26px] border border-white/70 bg-white/80 p-2.5 shadow-[0_18px_50px_rgba(31,24,18,0.08)] backdrop-blur-xl"
    >
      <div className="relative h-[158px] overflow-hidden rounded-[20px] bg-neutral-200">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="220px"
          className="object-cover transition duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {category.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-black/30 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
            {category.badge}
          </span>
        )}

        <motion.div
          whileHover={{
            rotate: 45,
          }}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-950 shadow-lg"
        >
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </motion.div>
      </div>

      <div className="px-2 pb-2 pt-4">
        <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-950">
          {category.title}
        </h3>

        <p className="mt-1 text-[11px] leading-5 text-neutral-500">
          {category.subtitle}
        </p>
      </div>
    </motion.article>
  );
}
