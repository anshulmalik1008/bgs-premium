"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";


export default function HeroImage3D() {

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);


  const smoothX = useSpring(rotateX, {
    stiffness: 120,
    damping: 18,
  });


  const smoothY = useSpring(rotateY, {
    stiffness: 120,
    damping: 18,
  });



  useEffect(() => {

    const move = (e: MouseEvent) => {

      const x =
        (e.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (e.clientY / window.innerHeight - 0.5) * -12;


      rotateY.set(x);
      rotateX.set(y);

    };


    window.addEventListener(
      "mousemove",
      move
    );


    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );
    };


  }, [rotateX, rotateY]);



  return (

    <motion.div

      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformPerspective: 1200,
      }}

      animate={{
        y:[0,-18,0],
      }}

      transition={{
        duration:6,
        repeat:Infinity,
        ease:"easeInOut",
      }}

      className="
      relative
      h-[620px]
      w-[520px]
      rounded-[40px]
      border
      border-white/10
      bg-white/5
      p-3
      backdrop-blur-2xl
      "
    >


      {/* Image */}

      <div
        className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[32px]
        "
      >

        <Image

          src="/images/hero/luxury-gift.webp"

          alt="Luxury Gift"

          fill

          className="
          object-cover
          "
        />


        {/* Glass Shine */}

        <motion.div

          animate={{
            x:["-120%","120%"],
          }}

          transition={{
            duration:4,
            repeat:Infinity,
            repeatDelay:3,
          }}

          className="
          absolute
          inset-y-0
          w-1/3
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          skew-x-12
          "
        />


      </div>


    </motion.div>

  );
}
