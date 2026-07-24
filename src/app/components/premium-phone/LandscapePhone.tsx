"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BatteryFull,
  ChevronLeft,
  Search,
  Signal,
  Wifi,
} from "lucide-react";

import PremiumCategoryCard from "./PremiumCategoryCard";
import { premiumCategories } from "./premiumData";

export default function LandscapePhone() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [isPaused, setIsPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 22,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 22,
  });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsPaused(false);
  }

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const interval = window.setInterval(() => {
      if (isPaused) return;

      const maxScroll =
        slider.scrollWidth - slider.clientWidth;

      const nextScroll = slider.scrollLeft + 240;

      if (nextScroll >= maxScroll - 10) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollTo({
          left: nextScroll,
          behavior: "smooth",
        });
      }
    }, 2800);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsPaused(true)}
      className="relative flex w-full items-center justify-center [perspective:1800px]"
    >
      <div className="absolute h-[400px] w-[720px] rounded-full bg-[#dcbf88]/25 blur-[140px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 70,
          rotateX: 12,
          rotateY: -12,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[940px]"
      >
        <div className="relative aspect-[1.82/1] w-full rounded-[50px] border border-white/20 bg-gradient-to-br from-[#272727] via-[#080808] to-[#242424] p-[10px] shadow-[0_60px_140px_rgba(20,16,12,0.32)] sm:rounded-[68px] sm:p-[13px]">
          <div className="pointer-events-none absolute inset-[2px] rounded-[48px] border border-white/10 sm:rounded-[66px]" />

          <div className="absolute left-[17px] top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3 sm:left-[23px]">
            <div className="h-2.5 w-2.5 rounded-full bg-[#191919] ring-1 ring-white/10 sm:h-3 sm:w-3" />

            <div className="h-1.5 w-1.5 rounded-full bg-[#14243b] shadow-[0_0_8px_rgba(70,110,170,0.7)] sm:h-2 sm:w-2" />
          </div>

          <div className="relative h-full overflow-hidden rounded-[40px] bg-[#f4f1eb] sm:rounded-[55px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.95),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(218,190,142,0.22),transparent_45%)]" />

            <header className="relative z-10 flex items-center justify-between px-6 pb-3 pt-5 sm:px-10 sm:pb-5 sm:pt-7">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Go back"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/70 text-neutral-900 shadow-sm backdrop-blur-md"
                >
                  <ChevronLeft size={18} />
                </button>

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.26em] text-neutral-400 sm:text-[10px]">
                    BGS Luxury
                  </p>

                  <h3 className="mt-1 text-base font-semibold tracking-[-0.03em] text-neutral-950 sm:text-[24px]">
                    Premium Collection
                  </h3>
                </div>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <button
                  type="button"
                  aria-label="Search"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white/70 text-neutral-900 shadow-sm backdrop-blur-md"
                >
                  <Search size={17} />
                </button>

                <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white/65 px-4 py-2 shadow-sm backdrop-blur-md">
                  <span className="text-[11px] font-medium text-neutral-800">
                    9:41
                  </span>

                  <Signal size={13} />
                  <Wifi size={13} />
                  <BatteryFull size={16} />
                </div>
              </div>
            </header>

            <div className="relative z-10 flex items-center justify-between px-6 sm:px-10">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-neutral-950 px-3 py-1.5 text-[9px] font-medium text-white sm:text-[10px]">
                  Featured
                </span>

                <span className="rounded-full border border-neutral-200 bg-white/60 px-3 py-1.5 text-[9px] font-medium text-neutral-600 backdrop-blur-md sm:text-[10px]">
                  New arrivals
                </span>

                <span className="hidden rounded-full border border-neutral-200 bg-white/60 px-3 py-1.5 text-[10px] font-medium text-neutral-600 backdrop-blur-md md:block">
                  Best sellers
                </span>
              </div>

              <p className="hidden text-[10px] text-neutral-400 sm:block">
                Swipe to explore
              </p>
            </div>

            <div
              ref={sliderRef}
              className="relative z-10 mt-4 flex gap-4 overflow-x-auto px-6 pb-7 sm:mt-6 sm:gap-5 sm:px-10 sm:pb-10 [&::-webkit-scrollbar]:hidden"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {premiumCategories.map((category, index) => (
                <PremiumCategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>

            <div className="absolute bottom-2.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-neutral-900/80 sm:bottom-4 sm:w-32" />
          </div>

          <div className="absolute right-[-3px] top-[28%] h-20 w-1.5 rounded-l-full bg-neutral-800 sm:h-28" />

          <div className="absolute right-[-3px] top-[53%] h-12 w-1.5 rounded-l-full bg-neutral-800 sm:h-16" />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[94%] h-[130px] w-[82%] -translate-x-1/2 scale-y-[-1] rounded-[55px] bg-gradient-to-b from-black/15 to-transparent opacity-20 blur-2xl" />
      </motion.div>
    </div>
  );
}
