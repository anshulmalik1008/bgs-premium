"use client";

import { motion } from "framer-motion";
import { Mouse } from "lucide-react";

export default function ScrollIndicator() {
  return (
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
        delay: 1.2,
      }}
      className="
      absolute
      bottom-8
      left-1/2
      hidden
      -translate-x-1/2
      lg:flex
      flex-col
      items-center
      gap-3
      "
    >
      <Mouse
        size={24}
        className="text-white/70"
      />

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="
        h-12
        w-[2px]
        rounded-full
        bg-gradient-to-b
        from-[#D4AF37]
        to-transparent
        "
      />

      <span className="text-[11px] uppercase tracking-[4px] text-zinc-500">
        Scroll
      </span>
    </motion.div>
  );
}
