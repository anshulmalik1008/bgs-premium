"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Luxury Hampers",
    desc: "Curated premium gifting",
    image: "/images/menu/hamper.jpg",
    href: "/shop/luxury-hampers",
  },
  {
    title: "Flower Collection",
    desc: "Elegant floral gifts",
    image: "/images/menu/flowers.jpg",
    href: "/shop/flowers",
  },
  {
    title: "Personalised",
    desc: "Unique custom gifts",
    image: "/images/menu/personalised.jpg",
    href: "/shop/personalised",
  },
  {
    title: "Corporate",
    desc: "Premium business gifting",
    image: "/images/menu/corporate.jpg",
    href: "/shop/corporate",
  },
];

export default function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.25 }}
      className="w-[1050px] overflow-hidden rounded-[32px] border border-white/10 bg-[#0f1013]/95 p-7 shadow-2xl backdrop-blur-3xl"
    >
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[4px] text-[#D4AF37]">
            BGS Luxury
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Explore Collections
          </h2>
        </div>

        <Link
          href="/shop"
          className="group flex items-center gap-2 text-sm text-zinc-300 transition hover:text-white"
        >
          View All
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.07,
            }}
          >
            <Link
              href={item.href}
              className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="space-y-2 p-5">
                <h3 className="text-lg font-semibold text-white transition group-hover:text-[#D4AF37]">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-zinc-400">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 pt-3 text-sm font-medium text-[#D4AF37]">
                  Explore

                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
