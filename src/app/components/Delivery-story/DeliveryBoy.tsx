"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function DeliveryBoy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateY: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        duration: 1,
        delay: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      className="
        absolute bottom-[78px] left-[38%] z-[45]
        h-[420px] w-[180px]
        [transform-style:preserve-3d]
      "
    >
      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 h-8 w-36 -translate-x-1/2 rounded-full bg-black/20 blur-xl" />

      {/* Back arm */}
      <div className="absolute left-[25px] top-[160px] h-[126px] w-[31px] origin-top rotate-[17deg] rounded-full bg-gradient-to-r from-[#bd7245] to-[#e8a06b]" />

      {/* Legs */}
      <div className="absolute bottom-[28px] left-[48px] h-[170px] w-[40px] -rotate-2 rounded-[22px] bg-gradient-to-r from-[#171615] to-[#403c38]" />
      <div className="absolute bottom-[28px] right-[28px] h-[170px] w-[40px] rotate-2 rounded-[22px] bg-gradient-to-r from-[#3d3935] to-[#181716]" />

      {/* Shoes */}
      <div className="absolute bottom-[7px] left-[30px] h-[36px] w-[74px] -rotate-3 rounded-[50px_22px_22px_20px] bg-gradient-to-b from-white to-[#d8d5cf] shadow-lg" />
      <div className="absolute bottom-[7px] right-0 h-[36px] w-[74px] rotate-3 rounded-[50px_22px_22px_20px] bg-gradient-to-b from-white to-[#d8d5cf] shadow-lg" />

      {/* Body */}
      <div
        className="
          absolute left-[27px] top-[130px]
          h-[160px] w-[123px]
          rounded-[46px_46px_30px_30px]
          border border-white/20
          bg-gradient-to-r
          from-[#be8015]
          via-[#f0bd47]
          to-[#c68917]
          shadow-[inset_10px_8px_18px_rgba(255,255,255,0.25),0_22px_35px_rgba(72,45,4,0.18)]
        "
      >
        <div className="absolute left-1/2 top-8 -translate-x-1/2 text-center text-[#38250f]">
          <Gift size={24} className="mx-auto" />

          <p className="mt-1 text-[9px] font-bold tracking-[0.18em]">
            BGS
          </p>
        </div>
      </div>

      {/* Neck */}
      <div className="absolute left-[70px] top-[107px] h-36 w-36 rounded-xl bg-[#d78f5d]" />

      {/* Head */}
      <div
        className="
          absolute left-[48px] top-[37px]
          h-[94px] w-[84px]
          rounded-[44%_49%_46%_45%]
          bg-gradient-to-br from-[#efb27e] to-[#c77848]
          shadow-[inset_-9px_-7px_14px_rgba(95,42,13,0.14)]
        "
      >
        <div className="absolute right-[17px] top-[35px] h-[5px] w-[5px] rounded-full bg-[#251c18]" />
        <div className="absolute right-[-6px] top-[45px] h-[10px] w-[14px] rounded-full bg-[#cf8453]" />
        <div className="absolute right-[9px] top-[58px] h-[7px] w-[19px] rotate-[8deg] rounded-full border-b-2 border-[#713923]" />
      </div>

      {/* Hair */}
      <div className="absolute left-[45px] top-[31px] h-[40px] w-[90px] -rotate-3 rounded-[46px_46px_16px_21px] bg-gradient-to-r from-[#211813] to-[#453027]" />

      {/* Cap */}
      <div className="absolute left-[39px] top-[15px] h-[40px] w-[94px] -rotate-3 rounded-[50px_50px_19px_19px] bg-gradient-to-r from-[#c98e1d] to-[#efbe4d]" />
      <div className="absolute right-[15px] top-[42px] h-[12px] w-[53px] -rotate-6 rounded-full bg-[#ae7314]" />

      {/* Upper front arm */}
<motion.div
  animate={{
    rotate: [58, 62, 58],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="
    absolute left-[112px] top-[160px]
    h-[95px] w-[29px]
    origin-top rounded-full
    bg-gradient-to-r from-[#bd7044] to-[#e7a16d]
  "
/>

{/* Forearm parcel ki taraf */}
<motion.div
  animate={{
    rotate: [84, 88, 84],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="
    absolute left-[155px] top-[212px]
    h-[90px] w-[27px]
    origin-top rounded-full
    bg-gradient-to-r from-[#cd8150] to-[#efa975]
  "
/>

{/* Hand */}
<div
  className="
    absolute left-[224px] top-[256px]
    h-[29px] w-[31px]
    rounded-full
    bg-[#e9a36e]
    shadow-[inset_-4px_-3px_6px_rgba(100,42,16,0.12)]
  "
/>
      
       
    </motion.div>
  );
}
