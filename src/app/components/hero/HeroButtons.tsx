"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroButtons() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">

      {/* Primary */}

      <motion.div
        whileHover={{
          scale: 1.03,
          y: -2,
        }}
        whileTap={{
          scale: .98,
        }}
      >
        <Link
          href="/shop"
          className="
          group
          inline-flex
          h-14
          items-center
          gap-3
          rounded-full
          bg-[#111111]
          px-8
          text-[15px]
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-black
          hover:shadow-[0_20px_40px_rgba(0,0,0,.18)]
          "
        >
          Explore Collection

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>

      {/* Secondary */}

      <motion.div
        whileHover={{
          scale: 1.03,
          y: -2,
        }}
        whileTap={{
          scale: .98,
        }}
      >
        <Link
          href="/corporate"
          className="
          inline-flex
          h-14
          items-center
          rounded-full
          border
          border-black/10
          bg-white/70
          px-8
          text-[15px]
          font-semibold
          text-[#111]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-[#D4AF37]
          hover:bg-white
          "
        >
          Corporate Gifting
        </Link>
      </motion.div>

    </div>
  );
}
