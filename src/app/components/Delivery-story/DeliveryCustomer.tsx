"use client";

import { motion } from "framer-motion";

export default function DeliveryCustomer() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, rotateY: 20 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{
        duration: 1,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      className="
        absolute bottom-[74px] right-[10%] z-40
        h-[420px] w-[160px]
        [transform-style:preserve-3d]
      "
    >
      <div className="absolute bottom-0 left-1/2 h-8 w-32 -translate-x-1/2 rounded-full bg-black/15 blur-xl" />

      {/* Hair behind */}
      <div className="absolute left-[26px] top-[42px] h-[175px] w-[110px] rounded-[58px_58px_44px_44px] bg-gradient-to-r from-[#251914] to-[#634133]" />

      {/* Legs */}
      <div className="absolute bottom-[27px] left-[36px] h-[180px] w-[40px] rounded-[21px] bg-gradient-to-r from-[#aa8b68] to-[#c4a682]" />
      <div className="absolute bottom-[27px] right-[25px] h-[180px] w-[40px] rounded-[21px] bg-gradient-to-r from-[#c5a986] to-[#a98a67]" />

      {/* Shoes */}
      <div className="absolute bottom-[5px] left-[22px] h-[35px] w-[69px] rounded-[48px_21px_20px_20px] bg-gradient-to-b from-[#fffdfa] to-[#ddd5cb] shadow-lg" />
      <div className="absolute bottom-[5px] right-[2px] h-[35px] w-[69px] rounded-[48px_21px_20px_20px] bg-gradient-to-b from-[#fffdfa] to-[#ddd5cb] shadow-lg" />

      {/* Body */}
      <div
        className="
          absolute left-[20px] top-[145px]
          h-[158px] w-[122px]
          rounded-[45px_45px_30px_30px]
          border border-white/60
          bg-gradient-to-br from-white via-[#f5eee4] to-[#d5c4ad]
          shadow-[inset_-10px_-9px_16px_rgba(78,53,28,0.08),0_22px_35px_rgba(61,40,18,0.12)]
        "
      />

      {/* Head */}
      <div
        className="
          absolute left-[43px] top-[43px]
          h-[95px] w-[81px]
          rounded-[46%]
          bg-gradient-to-br from-[#f1ba88] to-[#c97d4d]
        "
      >
        <div className="absolute left-[16px] top-[36px] h-[5px] w-[5px] rounded-full bg-[#2d211c]" />
        <div className="absolute left-[36px] top-[36px] h-[5px] w-[5px] rounded-full bg-[#2d211c]" />
        <div className="absolute left-[22px] top-[57px] h-[8px] w-[24px] rounded-full border-b-2 border-[#81432c]" />
      </div>

      {/* Front hair */}
      <div className="absolute left-[35px] top-[32px] h-[55px] w-[91px] -rotate-6 rounded-[58px_48px_24px_19px] bg-gradient-to-r from-[#2a1d17] to-[#503429]" />

      {/* Customer upper arm */}
<motion.div
  animate={{
    rotate: [-52, -56, -52],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="
    absolute left-[3px] top-[177px]
    h-[92px] w-[29px]
    origin-top rounded-full
    bg-gradient-to-r from-[#d88e5e] to-[#efad79]
  "
/>

{/* Customer forearm parcel ki taraf */}
<motion.div
  animate={{
    rotate: [-83, -87, -83],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="
    absolute -left-[44px] top-[226px]
    h-[91px] w-[27px]
    origin-top rounded-full
    bg-gradient-to-r from-[#d9905f] to-[#f1b17e]
  "
/>

{/* Hand */}
<div
  className="
    absolute -left-[89px] top-[268px]
    h-[29px] w-[31px]
    rounded-full
    bg-[#e9a36e]
    shadow-[inset_-4px_-3px_6px_rgba(100,42,16,0.12)]
  "
/>
    </motion.div>
  );
}
