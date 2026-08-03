"use client";

import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface Props {
  openMenu: () => void;
  openSearch: () => void;
}

interface PremiumIconButtonProps {
  label: string;
  badge?: number;
  onClick?: () => void;
  children: React.ReactNode;
  hideOnDesktop?: boolean;
}

function PremiumIconButton({
  label,
  badge,
  onClick,
  children,
  hideOnDesktop = false,
}: PremiumIconButtonProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 180,
    damping: 18,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 180,
    damping: 18,
  });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
6260955764
  function handleMouseMove(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function resetTilt() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      whileHover={{
        y: -3,
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.92,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`
        group relative flex h-11 w-11 shrink-0
        items-center justify-center overflow-visible
        rounded-[15px] border border-white/10
        bg-white/[0.055] text-white
        shadow-[0_10px_30px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
        transition-colors duration-300
        hover:border-[#D4AF37]/35
        hover:bg-[#D4AF37]/10
        hover:text-[#E5C65E]
        ${hideOnDesktop ? "xl:hidden" : ""}
      `}
    >
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          rounded-[15px]
          bg-gradient-to-br
          from-white/[0.12]
          via-transparent
          to-[#D4AF37]/[0.05]
          opacity-70
        "
      />

      <motion.span
        aria-hidden="true"
        animate={{
          opacity: [0.15, 0.55, 0.15],
          scale: [0.85, 1.15, 0.85],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none absolute
          h-8 w-8 rounded-full
          bg-[#D4AF37]/15 blur-xl
        "
      />

      <span
        className="
          relative z-10 flex items-center justify-center
          transition-transform duration-300
          group-hover:scale-110
        "
        style={{
          transform: "translateZ(18px)",
        }}
      >
        {children}
      </span>

      {typeof badge === "number" && (
        <motion.span
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          whileHover={{
            scale: 1.12,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 18,
          }}
          className="
            absolute -right-1.5 -top-1.5 z-30
            flex h-5 min-w-5 items-center justify-center
            rounded-full border-2 border-[#111111]
            bg-[#D4AF37] px-1
            text-[10px] font-bold leading-none text-black
            shadow-[0_6px_16px_rgba(212,175,55,0.35)]
          "
        >
          {badge > 99 ? "99+" : badge}
        </motion.span>
      )}

      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-2 bottom-0
          h-px scale-x-0
          bg-gradient-to-r
          from-transparent via-[#D4AF37] to-transparent
          transition-transform duration-300
          group-hover:scale-x-100
        "
      />
    </motion.button>
  );
}

export default function NavIcons({
  openMenu,
  openSearch,
}: Props) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <PremiumIconButton
        label="Search"
        onClick={openSearch}
      >
        <Search size={19} strokeWidth={1.8} />
      </PremiumIconButton>

      <PremiumIconButton
        label="Wishlist"
        badge={2}
      >
        <Heart size={19} strokeWidth={1.8} />
      </PremiumIconButton>

      <PremiumIconButton
        label="Shopping bag"
        badge={3}
      >
        <ShoppingBag size={19} strokeWidth={1.8} />
      </PremiumIconButton>

      <PremiumIconButton
        label="Open menu"
        onClick={openMenu}
        hideOnDesktop
      >
        <Menu size={21} strokeWidth={1.8} />
      </PremiumIconButton>
    </div>
  );
}
