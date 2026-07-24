"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HeroParallax({
  children,
}: {
  children: React.ReactNode;
}) {

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const moveX = useSpring(rotateX, {
    stiffness: 120,
    damping: 20,
  });

  const moveY = useSpring(rotateY, {
    stiffness: 120,
    damping: 20,
  });


  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {

      const x =
        (e.clientX / window.innerWidth - 0.5) * 10;

      const y =
        (e.clientY / window.innerHeight - 0.5) * -10;


      rotateX.set(y);
      rotateY.set(x);

    };


    window.addEventListener(
      "mousemove",
      handleMouseMove
    );


    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };


  }, [rotateX, rotateY]);


  return (

    <motion.div

      style={{
        rotateX: moveX,
        rotateY: moveY,

        transformPerspective: 1200,

        transformStyle: "preserve-3d",
      }}

      className="
      w-full
      "
    >

      {children}

    </motion.div>

  );
}
