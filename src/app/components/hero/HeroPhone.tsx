"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowRight,
  CakeSlice,
  CreditCard,
  Flower2,
  Gift,
  Heart,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  WalletCards,
} from "lucide-react";

import {
  useEffect,
  useState,
  type MouseEvent,
  type ComponentType,
} from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
}>;

type FloatingCard = {
  title: string;
  subtitle: string;
  icon: IconType;
};

type PhonePage = {
  label: string;
  heading: string;
  description: string;
  button: string;
  icon: IconType;
  category: string;
};

const phonePages: PhonePage[] = [
  {
    label: "BGS Luxury",
    heading: "Thoughtfully curated for every moment.",
    description:
      "Premium gifting collections designed to make every celebration unforgettable.",
    button: "Explore Collection",
    icon: Gift,
    category: "Luxury Hampers",
  },
  {
    label: "Fresh Moments",
    heading: "Flowers crafted with elegance.",
    description:
      "Fresh floral arrangements made for birthdays, anniversaries and celebrations.",
    button: "Shop Flowers",
    icon: Flower2,
    category: "Premium Flowers",
  },
  {
    label: "Made For You",
    heading: "Personalised gifts with meaning.",
    description:
      "Turn names, memories and emotions into beautifully personalised gifts.",
    button: "Personalise Now",
    icon: Heart,
    category: "Personalised Gifts",
  },
  {
    label: "Celebrate More",
    heading: "Beautiful cakes for special days.",
    description:
      "Premium cakes with elegant presentation, crafted for memorable celebrations.",
    button: "View Cakes",
    icon: CakeSlice,
    category: "Luxury Cakes",
  },
];

const floatingCardSets: FloatingCard[][] = [
  [
    {
      title: "Luxury Hampers",
      subtitle: "Premium collections",
      icon: Gift,
    },
    {
      title: "Fresh Flowers",
      subtitle: "Handpicked daily",
      icon: Flower2,
    },
    {
      title: "Secure Payment",
      subtitle: "Safe checkout",
      icon: ShieldCheck,
    },
    {
      title: "Fast Delivery",
      subtitle: "Delivered with care",
      icon: Truck,
    },
  ],
  [
    {
      title: "Personalised",
      subtitle: "Made especially for you",
      icon: Heart,
    },
    {
      title: "Premium Cakes",
      subtitle: "Celebrate beautifully",
      icon: CakeSlice,
    },
    {
      title: "Gift Packaging",
      subtitle: "Luxury presentation",
      icon: PackageCheck,
    },
    {
      title: "Easy Checkout",
      subtitle: "Smooth experience",
      icon: CreditCard,
    },
  ],
  [
    {
      title: "Top Rated Gifts",
      subtitle: "Loved by customers",
      icon: Star,
    },
    {
      title: "Curated Collection",
      subtitle: "Selected by experts",
      icon: Sparkles,
    },
    {
      title: "Premium Shopping",
      subtitle: "Luxury made simple",
      icon: ShoppingBag,
    },
    {
      title: "Multiple Payments",
      subtitle: "Flexible payment options",
      icon: WalletCards,
    },
  ],
];

