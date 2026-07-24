"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 });

export default function Particles() {
  return (
    <>
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#D4AF37]"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.4,
          }}
          animate={{
            y: [-30, 30, -30],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
}
