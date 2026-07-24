"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function DeliveryParcel() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.4,
        rotateX: 40,
        rotateY: -30,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
      }}
      animate={{
        y: [0, -8, 0],
        rotateZ: [-1.5, 1.5, -1.5],
      }}
      transition={{
        opacity: { duration: 0.7, delay: 1.1 },
        scale: { duration: 0.7, delay: 1.1 },
        rotateX: { duration: 0.7, delay: 1.1 },
        rotateY: { duration: 0.7, delay: 1.1 },
        y: {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotateZ: {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      viewport={{ once: true }}
      className="
        absolute bottom-[250px] right-[21%] z-[60]
        h-[112px] w-[148px]
        [transform-style:preserve-3d]
      "
    >
      {/* Parcel depth */}
      <div
        className="
          absolute inset-0 rounded-[18px]
          bg-[#9e7028]
        "
        style={{
          transform: "translateZ(-20px) translate(12px, 10px)",
        }}
      />

      {/* Front */}
      <div
        className="
          absolute inset-0 overflow-hidden rounded-[18px]
          border border-white/30
          bg-gradient-to-br
          from-[#f0d18a]
          via-[#d9ad53]
          to-[#aa7523]
          shadow-[0_30px_60px_rgba(75,45,7,0.27)]
        "
      >
        <motion.div
          animate={{ x: ["-160%", "250%"] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          className="
            absolute inset-y-0 w-10 rotate-[18deg]
            bg-gradient-to-r
            from-transparent via-white/30 to-transparent
            blur-md
          "
        />

        <div className="absolute left-1/2 top-0 h-full w-[25px] -translate-x-1/2 bg-[#211812]" />
        <div className="absolute left-0 top-[24px] h-[17px] w-full bg-[#211812]" />

        <div className="absolute left-1/2 top-[48px] -translate-x-1/2 text-center text-[#211812]">
          <Gift size={25} className="mx-auto" />

          <p className="mt-1 whitespace-nowrap text-[9px] font-bold tracking-[0.16em]">
            BGS LUXURY
          </p>
        </div>
      </div>

      {/* Ribbon */}
      <div
        className="
          absolute -top-[29px] left-[47px]
          h-[36px] w-[31px] -rotate-[38deg]
          rounded-[100%_10%]
          border-[8px] border-[#211812]
        "
      />

      <div
        className="
          absolute -top-[29px] right-[47px]
          h-[36px] w-[31px] rotate-[38deg]
          rounded-[10%_100%]
          border-[8px] border-[#211812]
        "
      />
    </motion.div>
  );
}
