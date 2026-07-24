"use client";

import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";

const words = [
  "Luxury",
  "Gifting",
  "Made",
  "Memorable.",
];

export default function HeroContent() {
  return (
    <div className="hero-content relative z-20 w-full max-w-[620px]">

      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="
        mb-8
        inline-flex
        items-center
        rounded-full
        border
        border-[#D4AF37]/30
        bg-white
        px-5
        py-2
        shadow-sm
        "
      >
        <span className="text-xs font-semibold uppercase tracking-[4px] text-[#B68A12]">
          Premium Luxury Gifts
        </span>
      </motion.div>

      {/* Heading */}

      <div className="space-y-1">

        {words.map((word, index) => (
          <motion.h1
            key={word}
            initial={{
              opacity: 0,
              y: 80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.12,
              duration: 0.8,
            }}
            className="
            text-[54px]
            font-bold
            leading-[0.9]
            tracking-[-3px]
            text-[#111111]

            sm:text-[72px]

            xl:text-[92px]
            "
          >
            {word}
          </motion.h1>
        ))}

      </div>

      {/* Description */}

      <motion.p
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .5,
        }}
        className="
        mt-10
        max-w-[520px]
        text-lg
        leading-9
        text-zinc-600
        "
      >
        Curated premium hampers, flowers and personalised gifts
        designed to celebrate life's most meaningful moments with
        elegance and timeless presentation.
      </motion.p>

      {/* Buttons */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .7,
        }}
        className="mt-12"
      >
        <HeroButtons />
      </motion.div>

    </div>
  );
}
