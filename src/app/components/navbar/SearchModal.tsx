"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = [
  {
    title: "Luxury Hampers",
    subtitle: "Curated premium gift boxes",
    icon: Sparkles,
  },
  {
    title: "Birthday Gifts",
    subtitle: "Celebrate unforgettable moments",
    icon: TrendingUp,
  },
  {
    title: "Anniversary Collection",
    subtitle: "Elegant gifts for couples",
    icon: Clock3,
  },
  {
    title: "Corporate Gifting",
    subtitle: "Premium business gifting",
    icon: Sparkles,
  },
  {
    title: "Luxury Flowers",
    subtitle: "Fresh designer arrangements",
    icon: TrendingUp,
  },
  {
    title: "Personalised Gifts",
    subtitle: "Made especially for them",
    icon: Clock3,
  },
];

const panelVariants = {
  hidden: {
    opacity: 0,
    y: -45,
    scale: 0.94,
    rotateX: -8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.055,
      delayChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    y: -35,
    scale: 0.96,
    rotateX: -5,
    transition: {
      duration: 0.32,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function SearchModal({
  open,
  onClose,
}: SearchModalProps) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 130,
    damping: 24,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 130,
    damping: 24,
  });

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-2.5, 2.5],
  );

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [2, -2],
  );

  const glowX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["15%", "85%"],
  );

  const glowY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["10%", "90%"],
  );

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!open) return;

      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>,
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

  function goToSearch(value: string) {
    const cleanedQuery = value.trim();

    if (!cleanedQuery) return;

    onClose();

    router.push(
      `/search?q=${encodeURIComponent(cleanedQuery)}`,
    );

    setQuery("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goToSearch(query);
  }

  function handleClose() {
    setQuery("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Close search"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="
              fixed inset-0 z-[200]
              cursor-default bg-black/80
              backdrop-blur-xl
            "
          />

          {/* Modal wrapper */}
          <div
            className="
              pointer-events-none fixed inset-x-0 top-0
              z-[201] flex justify-center
              px-3 pt-4
              sm:px-6 sm:pt-8
              lg:pt-14
            "
          >
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="
                pointer-events-auto relative
                w-full max-w-[820px]
                [perspective:1600px]
              "
            >
              {/* Background glow */}
              <div className="pointer-events-none absolute -inset-12 rounded-full bg-[#D4AF37]/10 blur-[90px]" />

              <div
                className="
                  relative max-h-[calc(100dvh-32px)]
                  overflow-hidden rounded-[28px]
                  border border-white/10
                  bg-[#0a0a0b]/95
                  shadow-[0_40px_140px_rgba(0,0,0,0.65)]
                  backdrop-blur-3xl
                  sm:max-h-[calc(100dvh-64px)]
                  sm:rounded-[36px]
                "
              >
                {/* Mouse glow */}
                <motion.div
                  aria-hidden="true"
                  style={{
                    left: glowX,
                    top: glowY,
                  }}
                  className="
                    pointer-events-none absolute z-0
                    h-52 w-52
                    -translate-x-1/2 -translate-y-1/2
                    rounded-full bg-white/[0.06]
                    blur-[80px]
                  "
                />

                {/* Decorative glows */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[100px]" />

                <div className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-white/[0.035] blur-[110px]" />

                <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#fff_0.7px,transparent_0.7px)] [background-size:14px_14px]" />

                {/* Search header */}
                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubmit}
                  className="
                    relative z-10 flex items-center gap-3
                    border-b border-white/10
                    px-4 py-4
                    sm:gap-4 sm:px-7 sm:py-6
                  "
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-[15px]
                      border border-[#D4AF37]/20
                      bg-[#D4AF37]/10
                      text-[#E4C45B]
                      shadow-[0_10px_30px_rgba(212,175,55,0.12)]
                    "
                  >
                    <Search
                      size={19}
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(event) =>
                        setQuery(event.target.value)
                      }
                      placeholder="Search premium gifts..."
                      aria-label="Search premium gifts"
                      className="
                        w-full bg-transparent
                        text-base font-medium text-white
                        outline-none
                        placeholder:text-white/30
                        sm:text-lg
                      "
                    />

                    <p className="mt-1 hidden text-[10px] text-white/30 sm:block">
                      Search hampers, flowers, cakes and more
                    </p>
                  </div>

                  <AnimatePresence>
                    {query && (
                      <motion.button
                        type="submit"
                        initial={{
                          opacity: 0,
                          scale: 0.85,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.85,
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -1,
                        }}
                        whileTap={{
                          scale: 0.94,
                        }}
                        className="
                          hidden h-11 items-center gap-2
                          rounded-[14px] bg-[#D4AF37]
                          px-4 text-[12px] font-semibold
                          text-black shadow-[0_12px_30px_rgba(212,175,55,0.18)]
                          sm:flex
                        "
                      >
                        Search
                        <ArrowUpRight size={15} />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="button"
                    aria-label="Close search"
                    onClick={handleClose}
                    whileHover={{
                      rotate: 90,
                      scale: 1.06,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-[15px]
                      border border-white/10
                      bg-white/[0.05]
                      text-white/80
                      transition-colors duration-300
                      hover:border-[#D4AF37]/30
                      hover:bg-[#D4AF37]/10
                      hover:text-[#E4C45B]
                    "
                  >
                    <X size={19} />
                  </motion.button>
                </motion.form>

                {/* Content */}
                <div className="relative z-10 max-h-[65dvh] overflow-y-auto px-4 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-7 sm:py-7">
                  <motion.div
                    variants={itemVariants}
                    className="mb-5 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                        Popular Searches
                      </p>

                      <p className="mt-1 text-[11px] text-white/20">
                        Discover our most searched collections
                      </p>
                    </div>

                    <span
                      className="
                        hidden rounded-full
                        border border-white/10
                        bg-white/[0.04]
                        px-3 py-1.5
                        text-[9px] text-white/35
                        sm:block
                      "
                    >
                      Press ESC to close
                    </span>
                  </motion.div>

                  <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                    {suggestions.map(
                      (item, index) => {
                        const Icon = item.icon;

                        return (
                          <motion.button
                            key={item.title}
                            type="button"
                            variants={itemVariants}
                            onClick={() =>
                              goToSearch(item.title)
                            }
                            whileHover={{
                              y: -3,
                              rotateX: 1.5,
                              rotateY:
                                index % 2 === 0
                                  ? 1.5
                                  : -1.5,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                            style={{
                              transformStyle:
                                "preserve-3d",
                            }}
                            className="
                              group relative flex items-center
                              justify-between overflow-hidden
                              rounded-[19px]
                              border border-white/[0.07]
                              bg-white/[0.035]
                              px-4 py-4 text-left
                              shadow-[0_14px_38px_rgba(0,0,0,0.16)]
                              transition-colors duration-300
                              hover:border-[#D4AF37]/25
                              hover:bg-[#D4AF37]/[0.075]
                            "
                          >
                            <div className="absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/[0.055] to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

                            <div className="relative z-10 flex min-w-0 items-center gap-3">
                              <span
                                className="
                                  flex h-10 w-10 shrink-0
                                  items-center justify-center
                                  rounded-[14px]
                                  border border-white/[0.07]
                                  bg-white/[0.045]
                                  text-white/35
                                  transition-colors duration-300
                                  group-hover:border-[#D4AF37]/20
                                  group-hover:bg-[#D4AF37]/10
                                  group-hover:text-[#E4C45B]
                                "
                              >
                                <Icon
                                  size={16}
                                  strokeWidth={1.8}
                                />
                              </span>

                              <span className="min-w-0">
                                <span className="block truncate text-[13px] font-medium text-white/85 transition-colors group-hover:text-white sm:text-[14px]">
                                  {item.title}
                                </span>

                                <span className="mt-1 block truncate text-[10px] text-white/30">
                                  {item.subtitle}
                                </span>
                              </span>
                            </div>

                            <span
                              className="
                                relative z-10 flex h-9 w-9
                                shrink-0 items-center justify-center
                                rounded-full
                                border border-white/[0.07]
                                bg-white/[0.04]
                                text-white/30
                                transition-all duration-300
                                group-hover:translate-x-1
                                group-hover:-translate-y-1
                                group-hover:border-[#D4AF37]/20
                                group-hover:bg-[#D4AF37]/10
                                group-hover:text-[#E4C45B]
                              "
                            >
                              <ArrowUpRight size={15} />
                            </span>
                          </motion.button>
                        );
                      },
                    )}
                  </div>

                  <motion.div
                    variants={itemVariants}
                    className="
                      mt-6 flex flex-col gap-3
                      rounded-[20px]
                      border border-white/[0.07]
                      bg-white/[0.025]
                      px-4 py-4
                      sm:flex-row sm:items-center
                      sm:justify-between
                    "
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles
                        size={15}
                        className="text-[#D4AF37]"
                      />

                      <p className="text-[11px] text-white/35">
                        Try searching by occasion, recipient or category.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] text-white/25">
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1">
                        Enter
                      </span>
                      to search
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
