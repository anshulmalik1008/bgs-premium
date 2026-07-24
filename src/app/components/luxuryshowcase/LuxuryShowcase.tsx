"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ShowcaseCard from "./ShowcaseCard";
import { showcaseData } from "./showcaseData";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add("(min-width: 1024px)", () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - track.parentElement!.clientWidth + 220);

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1.1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        horizontalTween.kill();
      };
    });

    ScrollTrigger.refresh();

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505]"
    >
      {/* Desktop layout */}
      <div className="relative hidden h-screen overflow-hidden lg:block">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#20180a_0%,#0b0b0b_45%,#050505_100%)]" />

        <div className="absolute left-1/2 top-1/2 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[220px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle,#fff 1px,transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative z-20 flex h-full">
          {/* Left content */}
          <div className="flex w-[38%] shrink-0 items-center px-12 xl:pl-20 2xl:pl-24">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="mb-5 text-xs font-semibold uppercase tracking-[0.38em] text-[#D4AF37]"
              >
                Luxury Showcase
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-white xl:text-6xl 2xl:text-7xl"
              >
                Crafted
                <br />
                Beyond
                <br />
                Ordinary
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.16 }}
                className="mt-7 max-w-md text-base leading-7 text-zinc-400 xl:text-lg xl:leading-8"
              >
                Premium flowers, handcrafted hampers, imported perfumes,
                designer cakes and unforgettable gifting experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: 90 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="mt-8 h-px bg-gradient-to-r from-[#D4AF37] to-transparent"
              />
            </div>
          </div>

          {/* Horizontal track area */}
          <div className="relative flex w-[62%] items-center overflow-hidden">
            <div
              ref={trackRef}
              className="flex w-max items-center gap-7 pr-[22vw] will-change-transform xl:gap-9"
            >
              {showcaseData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 70,
                    scale: 0.94,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: Math.min(index * 0.08, 0.3),
                  }}
                  className="relative shrink-0"
                >
                  <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[100px]" />

                  <ShowcaseCard
                    title={item.title}
                    subtitle={item.subtitle}
                    image={item.image}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-[35%] z-30 w-32 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />

        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-36 bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent" />

        {/* Scroll indicator */}
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute bottom-9 left-12 z-40 xl:left-20 2xl:left-24"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
            Scroll to explore →
          </p>
        </motion.div>
      </div>

      {/* Mobile and tablet layout */}
      <div className="relative px-5 py-20 sm:px-8 sm:py-24 lg:hidden">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle,#fff 1px,transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="mb-12 sm:mb-14"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
              Luxury Showcase
            </p>

            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl">
              Crafted
              <br />
              Beyond Ordinary
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
              Premium flowers, handcrafted hampers, imported perfumes,
              designer cakes and unforgettable gifting experiences.
            </p>
          </motion.div>

          <div className="space-y-7">
            {showcaseData.map((item, index) => (
              <motion.div
                key={`mobile-${item.id}`}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.18,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                }}
              >
                <ShowcaseCard
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.image}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
