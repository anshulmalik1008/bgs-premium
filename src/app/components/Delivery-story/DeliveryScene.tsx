"use client";

import { motion } from "framer-motion";
import {
  Check,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";

import DeliveryBike from "./DeliveryBike";
import DeliveryBoy from "./DeliveryBoy";
import DeliveryCustomer from "./DeliveryCustomer";
import DeliveryParcel from "./DeliveryParcel";

export default function DeliveryScene() {
  return (
    <div
      className="
        relative min-h-[650px] w-full
        overflow-hidden rounded-[34px]
        bg-gradient-to-br
        from-[#fffdf9]
        via-[#f5ecde]
        to-[#e8d5b8]
        [perspective:1600px]
      "
    >
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute bottom-20 left-1/2
          h-[420px] w-[560px]
          -translate-x-1/2 rounded-full
          bg-[#deb34e]/25 blur-[110px]
        "
      />

      {/* Animated route */}
      <svg
        viewBox="0 0 700 500"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <motion.path
          d="M55 220 C130 90 290 65 390 165 C485 260 565 220 650 90"
          stroke="#B78A2E"
          strokeWidth="3"
          strokeDasharray="9 13"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.5, delay: 0.4 }}
          viewport={{ once: true }}
        />
      </svg>

      {/* House */}
      <motion.div
        initial={{ opacity: 0, x: 90 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="absolute bottom-[53px] right-0 z-10 h-[450px] w-[280px]"
      >
        <div
          className="
            absolute bottom-0 right-0
            h-[400px] w-[260px]
            rounded-t-[70px]
            bg-gradient-to-br
            from-[#f3e8d6]
            via-[#dfc9a7]
            to-[#b99a6f]
            shadow-[inset_-25px_-18px_38px_rgba(78,47,14,0.13),0_40px_70px_rgba(55,35,12,0.15)]
          "
        />

        <div
          className="
            absolute right-[-12px] top-3
            h-[110px] w-[292px]
            origin-bottom-right rotate-[7deg]
            rounded-[38px]
            bg-gradient-to-br from-[#e4bd5b] to-[#9f6818]
          "
        />

        <div
          className="
            absolute bottom-0 right-[43px]
            h-[320px] w-[150px]
            rounded-t-[68px]
            border-[7px] border-[#2c1d16]
            bg-gradient-to-r
            from-[#17100d]
            via-[#3d291e]
            to-[#18100d]
          "
        >
          <div className="absolute left-5 right-5 top-16 h-[74px] rounded-[25px] border border-white/10" />
          <div className="absolute left-5 right-5 top-[155px] h-[102px] rounded-[25px] border border-white/10" />
          <div className="absolute right-5 top-[176px] h-3 w-3 rounded-full bg-[#e0b54d] shadow-[0_0_16px_#e0b54d]" />
        </div>
      </motion.div>

      {/* Floating icons */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [0, -7, 7, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute right-[9%] top-[13%] z-40
          flex h-14 w-14 items-center justify-center
          rounded-2xl border border-white/70
          bg-white/70 text-[#ad7d25]
          shadow-[0_20px_50px_rgba(80,52,12,0.15)]
          backdrop-blur-xl
        "
      >
        <MapPin size={23} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute left-[8%] top-[20%] z-40
          flex h-12 w-12 items-center justify-center
          rounded-full bg-[#201714] text-[#e4bd59]
          shadow-xl
        "
      >
        <Heart size={18} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
          },
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="
          absolute left-[43%] top-[9%] z-40
          flex h-10 w-10 items-center justify-center
          rounded-xl bg-[#dfb64f] text-white
          shadow-xl
        "
      >
        <Sparkles size={17} />
      </motion.div>

     <div
  className="
    absolute bottom-4 left-1/2 z-[5]
    h-[100px] w-[96%]
    -translate-x-1/2 rounded-[50%]
    bg-gradient-to-b from-[#eadcc7] to-[#bea47f]
    shadow-[0_35px_45px_rgba(68,44,13,0.17)]
  "
/>

<DeliveryBike />
<DeliveryBoy />
<DeliveryCustomer />
<DeliveryParcel />


      {/* Delivery confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.7 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 1.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="
          absolute bottom-7 left-1/2 z-[80]
          flex -translate-x-1/2 items-center gap-3
          rounded-full border border-white/70
          bg-white/80 px-5 py-2.5
          shadow-[0_18px_45px_rgba(42,27,8,0.14)]
          backdrop-blur-2xl
        "
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ae812d] text-white">
          <Check size={14} />
        </span>

        <span className="text-[10px] font-semibold tracking-wide text-[#332719]">
          Delivered with love
        </span>
      </motion.div>
    </div>
  );
}
