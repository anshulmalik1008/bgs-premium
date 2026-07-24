"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Gift,
  Sparkles,
  X,
} from "lucide-react";

import { navLinks } from "../navData";

interface MobileMenuProps {
  close: () => void;
}

const menuVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
    rotateY: -8,
  },
  visible: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.07,
      delayChildren: 0.18,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    rotateY: -6,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function MobileMenu({
  close,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <motion.button
        type="button"
        aria-label="Close mobile menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={close}
        className="fixed inset-0 z-[110] cursor-default bg-black/75 backdrop-blur-xl"
      />

      {/* Menu Panel */}
      <motion.aside
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="
          fixed right-0 top-0 z-[120]
          h-[100dvh] w-full max-w-[440px]
          overflow-hidden border-l border-white/10
          bg-[#080808]/95 shadow-[-30px_0_100px_rgba(0,0,0,0.5)]
          backdrop-blur-3xl
          [perspective:1400px]
        "
      >
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[110px]" />

          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/[0.04] blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#fff_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
        </div>

        <div className="relative flex h-full flex-col">
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between border-b border-white/10 px-6 py-6"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotateY: [0, 14, 0, -14, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-12 w-12 items-center justify-center rounded-[17px] border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#E8C65A] shadow-[0_12px_35px_rgba(212,175,55,0.12)]"
              >
                <Gift size={21} strokeWidth={1.7} />
              </motion.div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">
                    BGS Luxury
                  </h2>

                  <Sparkles
                    size={13}
                    className="text-[#D4AF37]"
                  />
                </div>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                  Premium Gift Store
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={close}
              whileHover={{
                rotate: 90,
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.9,
              }}
              aria-label="Close menu"
              className="
                flex h-11 w-11 items-center justify-center
                rounded-[15px] border border-white/10
                bg-white/[0.06] text-white
                shadow-[0_12px_30px_rgba(0,0,0,0.22)]
                backdrop-blur-xl transition-colors
                hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/10
                hover:text-[#E8C65A]
              "
            >
              <X size={20} />
            </motion.button>
          </motion.div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <motion.div
              variants={itemVariants}
              className="mb-5 flex items-center justify-between px-1"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                Explore
              </p>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] text-white/40">
                {navLinks.length} categories
              </span>
            </motion.div>

            {/* Links */}
            <div className="space-y-2.5">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{
                    x: -4,
                    rotateY: -2,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    className="
                      group relative flex items-center justify-between
                      overflow-hidden rounded-[20px]
                      border border-white/[0.07]
                      bg-white/[0.035] px-5 py-4
                      shadow-[0_12px_35px_rgba(0,0,0,0.16)]
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:border-[#D4AF37]/25
                      hover:bg-[#D4AF37]/[0.08]
                    "
                  >
                    <div className="absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

                    <div className="relative z-10 flex items-center gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[13px] border border-white/[0.07] bg-white/[0.04] text-[10px] font-semibold text-white/40 transition-all duration-300 group-hover:border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/10 group-hover:text-[#E8C65A]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-[15px] font-medium tracking-[-0.01em] text-white/85 transition-colors duration-300 group-hover:text-white">
                        {item.title}
                      </span>
                    </div>

                    <motion.span
                      className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.04] text-white/35 transition-colors duration-300 group-hover:border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/10 group-hover:text-[#E8C65A]"
                      whileHover={{
                        x: 3,
                      }}
                    >
                      <ChevronRight size={16} />
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Premium CTA */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -4,
                rotateX: 1.5,
                rotateY: -1.5,
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
              className="
                relative mt-8 overflow-hidden rounded-[28px]
                border border-[#D4AF37]/20
                bg-gradient-to-br
                from-[#D4AF37]/15
                via-white/[0.035]
                to-transparent
                p-6 shadow-[0_24px_65px_rgba(0,0,0,0.24)]
              "
            >
              <motion.div
                animate={{
                  x: ["-20%", "120%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute inset-y-0 w-24 rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
              />

              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D4AF37]/15 blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1.5">
                  <Sparkles
                    size={12}
                    className="text-[#E8C65A]"
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#E8C65A]">
                    Exclusive
                  </span>
                </div>

                <h3 className="mt-5 max-w-[260px] text-[25px] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                  Luxury Gift Collection
                </h3>

                <p className="mt-3 max-w-[310px] text-[13px] leading-6 text-white/45">
                  Discover handcrafted premium gifts curated for every
                  unforgettable occasion.
                </p>

                <Link
                  href="/shop"
                  onClick={close}
                  className="
                    group mt-6 inline-flex items-center gap-3
                    rounded-full bg-[#D4AF37]
                    px-5 py-2.5 text-[13px] font-semibold
                    text-black shadow-[0_12px_35px_rgba(212,175,55,0.2)]
                    transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-[#E5C24E]
                  "
                >
                  Explore Collection

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight size={14} />
                  </span>
                </Link>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="pb-4 pt-7 text-center text-[9px] uppercase tracking-[0.22em] text-white/20"
            >
              Crafted for extraordinary moments
            </motion.p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
