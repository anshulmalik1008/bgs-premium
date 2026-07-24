"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

import { navLinks } from "../navData";
import MegaMenu from "./MegaMenu";

export default function DesktopMenu() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
      <div className="flex items-center gap-1 rounded-[18px] border border-white/[0.06] bg-white/[0.025] p-1.5">
        {navLinks.map((item, index) => {
          const isActive = active === item.title;

          return (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => {
                if (item.mega) {
                  setActive(item.title);
                }
              }}
              onMouseLeave={() => {
                if (item.mega) {
                  setActive(null);
                }
              }}
            >
              <motion.div
                whileHover={{
                  y: -2,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href={item.href}
                  className={`
                    group relative flex h-[46px]
                    items-center gap-1.5 overflow-hidden
                    rounded-[14px] px-3.5
                    transition-colors duration-300
                    ${
                      isActive
                        ? "bg-[#D4AF37]/10 text-[#E4C45B]"
                        : "text-white/75 hover:bg-white/[0.06] hover:text-white"
                    }
                  `}
                >
                  <span className="pointer-events-none absolute inset-0 translate-x-[-140%] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />

                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.6,
                    }}
                    className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.9)]"
                  />

                  <span className="relative z-10 whitespace-nowrap text-[12px] font-medium tracking-[0.02em] 2xl:text-[13px]">
                    {item.title}
                  </span>

                  {item.mega && (
                    <motion.span
                      animate={{
                        rotate: isActive ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="relative z-10"
                    >
                      <ChevronDown
                        size={14}
                        strokeWidth={1.8}
                        className={
                          isActive
                            ? "text-[#D4AF37]"
                            : "text-white/35"
                        }
                      />
                    </motion.span>
                  )}

                  <motion.span
                    initial={false}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    className="absolute inset-x-3 bottom-1 h-px origin-center bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                  />
                </Link>
              </motion.div>

              <AnimatePresence>
                {isActive && item.mega && (
                  <>
                    {/* Hover gap bridge */}
                    <div className="absolute left-1/2 top-full h-5 w-[180px] -translate-x-1/2" />

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 18,
                        scale: 0.96,
                        rotateX: -6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 12,
                        scale: 0.97,
                        rotateX: -4,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        absolute left-1/2 top-[calc(100%+18px)]
                        z-[150] -translate-x-1/2
                        [perspective:1400px]
                      "
                      style={{
                        transformOrigin: "top center",
                      }}
                    >
                      <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#D4AF37]/10 blur-[70px]" />

                      <div className="relative">
                        <MegaMenu />

                        <div className="pointer-events-none absolute left-1/2 top-[-8px] h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-[#0b0b0c]" />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="mx-1 h-6 w-px bg-white/10" />

        <motion.div
          animate={{
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden items-center gap-1.5 rounded-[12px] border border-[#D4AF37]/15 bg-[#D4AF37]/[0.07] px-3 py-2 text-[#D4AF37] 2xl:flex"
        >
          <Sparkles size={12} />

          <span className="text-[9px] font-semibold uppercase tracking-[0.16em]">
            Premium
          </span>
        </motion.div>
      </div>
    </nav>
  );
}
