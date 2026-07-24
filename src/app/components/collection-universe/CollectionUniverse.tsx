"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import CollectionCard from "./CollectionCard";
import { collectionData } from "./collectionData";

export default function CollectionUniverse() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.11),transparent_38%)]" />

      <motion.div
        animate={{
          x: ["-15%", "15%", "-15%"],
          y: ["0%", "10%", "0%"],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-[25%] h-[420px] w-[420px] rounded-full bg-[#D4AF37]/8 blur-[150px]"
      />

      <motion.div
        animate={{
          x: ["10%", "-12%", "10%"],
          y: ["0%", "-10%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 bottom-[15%] h-[460px] w-[460px] rounded-full bg-amber-700/10 blur-[160px]"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle,#ffffff 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-[1450px]">
        {/* Heading */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <Sparkles size={14} className="text-[#D4AF37]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
                Curated By BGS
              </p>
            </div>

            <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-[58px]">
              Twelve ways to make a moment unforgettable.
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.12,
            }}
            className="lg:justify-self-end"
          >
            <p className="max-w-md text-sm leading-7 text-white/50 sm:text-base">
              Move your cursor over each collection to explore its depth,
              detail and premium character.
            </p>

            <button
              type="button"
              className="group mt-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
            >
              View all collections

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </button>
          </motion.div>
        </div>

        {/* 12 cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collectionData.map((item, index) => (
            <CollectionCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
