"use client";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Gift, Sparkles } from "lucide-react";

const float1 = {
  animate: {
    y: [0, -18, 0],
    rotate: [0, 2, 0],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const float2 = {
  animate: {
    y: [0, 16, 0],
    rotate: [0, -2, 0],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function FloatingElements() {
  return (
    <>
      {/* Premium Rating */}

      <motion.div
  animate={{
    y: [0, 16, 0],
    rotate: [0, -2, 0],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
  }}
  className="absolute right-[8%] top-[20%] z-20 hidden xl:block"
>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">

          <div className="mb-4 flex items-center gap-2">

            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={16}
                fill="#D4AF37"
                className="text-[#D4AF37]"
              />
            ))}

          </div>

          <h4 className="text-xl font-bold text-white">
            4.9/5
          </h4>

          <p className="mt-2 text-sm text-zinc-400">
            Rated by 50K+ customers
          </p>

        </div>
      </motion.div>

      {/* Premium Badge */}

      <motion.div
  animate={{
    y: [0, 16, 0],
    rotate: [0, -2, 0],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
  }}
  className="absolute right-[8%] top-[20%] z-20 hidden xl:block"
>
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-6 py-5 backdrop-blur-2xl">

          <div className="mb-3 flex items-center gap-2">

            <ShieldCheck
              size={20}
              className="text-[#D4AF37]"
            />

            <span className="text-sm font-medium text-[#D4AF37]">
              Premium Quality
            </span>

          </div>

          <p className="max-w-[180px] text-sm leading-6 text-zinc-300">
            Handcrafted luxury gifting for every celebration.
          </p>

        </div>
      </motion.div>

      {/* Floating Gift */}

      <motion.div
        animate={{
          y: [0, -22, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        bottom-[18%]
        left-[10%]
        z-20
        hidden
        lg:flex
        "
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl">

          <Gift
            size={34}
            className="text-[#D4AF37]"
          />

        </div>
      </motion.div>

      {/* Sparkles */}

      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
        absolute
        bottom-[20%]
        right-[14%]
        hidden
        lg:block
        "
      >
        <Sparkles
          size={36}
          className="text-[#D4AF37]"
        />
      </motion.div>

      {/* Mobile Floating Card */}

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
        absolute
        bottom-8
        left-1/2
        z-20
        w-[90%]
        max-w-sm
        -translate-x-1/2
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-5
        backdrop-blur-2xl
        lg:hidden
        "
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-[3px] text-[#D4AF37]">
              Luxury
            </p>

            <h3 className="mt-1 text-lg font-semibold text-white">
              Premium Gifts
            </h3>

          </div>

          <Gift
            size={28}
            className="text-[#D4AF37]"
          />

        </div>
      </motion.div>
    </>
  );
}
