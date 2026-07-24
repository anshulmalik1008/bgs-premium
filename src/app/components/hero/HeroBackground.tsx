"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Base */}

      <div className="absolute inset-0 bg-[#F8F8F5]" />

      {/* Top Gold Glow */}

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -left-52
        -top-52
        h-[700px]
        w-[700px]
        rounded-full
        bg-[#D4AF37]/15
        blur-[180px]
        "
      />

      {/* Right White Glow */}

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -right-40
        top-20
        h-[650px]
        w-[650px]
        rounded-full
        bg-white
        blur-[170px]
        "
      />

      {/* Bottom Glow */}

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="
        absolute
        bottom-[-250px]
        left-1/2
        h-[600px]
        w-[600px]
        -translate-x-1/2
        rounded-full
        bg-[#D4AF37]/10
        blur-[180px]
        "
      />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Noise */}

      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

    </div>
  );
}
