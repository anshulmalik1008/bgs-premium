"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface FeaturedCardProps {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export default function FeaturedCard({
  title,
  subtitle,
  image,
  href,
}: FeaturedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover="hover"
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <Link
        href={href}
        className="
        relative
        block
        h-[420px]
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#111]
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
            duration: 0.7,
          }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={title}
            fill
            priority={false}
            className="object-cover"
          />
        </motion.div>

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Gold Hover Overlay */}

        <motion.div
          variants={{
            hover: {
              opacity: 1,
            },
          }}
          initial={{
            opacity: 0,
          }}
          className="
          absolute
          inset-0
          bg-[#D4AF37]/10
          "
        />

        {/* Border Glow */}

        <motion.div
          variants={{
            hover: {
              opacity: 1,
            },
          }}
          initial={{
            opacity: 0,
          }}
          className="
          absolute
          inset-0
          rounded-[32px]
          ring-1
          ring-[#D4AF37]/40
          "
        />

        {/* Content */}

        <div
          className="
          absolute
          bottom-0
          left-0
          right-0
          z-10
          p-8
          "
        >
          <p
            className="
            mb-3
            text-xs
            uppercase
            tracking-[4px]
            text-[#D4AF37]
            "
          >
            {subtitle}
          </p>

          <div className="flex items-center justify-between">
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
          h-12
          w-14
          -skew-x-12
          bg-white/20
          blur-xl
          "
        />
      </Link>
    </motion.div>
  );
}
