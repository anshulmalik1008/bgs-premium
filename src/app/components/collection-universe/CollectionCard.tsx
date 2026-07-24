"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { MouseEvent } from "react";

import type { CollectionItem } from "./collectionData";

type CollectionCardProps = {
  item: CollectionItem;
  index: number;
};

export default function CollectionCard({
  item,
  index,
}: CollectionCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXValue = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateYValue = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const rotateX = useSpring(rotateXValue, {
    stiffness: 180,
    damping: 20,
  });

  const rotateY = useSpring(rotateYValue, {
    stiffness: 180,
    damping: 20,
  });

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["20%", "80%"]);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 55,
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
        duration: 0.65,
        delay: Math.min(index * 0.055, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className="collection-card group relative h-[390px] cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:h-[420px]"
    >
      {/* Product image */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: "translateZ(25px)",
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />

      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/20 opacity-0 blur-[70px] transition-opacity duration-300 group-hover:opacity-100"
        style={{
          left: glowX,
          top: glowY,
        }}
      />

      {/* Moving shine */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-28 rotate-[28deg] bg-white/10 blur-2xl transition-transform duration-1000 group-hover:translate-x-[550px]" />

      {/* Badge */}
      {item.badge && (
        <motion.div
          style={{
            transform: "translateZ(55px)",
          }}
          className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 backdrop-blur-xl"
        >
          <Sparkles size={11} className="text-[#D4AF37]" />

          <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/75">
            {item.badge}
          </span>
        </motion.div>
      )}

      {/* Arrow */}
      <motion.button
        type="button"
        aria-label={`Explore ${item.title}`}
        whileHover={{
          scale: 1.1,
          rotate: 8,
        }}
        whileTap={{
          scale: 0.94,
        }}
        style={{
          transform: "translateZ(65px)",
        }}
        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white hover:text-black"
      >
        <ArrowUpRight size={17} />
      </motion.button>

      {/* Content */}
      <motion.div
        style={{
          transform: "translateZ(55px)",
        }}
        className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6"
      >
        <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
          {item.category}
        </p>

        <h3 className="mt-2 text-2xl font-medium leading-tight tracking-[-0.04em] text-white">
          {item.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/55">
          {item.description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80">
            Discover
          </span>

          <span className="h-px w-8 bg-[#D4AF37] transition-all duration-300 group-hover:w-14" />
        </div>
      </motion.div>

      {/* Border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/5 transition duration-500 group-hover:ring-[#D4AF37]/35" />
    </motion.article>
  );
}
