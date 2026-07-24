"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link href="/">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <span className="text-lg font-bold text-[#C7A95A]">B</span>
        </div>

        <div className="leading-none">
          <h2 className="text-xl font-bold tracking-wide text-white">
            BGS
          </h2>

          <p className="text-[11px] uppercase tracking-[5px] text-zinc-400">
            Luxury
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
