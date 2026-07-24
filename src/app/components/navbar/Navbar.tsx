"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Search, Sparkles } from "lucide-react";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import NavIcons from "./NavIcons";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  const lastScrollRef = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.5, 2.5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);

  const glowX = useTransform(smoothX, [-0.5, 0.5], ["15%", "85%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["15%", "85%"]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const previousScroll = lastScrollRef.current;

      setScrolled(currentScroll > 25);

      if (currentScroll > previousScroll && currentScroll > 160) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>,
  ) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function resetMousePosition() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <>
      <motion.header
        initial={{
          y: -130,
          opacity: 0,
        }}
        animate={{
          y: showNavbar ? 0 : -130,
          opacity: showNavbar ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div className="mx-auto max-w-[1550px]">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMousePosition}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              scale: scrolled ? 0.985 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative grid items-center gap-3 [perspective:1600px] lg:grid-cols-[auto_minmax(0,1fr)_auto]"
          >
            {/* Mouse glow */}
            <motion.div
              aria-hidden="true"
              style={{
                left: glowX,
                top: glowY,
              }}
              className="pointer-events-none absolute z-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[70px]"
            />

            {/* LEFT: Logo box */}
            <motion.div
              initial={{
                opacity: 0,
                x: -45,
                rotateY: -12,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -3,
                rotateY: 3,
                scale: 1.02,
              }}
              className={`
                pointer-events-auto relative z-10 flex h-[76px]
                items-center overflow-hidden rounded-[24px]
                border px-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]
                backdrop-blur-2xl transition-all duration-500
                ${
                  scrolled
                    ? "border-white/15 bg-[#111111]/80"
                    : "border-white/20 bg-black/35"
                }
              `}
              style={{
                transform: "translateZ(25px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/[0.03]" />

              <div className="absolute -left-6 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-amber-300/10 blur-2xl" />

              <div className="relative z-10">
                <Logo />
              </div>
            </motion.div>

            {/* CENTER: Menu and search */}
            <motion.div
              initial={{
                opacity: 0,
                y: -35,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -3,
                scale: 1.005,
              }}
              className={`
                pointer-events-auto relative z-20 hidden h-[76px]
                min-w-0 items-center gap-4 overflow-hidden
                rounded-[24px] border px-4
                shadow-[0_18px_60px_rgba(0,0,0,0.18)]
                backdrop-blur-2xl transition-all duration-500 lg:flex
                ${
                  scrolled
                    ? "border-white/15 bg-[#111111]/80"
                    : "border-white/20 bg-black/35"
                }
              `}
              style={{
                transform: "translateZ(40px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.08] via-transparent to-white/[0.05]" />

              <div className="relative z-10 min-w-0 flex-1">
                <DesktopMenu />
              </div>

              {/* Search bar */}
              <motion.button
                type="button"
                onClick={() => setSearchOpen(true)}
                whileHover={{
                  scale: 1.025,
                  y: -1,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group relative z-10 hidden h-[48px] min-w-[230px] max-w-[320px] flex-1 items-center gap-3 overflow-hidden rounded-[16px] border border-white/15 bg-white/[0.08] px-4 text-left text-white shadow-inner transition-colors duration-300 hover:bg-white/[0.12] xl:flex"
              >
                <motion.span
                  animate={{
                    rotate: [0, 6, 0, -6, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] bg-white/10 text-white"
                >
                  <Search size={15} strokeWidth={1.8} />
                </motion.span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-medium text-white/90">
                    Search premium gifts
                  </span>

                  <span className="block truncate text-[9px] text-white/40">
                    Flowers, hampers, cakes...
                  </span>
                </span>

                <span className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-[9px] text-white/45">
                  ⌘ K
                </span>

                <motion.span
                  aria-hidden="true"
                  initial={{ x: "-130%" }}
                  whileHover={{ x: "160%" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-20 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />
              </motion.button>
            </motion.div>

            {/* RIGHT: Icons box */}
            <motion.div
              initial={{
                opacity: 0,
                x: 45,
                rotateY: 12,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -3,
                rotateY: -3,
                scale: 1.02,
              }}
              className={`
                pointer-events-auto relative z-30 flex h-[76px]
                items-center overflow-hidden rounded-[24px]
                border px-3 shadow-[0_18px_60px_rgba(0,0,0,0.18)]
                backdrop-blur-2xl transition-all duration-500
                ${
                  scrolled
                    ? "border-white/15 bg-[#111111]/80"
                    : "border-white/20 bg-black/35"
                }
              `}
              style={{
                transform: "translateZ(28px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-amber-300/[0.04]" />

              <motion.div
                animate={{
                  opacity: [0.35, 0.8, 0.35],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-6 h-16 w-16 rounded-full bg-amber-300/10 blur-2xl"
              />

              <div className="relative z-10">
                <NavIcons
                  openMenu={() => setMobileOpen(true)}
                  openSearch={() => setSearchOpen(true)}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Small premium line */}
          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: scrolled ? 0 : 1,
              scaleX: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.45,
            }}
            className="pointer-events-none mx-auto mt-3 hidden w-[94%] items-center gap-3 lg:flex"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.3em] text-white/35">
              <Sparkles size={10} />
              Premium gifting experience
            </div>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu close={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
