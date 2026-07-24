"use client";
import { motion } from "motion/react";

import { useMemo } from "react";

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
};

export default function FloatingBackground() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 34 }, (_, index) => ({
      id: index,
      left: `${(index * 29) % 100}%`,
      top: `${(index * 41) % 100}%`,
      size: 1 + (index % 3),
      duration: 4 + (index % 5),
      delay: (index % 8) * 0.3,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dark luxury base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Central golden atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.22, 0.42, 0.22],
          x: ["-4%", "4%", "-4%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[650px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[170px]"
      />

      {/* Left aurora */}
      <motion.div
        animate={{
          x: ["-20%", "15%", "-20%"],
          y: ["0%", "10%", "0%"],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-56 top-[18%] h-[470px] w-[470px] rounded-full bg-yellow-700/10 blur-[150px]"
      />

      {/* Right aurora */}
      <motion.div
        animate={{
          x: ["15%", "-15%", "15%"],
          y: ["0%", "-12%", "0%"],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-52 bottom-[8%] h-[520px] w-[520px] rounded-full bg-orange-900/10 blur-[170px]"
      />

      {/* Top spotlight */}
      <div className="absolute left-1/2 top-[-35%] h-[580px] w-[900px] -translate-x-1/2 rounded-[50%] bg-white/[0.045] blur-[120px]" />

      {/* Vertical light ray */}
      <motion.div
        animate={{
          opacity: [0.05, 0.16, 0.05],
          x: ["-18%", "18%", "-18%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[-15%] h-[125%] w-[170px] -translate-x-1/2 rotate-[14deg] bg-gradient-to-b from-white/10 via-amber-300/5 to-transparent blur-[35px]"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.55'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          animate={{
            y: [0, -14, 0],
            x: [0, particle.id % 2 === 0 ? 7 : -7, 0],
            opacity: [0.18, 0.8, 0.18],
            scale: [1, 1.45, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-amber-200"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 12px rgba(251, 191, 36, 0.8)",
          }}
        />
      ))}

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.88)_100%)]" />
    </div>
  );
}
