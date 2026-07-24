"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  image: string;
}

export default function ShowcaseCard({
  title,
  subtitle,
  image,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -15,
        rotateX: 4,
        rotateY: -4,
      }}
      transition={{
        duration: .45,
      }}
      className="
      relative
     h-[340px]
w-[240px]
xl:h-[360px]
xl:w-[250px]
2xl:h-[380px]
2xl:w-[270px]

      shrink-0
      overflow-hidden
      rounded-[28px]
      border
      border-white/10
      bg-[#0b0b0b]
      "
    >
      <Image
        src={image}
        alt={title}
        fill
        className="
        object-cover
        transition-transform
        duration-700
        hover:scale-110
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>

      <div className="absolute left-5 top-5 rounded-full bg-black/40 px-5 py-2 backdrop-blur-xl">
        <p className="text-xs tracking-[3px] uppercase text-[#D4AF37]">
          {subtitle}
        </p>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">

        <div>

          <h3 className="text-xl xl:text-2xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-3 text-zinc-400">
            Discover Collection
          </p>

        </div>

        <motion.div
          whileHover={{
            rotate:45,
          }}
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/10
          backdrop-blur-xl
          "
        >
          <ArrowUpRight
            className="text-white"
          />
        </motion.div>

      </div>

    </motion.div>
  );
}
