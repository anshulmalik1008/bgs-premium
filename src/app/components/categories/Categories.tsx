"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import { categoryData } from "./categoryData";

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#070707] py-32">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-10 h-[240px] w-[500px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[180px]" />

      {/* Noise */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1550px] px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mx-auto mb-10 max-w-xl text-center"
        >

          <p className="mb-4 text-sm uppercase tracking-[5px] text-[#D4AF37]">
            Luxury Categories
          </p>

          <h2 className="text-5xl font-bold leading-tight text-white md:text-6xl">
            Curated Gifts
            <br />
            For Every Occasion
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-lg leading-6 text-zinc-400">
            Explore handcrafted luxury gifting experiences
            designed for birthdays, anniversaries,
            corporate celebrations and unforgettable moments.
          </p>

        </motion.div>

        {/* Cards */}

        <div
          className="
          grid gap 
          gap-3

          md:grid-cols-4

          xl:grid-cols-5
          "
        >
          {categoryData.map((item) => (
            <CategoryCard
              key={item.id}
              title={item.title}
              image={item.image}
              href={`/collections/${item.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
