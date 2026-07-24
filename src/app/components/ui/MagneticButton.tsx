"use client";

import {
  useRef,
  useState,
} from "react";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";


export default function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {

  const buttonRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);


  const springX = useSpring(x, {
    stiffness: 180,
    damping: 12,
  });


  const springY = useSpring(y, {
    stiffness: 180,
    damping: 12,
  });


  const [hover, setHover] = useState(false);



  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {

    const button =
      buttonRef.current;


    if (!button) return;


    const rect =
      button.getBoundingClientRect();


    const mouseX =
      e.clientX - rect.left - rect.width / 2;


    const mouseY =
      e.clientY - rect.top - rect.height / 2;



    x.set(mouseX * 0.25);

    y.set(mouseY * 0.25);

  };



  const reset = () => {

    x.set(0);
    y.set(0);

    setHover(false);

  };



  return (

    <motion.button

      ref={buttonRef}

      style={{
        x: springX,
        y: springY,
      }}

      onMouseMove={handleMouseMove}

      onMouseEnter={() => setHover(true)}

      onMouseLeave={reset}


      whileTap={{
        scale:0.95,
      }}


      className={`
      relative
      overflow-hidden
      rounded-full
      px-8
      py-4
      font-medium
      transition-all
      duration-300

      ${hover 
        ? "shadow-[0_0_50px_rgba(212,175,55,.35)]"
        : ""
      }

      ${className}
      `}
    >


      <span className="relative z-10">
        {children}
      </span>


      <motion.span

        animate={{
          opacity: hover ? 1 : 0,
        }}

        className="
        absolute
        inset-0
        bg-gradient-to-r
        from-[#D4AF37]/30
        via-white/20
        to-[#D4AF37]/30
        "
      />


    </motion.button>

  );

}
