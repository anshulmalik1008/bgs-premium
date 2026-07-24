"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import DeliveryScene from "./DeliveryScene";
import { deliveryFeatures } from "./deliveryData";

export default function DeliveryStory() {
  return (
    <section className="relative overflow-hidden bg-[#f6f2e9] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#d9b14f]/10 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#d9b14f]/15 blur-[140px]" />

        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            [background-size:48px_48px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-5 md:px-8 lg:px-12">
        <div
          className="
            overflow-hidden rounded-[42px]
            border border-black/[0.06]
            bg-white/55 p-5
            shadow-[0_50px_140px_rgba(59,42,13,0.09)]
            backdrop-blur-xl
            md:p-8 lg:p-12
          "
        >
          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="px-2 lg:px-5"
            >
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full border border-[#a97d2b]/20
                  bg-[#dcb75d]/10 px-4 py-2
                "
              >
                <Sparkles size={13} className="text-[#a47a28]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#72531d]">
                  Our Delivery Story
                </span>
              </div>

              <h2
                className="
                  mt-7 max-w-[600px]
                  text-[44px] font-semibold
                  leading-[0.96] tracking-[-0.06em]
                  text-[#191613]
                  sm:text-[56px] lg:text-[68px]
                "
              >
                From our heart,
                <span className="block text-[#b4872f]">
                  to your hands.
                </span>
              </h2>

              <p className="mt-7 max-w-[540px] text-[15px] leading-7 text-black/50">
                Every gift begins with an emotion. We carefully pack, protect
                and deliver it so that your special moment arrives beautifully.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {deliveryFeatures.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -6,
                        rotateX: 3,
                        rotateY: -3,
                      }}
                      className="
                        group relative overflow-hidden
                        rounded-[24px]
                        border border-black/[0.06]
                        bg-white/70 p-4
                        shadow-[0_15px_40px_rgba(56,38,10,0.06)]
                        backdrop-blur-xl
                        [transform-style:preserve-3d]
                      "
                    >
                      <div
                        className="
                          absolute -right-4 -top-4
                          text-[60px] font-semibold
                          text-black/[0.025]
                        "
                      >
                        {feature.number}
                      </div>

                      <div
                        className="
                          flex h-11 w-11 items-center justify-center
                          rounded-2xl
                          bg-gradient-to-br
                          from-[#e8c76e] to-[#aa7821]
                          text-white
                          shadow-[0_12px_25px_rgba(163,112,25,0.22)]
                        "
                      >
                        <Icon size={18} />
                      </div>

                      <h3 className="mt-4 text-[13px] font-semibold text-[#211d18]">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-[11px] leading-5 text-black/42">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <button
                type="button"
                className="
                  group mt-9 inline-flex items-center gap-4
                  rounded-full bg-[#1c1714]
                  px-6 py-3.5
                  text-[11px] font-semibold text-white
                  shadow-[0_18px_45px_rgba(0,0,0,0.16)]
                  transition duration-300
                  hover:-translate-y-1
                "
              >
                Explore Our Journey

                <span
                  className="
                    flex h-8 w-8 items-center justify-center
                    rounded-full bg-white/10
                    transition duration-300
                    group-hover:rotate-45
                    group-hover:bg-[#d8af50]
                  "
                >
                  <ArrowUpRight size={15} />
                </span>
              </button>
            </motion.div>

            {/* 3D scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 70 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <DeliveryScene />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
