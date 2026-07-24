"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <motion.div
        animate={{
          x: [-120, 120, -120],
          y: [-60, 60, -60],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        left-[-250px]
        top-[-150px]
        h-[700px]
        w-[700px]
        rounded-full
        bg-purple-500/15
        blur-[180px]
        "
      />

      <motion.div
        animate={{
          x: [100, -80, 100],
          y: [80, -50, 80],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        right-[-220px]
        bottom-[-180px]
        h-[650px]
        w-[650px]
        rounded-full
        bg-[#D4AF37]/15
        blur-[180px]
        "
      />

      <motion.div
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
        absolute
        left-1/2
        top-1/2
        h-[500px]
        w-[500px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-cyan-400/10
        blur-[170px]
        "
      />

    </div>
  );
}
