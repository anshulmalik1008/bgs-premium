"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Sparkles } from "lucide-react";

const words = ["Luxury", "Gifting", "Made", "Memorable."];

export default function HeroContent() {
  return (
    <div className="hero-content relative z-20 w-full max-w-[640px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/85 px-5 py-2.5 shadow-sm backdrop-blur-xl"
      >
        <Sparkles size={14} className="text-[#B68A12]" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B68A12] sm:text-xs">
          Premium Luxury Gifts
        </span>
      </motion.div>

      <div className="space-y-0">
        {words.map((word, index) => (
          <motion.h1
            key={word}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.12,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[48px] font-bold leading-[0.9] tracking-[-3px] text-[#111111] sm:text-[68px] lg:text-[82px] xl:text-[92px]"
          >
            {word}
          </motion.h1>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 max-w-[550px] text-[15px] leading-8 text-zinc-600 sm:mt-10 sm:text-lg sm:leading-9"
      >
        Curated premium hampers, flowers and personalised gifts designed to
        celebrate life&apos;s most meaningful moments with elegance and
        timeless presentation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-9 flex w-full flex-col gap-3 sm:mt-12 sm:flex-row"
      >
        <Link
          href="/shop"
          className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full bg-[#171717] px-7 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(23,23,23,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-black"
        >
          Explore Collection
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="/shop?category=Corporate"
          className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full border border-black/10 bg-white/75 px-7 text-sm font-semibold text-[#5f5b52] shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:text-[#9a7419]"
        >
          <Building2 size={17} />
          Corporate Gifting
        </Link>
      </motion.div>
    </div>
  );
}