export default function HeroPhone() {
  const [pageIndex, setPageIndex] = useState(0);
  const [cardSetIndex, setCardSetIndex] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 80,
    damping: 24,
    mass: 0.8,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 80,
    damping: 24,
    mass: 0.8,
  });

  const mouseRotateY = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-12, 12]
  );

  const mouseRotateX = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [9, -9]
  );

  useEffect(() => {
    const pageTimer = window.setInterval(() => {
      setPageIndex((previous) => (previous + 1) % phonePages.length);
    }, 3000);

    return () => window.clearInterval(pageTimer);
  }, []);

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setCardSetIndex(
        (previous) => (previous + 1) % floatingCardSets.length
      );
    }, 12000);

    return () => window.clearInterval(rotationTimer);
  }, []);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const activePage = phonePages[pageIndex];
  const ActivePageIcon = activePage.icon;
  const activeCards = floatingCardSets[cardSetIndex];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        flex
        min-h-[620px]
        w-full
        items-center
        justify-center
        overflow-visible
        [perspective:1600px]
      "
    >
      {/* Premium background glow */}

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#d5b46c]/25
          blur-[110px]
        "
      />

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[510px]
          w-[510px]
          rounded-full
          border
          border-dashed
          border-[#b8954f]/20
        "
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[420px]
          w-[420px]
          rounded-full
          border
          border-black/5
        "
      />

      {/* Orbiting floating cards */}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={cardSetIndex}
          initial={{
            opacity: 0,
            scale: 0.85,
            rotate: -30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 360,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
          transition={{
            opacity: {
              duration: 0.7,
            },
            scale: {
              duration: 0.7,
            },
            rotate: {
              duration: 12,
              ease: "linear",
            },
          }}
          className="
            pointer-events-none
            absolute
            z-30
            hidden
            h-[520px]
            w-[520px]
            lg:block
          "
        >
          {activeCards.map((card, index) => {
            const Icon = card.icon;
            const angle = index * 90;

            return (
              <motion.div
                key={`${cardSetIndex}-${card.title}`}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                  rotate: -360,
                }}
                transition={{
                  opacity: {
                    duration: 0.5,
                    delay: index * 0.12,
                  },
                  scale: {
                    duration: 0.5,
                    delay: index * 0.12,
                  },
                  y: {
                    duration: 3.5 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 12,
                    ease: "linear",
                  },
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `
                    translate(-50%, -50%)
                    rotate(${angle}deg)
                    translateY(-260px)
                  `,
                }}
                className="
                  flex
                  min-w-[190px]
                  items-center
                  gap-3
                  rounded-[22px]
                  border
                  border-white/70
                  bg-white/75
                  px-4
                  py-3
                  shadow-[0_20px_60px_rgba(29,24,15,0.15)]
                  backdrop-blur-2xl
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#171717]
                    text-[#d8b461]
                    shadow-lg
                  "
                >
                  <Icon size={18} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#171717]">
                    {card.title}
                  </p>

                  <p className="mt-0.5 text-[9px] text-black/45">
                    {card.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Main phone rotating container */}

      <motion.div
        style={{
          rotateX: mouseRotateX,
          rotateY: mouseRotateY,
          transformStyle: "preserve-3d",
        }}
        className="
          relative
          z-20
          flex
          items-center
          justify-center
          [transform-style:preserve-3d]
        "
      >
        <motion.div
          animate={{
            rotateY: [0, 22, 0, -22, 0, 360],
            rotateX: [0, -3, 2, -2, 0],
            y: [0, -15, 0],
          }}
          transition={{
            rotateY: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotateX: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="
            relative
            [transform-style:preserve-3d]
          "
        >
          {/* Phone floor shadow */}

          <motion.div
            animate={{
              scaleX: [1, 0.78, 1],
              opacity: [0.25, 0.12, 0.25],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -bottom-16
              left-1/2
              h-14
              w-56
              -translate-x-1/2
              rounded-full
              bg-black/30
              blur-2xl
            "
          />

          {/* Back depth of phone */}

          <div
            className="
              absolute
              inset-0
              rounded-[52px]
              bg-gradient-to-br
              from-[#464646]
              via-[#181818]
              to-black
            "
            style={{
              transform: "translateZ(-28px) translateX(12px)",
            }}
          />

          {/* Phone outer frame */}

          <div
            className="
              relative
              h-[480px]
              w-[230px]
              rounded-[52px]
              border-[6px]
              border-[#161618]
              bg-[#050506]
              p-[6px]
              shadow-[0_50px_120px_rgba(0,0,0,0.45)]
              sm:h-[520px]
              sm:w-[250px]
              [transform-style:preserve-3d]
            "
          >
            {/* Metallic edge */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-[46px]
                border
                border-white/15
              "
            />

            {/* Side buttons */}

            <span
              className="
                absolute
                -left-[10px]
                top-[110px]
                h-12
                w-[4px]
                rounded-l-full
                bg-[#242427]
              "
            />

            <span
              className="
                absolute
                -left-[10px]
                top-[180px]
                h-20
                w-[4px]
                rounded-l-full
                bg-[#242427]
              "
            />

            <span
              className="
                absolute
                -right-[10px]
                top-[160px]
                h-24
                w-[4px]
                rounded-r-full
                bg-[#242427]
              "
            />

            {/* Phone screen */}

            <div
              className="
                relative
                h-full
                overflow-hidden
                rounded-[41px]
                bg-[#09090b]
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_50%_0%,rgba(216,180,97,0.25),transparent_38%)]
                "
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-3
                  z-40
                  h-[27px]
                  w-[88px]
                  -translate-x-1/2
                  rounded-full
                  bg-black
                  shadow-[0_3px_10px_rgba(0,0,0,0.5)]
                "
              >
                <div
                  className="
                    absolute
                    right-[9px]
                    top-1/2
                    h-[6px]
                    w-[6px]
                    -translate-y-1/2
                    rounded-full
                    bg-[#151c29]
                  "
                />
              </div>

              {/* Moving reflection */}

              <motion.div
                animate={{
                  x: ["-180%", "350%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  -top-20
                  z-30
                  h-[750px]
                  w-20
                  rotate-[18deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/10
                  to-transparent
                  blur-xl
                "
              />

              {/* Changing phone pages */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={pageIndex}
                  initial={{
                    opacity: 0,
                    x: 70,
                    scale: 0.94,
                    rotateY: 15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotateY: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -70,
                    scale: 0.94,
                    rotateY: -15,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    px-5
                    pb-5
                    pt-14
                  "
                >
                  {/* App header */}

                  <div className="flex items-center justify-between">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.06]
                        px-3
                        py-2
                        backdrop-blur-xl
                      "
                    >
                      <Sparkles
                        size={11}
                        className="text-[#d8b461]"
                      />

                      <span
                        className="
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-white
                        "
                      >
                        {activePage.label}
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.05]
                      "
                    >
                      <ShoppingBag
                        size={15}
                        className="text-white/75"
                      />
                    </div>
                  </div>

                  {/* Product visual */}

                  <div className="relative mt-8 flex flex-1 items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: [0, 4, 0, -4, 0],
                        y: [0, -8, 0],
                        scale: [1, 1.04, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        relative
                        flex
                        h-[155px]
                        w-[155px]
                        items-center
                        justify-center
                        rounded-[44px]
                        border
                        border-white/10
                        bg-gradient-to-br
                        from-white/15
                        to-white/[0.02]
                        shadow-[0_30px_80px_rgba(0,0,0,0.4)]
                        backdrop-blur-xl
                      "
                    >
                      <div
                        className="
                          absolute
                          inset-5
                          rounded-[35px]
                          bg-[#d8b461]/15
                          blur-2xl
                        "
                      />

                      <ActivePageIcon
                        size={64}
                        className="relative text-[#e2c475]"
                      />
                    </motion.div>

                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        h-[210px]
                        w-[210px]
                        rounded-full
                        border
                        border-dashed
                        border-[#d8b461]/20
                      "
                    />
                  </div>

                  {/* Content */}

                  <div>
                    <p
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-[#d8b461]
                      "
                    >
                      {activePage.category}
                    </p>

                    <h3
                      className="
                        mt-3
                        text-[25px]
                        font-semibold
                        leading-[1.02]
                        tracking-[-0.045em]
                        text-white
                      "
                    >
                      {activePage.heading}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[10px]
                        leading-[1.7]
                        text-white/45
                      "
                    >
                      {activePage.description}
                    </p>

                    <button
                      type="button"
                      className="
                        mt-5
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-2xl
                        bg-[#d8b461]
                        px-4
                        py-3.5
                        text-[10px]
                        font-semibold
                        text-[#151515]
                        shadow-[0_15px_40px_rgba(216,180,97,0.25)]
                        transition
                        duration-300
                        hover:bg-[#e6cb88]
                      "
                    >
                      {activePage.button}

                      <ArrowRight size={14} />
                    </button>

                    {/* Page dots */}

                    <div className="mt-5 flex justify-center gap-1.5">
                      {phonePages.map((_, index) => (
                        <motion.span
                          key={index}
                          animate={{
                            width: index === pageIndex ? 22 : 6,
                            opacity: index === pageIndex ? 1 : 0.35,
                          }}
                          className="
                            h-1.5
                            rounded-full
                            bg-[#d8b461]
                          "
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile floating mini cards */}

      <div className="absolute bottom-3 flex gap-2 lg:hidden">
        {activeCards.slice(0, 3).map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={`${cardSetIndex}-${card.title}`}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [0, -5, 0],
              }}
              transition={{
                opacity: {
                  duration: 0.4,
                  delay: index * 0.1,
                },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                },
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-white/60
                bg-white/80
                shadow-lg
                backdrop-blur-xl
              "
            >
              <Icon size={16} className="text-[#9b782e]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
