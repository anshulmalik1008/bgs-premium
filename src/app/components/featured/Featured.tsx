"use client";

import { motion } from "framer-motion";
import FeaturedCard from "./FeaturedCard";
import { featuredData } from "./featuredData";

export default function Featured() {
  return (
    <section
      className="
      relative
      overflow-hidden
      bg-[#050505]
      py-28
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        left-1/2
        top-0
        h-[500px]
        w-[500px]
        -translate-x-1/2
        rounded-full
        bg-[#D4AF37]/10
        blur-[180px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1550px] px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p
            className="
            mb-4
            text-sm
            uppercase
            tracking-[5px]
            text-[#D4AF37]
            "
          >
            Featured Collections
          </p>

          <h2
            className="
            text-5xl
            font-bold
            leading-tight
            text-white
            md:text-6xl
            "
          >
            Crafted For Every
            <br />
            Celebration
          </h2>

          <p
            className="
            mx-auto
            mt-8
            max-w-2xl
            text-lg
            leading-8
            text-zinc-400
            "
          >
            Discover thoughtfully curated luxury hampers,
            premium flowers and unforgettable gifting
            experiences for every special occasion.
          </p>
        </motion.div>

        {/* Grid */}

        <div
          className="
          grid
          gap-6
          md:grid-cols-4
          "
        >
          {featuredData.map((item) => (
            <FeaturedCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              href={item.href}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
