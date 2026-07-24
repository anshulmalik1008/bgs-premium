"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function DeliveryBike() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -350 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="
  absolute bottom-[78px] left-[1%] z-[25]
  h-[260px] w-[350px]
  origin-bottom-left
  max-xl:scale-[0.9]
"

    >
      {/* Back wheel */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute bottom-0 left-[18px]
          h-[88px] w-[88px]
          rounded-full border-[12px] border-[#24211f]
          bg-[#45413d]
          shadow-[0_18px_28px_rgba(0,0,0,0.25)]
        "
      >
        <div className="absolute inset-[16px] rounded-full border-[4px] border-[#cbc7bf]" />
        <div className="absolute inset-[28px] rounded-full bg-[#211f1d]" />
      </motion.div>

      {/* Front wheel */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute bottom-0 right-[16px]
          h-[88px] w-[88px]
          rounded-full border-[12px] border-[#24211f]
          bg-[#45413d]
          shadow-[0_18px_28px_rgba(0,0,0,0.25)]
        "
      >
        <div className="absolute inset-[16px] rounded-full border-[4px] border-[#cbc7bf]" />
        <div className="absolute inset-[28px] rounded-full bg-[#211f1d]" />
      </motion.div>

      {/* Bike body */}
      <div
        className="
          absolute bottom-[48px] left-[70px]
          h-[88px] w-[178px]
          -skew-x-6 rounded-[46px_20px_38px_38px]
          border border-white/25
          bg-gradient-to-br
          from-[#f1cd62]
          via-[#dca82c]
          to-[#996513]
          shadow-[inset_0_8px_14px_rgba(255,255,255,0.32),0_25px_35px_rgba(80,50,3,0.24)]
        "
      />

      {/* Front cover */}
      <div
        className="
          absolute bottom-[83px] right-[28px]
          h-[104px] w-[55px]
          -rotate-[8deg] rounded-[27px]
          bg-gradient-to-r from-[#b77b15] to-[#efca64]
        "
      />

      {/* Seat */}
      <div
        className="
          absolute bottom-[130px] left-[120px]
          h-[25px] w-[98px]
          -rotate-3 rounded-full
          bg-gradient-to-b from-[#37302c] to-[#181514]
        "
      />

      {/* Handle */}
      <div className="absolute bottom-[185px] right-[35px] h-[8px] w-[65px] -rotate-[10deg] rounded-full bg-[#25211e]" />
      <div className="absolute bottom-[169px] right-[48px] h-[54px] w-[7px] -rotate-[12deg] rounded-full bg-[#312d29]" />

      {/* Light */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 12px rgba(255,224,140,.45)",
            "0 0 36px rgba(255,224,140,.95)",
            "0 0 12px rgba(255,224,140,.45)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute bottom-[132px] right-[18px]
          h-12 w-10 rounded-full
          border-[5px] border-[#28231f]
          bg-[#ffe7a5]
        "
      />

      {/* Delivery box */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute bottom-[145px] left-[38px]
          flex h-[116px] w-[110px]
          flex-col items-center justify-center
          rounded-[24px]
          border border-white/10
          bg-gradient-to-br from-[#35271e] to-[#15100d]
          text-[#e9c35d]
          shadow-[0_24px_40px_rgba(0,0,0,0.24)]
        "
      >
        <Gift size={31} />

        <span className="mt-2 text-[11px] font-bold tracking-[0.18em]">
          BGS
        </span>

        <span className="text-[7px] tracking-[0.22em]">
          LUXURY
        </span>
      </motion.div>
    </motion.div>
  );
}
