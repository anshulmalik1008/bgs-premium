"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  image: string;
  href?: string;
}

export default function CategoryCard({
  title,
  image,
  href = "#",
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      whileHover="hover"
      className="group h-full"
    >
      <Link
        href={href}
        className="
        relative
        block
        h-[230px]
        overflow-hidden
        rounded-[36px]
        border
        border-white/10
        bg-[#0d0d0d]
        "
      >
        {/* Image */}

        <motion.div
          variants={{
            hover: {
              scale: 1.08,
            },
          }}
          transition={{
            duration: 0.8,
          }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

        {/* Gold Glow */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          variants={{
            hover: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.4,
          }}
          className="
          absolute
          inset-0
          bg-[#D4AF37]/10
          "
        />

        {/* Border Glow */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          variants={{
            hover: {
              opacity: 1,
            },
          }}
          className="
          absolute
          inset-0
          rounded-[36px]
          ring-1
          ring-[#D4AF37]/40
          "
        />

        {/* Floating Badge */}

        <motion.div
          whileHover={{
            y: -4,
          }}
          className="
          absolute
          left-6
          top-6
          rounded-full
          border
          border-white/10
          bg-black/40
          px-4
          py-2
          text-xs
          uppercase
          tracking-[3px]
          text-[#D4AF37]
          backdrop-blur-xl
          "
        >
          Premium
        </motion.div>

        {/* Bottom Content */}

        <div className="absolute bottom-0 left-0 right-0 z-10 p-8">

          <motion.h3
            variants={{
              hover: {
                y: -4,
              },
            }}
            className="
            text-3xl
            font-bold
            text-white
            "
          >
            {title}
          </motion.h3>

          <div className="mt-6 flex items-center justify-between">

            <p className="text-sm text-zinc-400">
              Explore Collection
            </p>

            <motion.div
              variants={{
                hover: {
                  x: 8,
                  rotate: 45,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="
              flex
              h-14
              w-14
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
                size={22}
                className="text-white"
              />
            </motion.div>

          </div>

        </div>

        {/* Shine Effect */}

        <motion.div
          initial={{
            x: "-150%",
          }}
          variants={{
            hover: {
              x: "220%",
            },
          }}
          transition={{
            duration: 1,
          }}
          className="
          absolute
          top-0
          h-full
          w-24
          -skew-x-12
          bg-white/20
          blur-xl
          "
        />
      </Link>
    </motion.div>
  );
}
