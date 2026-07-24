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
  ArrowUpRight,
  Award,
  CakeSlice,
  Clock3,
  Crown,
  Flower2,
  Gem,
  Gift,
  Heart,
  HeartHandshake,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  WandSparkles,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type Collection = {
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  button: string;
  icon: IconType;
  accent: string;
  softAccent: string;
  gradient: string;
};

type FloatingCardItem = {
  title: string;
  subtitle: string;
  badge: string;
  icon: IconType;
};

type MagneticCardProps = FloatingCardItem & {
  index: number;
  direction?: "left" | "right";
};

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/*                                   Data                                     */
/* -------------------------------------------------------------------------- */

const collections: Collection[] = [
  {
    title: "Signature Hampers",
    shortTitle: "Hampers",
    subtitle: "Curated luxury",
    description:
      "Premium treats, keepsakes and thoughtful details beautifully curated inside one unforgettable gift.",
    button: "Explore Hampers",
    icon: Gift,
    accent: "#9B7128",
    softAccent: "rgba(181, 137, 56, 0.24)",
    gradient:
      "linear-gradient(145deg, #FFFDF7 0%, #F2E3C5 42%, #C89B48 100%)",
  },
  {
    title: "Luxury Flowers",
    shortTitle: "Flowers",
    subtitle: "Freshly arranged",
    description:
      "Elegant floral arrangements created with refined textures, beautiful tones and premium presentation.",
    button: "Shop Flowers",
    icon: Flower2,
    accent: "#A06C4B",
    softAccent: "rgba(183, 128, 92, 0.23)",
    gradient:
      "linear-gradient(145deg, #FFF9F4 0%, #EED8CA 44%, #C48D6B 100%)",
  },
  {
    title: "Personalised Gifts",
    shortTitle: "Personalised",
    subtitle: "Made for them",
    description:
      "Names, photographs and heartfelt messages transformed into a gift created especially for someone.",
    button: "Personalise Now",
    icon: Heart,
    accent: "#9A654F",
    softAccent: "rgba(182, 112, 91, 0.22)",
    gradient:
      "linear-gradient(145deg, #FFF9F6 0%, #ECD5CD 44%, #BE7E69 100%)",
  },
  {
    title: "Celebration Cakes",
    shortTitle: "Cakes",
    subtitle: "Crafted beautifully",
    description:
      "Premium cakes designed for birthdays, anniversaries and every celebration worth remembering.",
    button: "View Cakes",
    icon: CakeSlice,
    accent: "#8C683B",
    softAccent: "rgba(173, 136, 85, 0.22)",
    gradient:
      "linear-gradient(145deg, #FFFBF4 0%, #EBDFC9 44%, #B79662 100%)",
  },
];

const leftFloatingCards: FloatingCardItem[] = [
  {
    title: "Luxury Packaging",
    subtitle: "Signature presentation",
    badge: "Premium",
    icon: PackageCheck,
  },
  {
    title: "Curated By Experts",
    subtitle: "Selected beautifully",
    badge: "Exclusive",
    icon: Crown,
  },
  {
    title: "Made With Emotion",
    subtitle: "Designed personally",
    badge: "Special",
    icon: HeartHandshake,
  },
  {
    title: "Elegant Details",
    subtitle: "Every detail matters",
    badge: "Luxury",
    icon: Gem,
  },
  {
    title: "Unique Collections",
    subtitle: "Made to stand apart",
    badge: "Signature",
    icon: WandSparkles,
  },
];

const rightFloatingCards: FloatingCardItem[] = [
  {
    title: "Priority Delivery",
    subtitle: "Delivered on time",
    badge: "Express",
    icon: Truck,
  },
  {
    title: "Secure Checkout",
    subtitle: "Safe and protected",
    badge: "Secure",
    icon: ShieldCheck,
  },
  {
    title: "Celebration Ready",
    subtitle: "Perfectly prepared",
    badge: "Ready",
    icon: Sparkles,
  },
  {
    title: "Loved By Thousands",
    subtitle: "Premium experience",
    badge: "4.9 Rating",
    icon: Star,
  },
  {
    title: "Timeless Gifting",
    subtitle: "Memories that remain",
    badge: "Iconic",
    icon: Award,
  },
];

const orbitItems = [
  {
    icon: Gift,
    label: "Hampers",
  },
  {
    icon: Flower2,
    label: "Flowers",
  },
  {
    icon: CakeSlice,
    label: "Cakes",
  },
  {
    icon: Heart,
    label: "Personalised",
  },
  {
    icon: ShoppingBag,
    label: "Luxury",
  },
  {
    icon: Crown,
    label: "Exclusive",
  },
];

const particlePositions = [
  ["8%", "15%"],
  ["15%", "30%"],
  ["7%", "66%"],
  ["18%", "82%"],
  ["29%", "10%"],
  ["36%", "25%"],
  ["45%", "13%"],
  ["56%", "18%"],
  ["66%", "9%"],
  ["78%", "16%"],
  ["90%", "27%"],
  ["94%", "48%"],
  ["88%", "72%"],
  ["76%", "85%"],
  ["63%", "91%"],
  ["49%", "83%"],
  ["36%", "90%"],
  ["23%", "74%"],
  ["28%", "53%"],
  ["70%", "57%"],
  ["82%", "42%"],
  ["53%", "35%"],
  ["41%", "63%"],
  ["61%", "72%"],
];

/* -------------------------------------------------------------------------- */
/*                              Magnetic Button                               */
/* -------------------------------------------------------------------------- */

function MagneticButton({
  children,
  className = "",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 240,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 240,
    damping: 20,
  });

  function handleMove(event: ReactMouseEvent<HTMLButtonElement>) {
    const button = buttonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) * 0.2);
    y.set((event.clientY - centerY) * 0.2);
  }

  function resetPosition() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      onMouseMove={handleMove}
      onMouseLeave={resetPosition}
      whileTap={{
        scale: 0.96,
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*                           Magnetic Floating Card                           */
/* -------------------------------------------------------------------------- */

function MagneticFloatingCard({
  title,
  subtitle,
  badge,
  icon: Icon,
  index,
  direction = "left",
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 170,
    damping: 18,
    mass: 0.7,
  });

  const smoothY = useSpring(y, {
    stiffness: 170,
    damping: 18,
    mass: 0.7,
  });

  const rotateX = useTransform(smoothY, [-25, 25], [6, -6]);
  const rotateY = useTransform(smoothX, [-25, 25], [-7, 7]);

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) * 0.2);
    y.set((event.clientY - centerY) * 0.2);
  }

  function resetCard() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: smoothX,
        y: smoothY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCard}
      whileHover={{
        scale: 1.055,
        zIndex: 50,
      }}
      className="
        group relative w-[238px]
        cursor-pointer overflow-hidden
        rounded-[27px]
        border border-white/90
        bg-white/76 p-[1px]
        shadow-[0_24px_70px_rgba(72,49,16,0.11)]
        backdrop-blur-2xl
        [transform-style:preserve-3d]
      "
    >
      <div
        className="
          relative overflow-hidden
          rounded-[26px]
          border border-black/[0.045]
          bg-gradient-to-br
          from-white
          via-[#fffdf8]
          to-[#f2e9dc]
          p-4
        "
        style={{
          transform: "translateZ(15px)",
        }}
      >
        <motion.div
          animate={{
            x:
              direction === "left"
                ? ["-180%", "330%"]
                : ["330%", "-180%"],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            repeatDelay: 2 + index * 0.35,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none absolute
            inset-y-0 w-16 rotate-[17deg]
            bg-gradient-to-r
            from-transparent
            via-white/90
            to-transparent
            blur-xl
          "
        />

        <div className="relative flex items-center gap-3.5">
          <motion.div
            animate={{
              rotate: [0, 6, -5, 0],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-[17px]
              border border-white/20
              bg-gradient-to-br
              from-[#3a2d20]
              via-[#211912]
              to-[#120e0a]
              text-[#e6c16d]
              shadow-[0_14px_30px_rgba(34,24,11,0.22)]
            "
            style={{
              transform: "translateZ(28px)",
            }}
          >
            <Icon size={19} strokeWidth={1.7} />
          </motion.div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-[11px] font-semibold text-[#201a14]">
                {title}
              </h3>

              <span
                className="
                  shrink-0 rounded-full
                  border border-[#b48735]/15
                  bg-[#c89a45]/10
                  px-2 py-1
                  text-[6px] font-bold
                  uppercase tracking-[0.14em]
                  text-[#8c6527]
                "
              >
                {badge}
              </span>
            </div>

            <p className="mt-1 text-[9px] text-black/40">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="relative mt-4 h-[3px] overflow-hidden rounded-full bg-black/[0.045]">
          <motion.div
            animate={{
              x: ["-120%", "250%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.25,
              ease: "easeInOut",
            }}
            className="
              h-full w-[42%]
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-[#b98934]
              to-transparent
            "
          />
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Orbiting Category Chip                          */
/* -------------------------------------------------------------------------- */

function OrbitChip({
  icon: Icon,
  label,
  index,
  total,
}: {
  icon: IconType;
  label: string;
  index: number;
  total: number;
}) {
  const angle = index * (360 / total);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `
          translate(-50%, -50%)
          rotate(${angle}deg)
          translateY(-276px)
        `,
      }}
    >
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 29,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transform: `rotate(${-angle}deg)`,
        }}
      >
        <motion.div
          animate={{
            y: [0, -9, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 3 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.12,
          }}
          className="
            flex items-center gap-2
            rounded-full
            border border-white/90
            bg-white/82
            px-3 py-2
            shadow-[0_16px_45px_rgba(68,46,14,0.12)]
            backdrop-blur-2xl
          "
        >
          <span
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-gradient-to-br
              from-[#c89b48]
              to-[#8d6422]
              text-white
              shadow-[0_8px_20px_rgba(157,111,35,0.24)]
            "
          >
            <Icon size={13} />
          </span>

          <span className="whitespace-nowrap text-[8px] font-semibold text-[#292018]">
            {label}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

export default function SignatureUniverse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 75,
    damping: 23,
    mass: 0.85,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 75,
    damping: 23,
    mass: 0.85,
  });

  const sceneRotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-8, 8]
  );

  const sceneRotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [7, -7]
  );

  const giftX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-18, 18]
  );

  const giftY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-12, 12]
  );

  const spotlightX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["28%", "72%"]
  );

  const spotlightY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["24%", "76%"]
  );

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % collections.length
      );
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  function handleSceneMove(
    event: ReactMouseEvent<HTMLDivElement>
  ) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function resetScene() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const activeCollection = collections[activeIndex];
  const ActiveIcon = activeCollection.icon;

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#f5f2eb]
        py-24 text-[#181511]
        lg:py-32
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -left-40 top-0
            h-[520px] w-[520px]
            rounded-full
            bg-[#dcc48c]/22
            blur-[155px]
          "
        />

        <div
          className="
            absolute -right-44 bottom-0
            h-[560px] w-[560px]
            rounded-full
            bg-[#d6bd8a]/24
            blur-[165px]
          "
        />

        <div
          className="
            absolute inset-0
            opacity-[0.024]
            [background-image:linear-gradient(to_right,#342819_1px,transparent_1px),linear-gradient(to_bottom,#342819_1px,transparent_1px)]
            [background-size:58px_58px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-5 md:px-8 lg:px-12">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 38,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          className="mx-auto max-w-[850px] text-center"
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-[#b58a3a]/20
              bg-white/70
              px-4 py-2
              shadow-[0_10px_35px_rgba(82,58,20,0.06)]
              backdrop-blur-xl
            "
          >
            <Sparkles size={13} className="text-[#a77a2a]" />

            <span
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.27em]
                text-[#7e5a1f]
              "
            >
              Signature Gift Universe
            </span>
          </div>

          <h2
            className="
              mt-7 text-[43px]
              font-semibold leading-[0.95]
              tracking-[-0.06em]
              text-[#181511]
              sm:text-[58px]
              lg:text-[76px]
            "
          >
            Every gift becomes
            <span
              className="
                block
                bg-gradient-to-r
                from-[#80591c]
                via-[#c09443]
                to-[#80591c]
                bg-clip-text text-transparent
              "
            >
              a beautiful experience.
            </span>
          </h2>

          <p
            className="
              mx-auto mt-7 max-w-[650px]
              text-[14px] leading-7
              text-[#181511]/50
              md:text-[15px]
            "
          >
            Move your cursor through our universe of premium
            collections, personalised details and beautifully
            curated gifting experiences.
          </p>
        </motion.div>

        {/* Main panel */}

        <motion.div
          initial={{
            opacity: 0,
            y: 70,
            scale: 0.965,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          onMouseMove={handleSceneMove}
          onMouseLeave={() => {
            resetScene();
            setIsPaused(false);
          }}
          onMouseEnter={() => setIsPaused(true)}
          className="
            relative mt-16
            overflow-hidden
            rounded-[46px]
            border border-black/[0.055]
            bg-white/52
            p-3
            shadow-[0_50px_145px_rgba(72,51,17,0.11)]
            backdrop-blur-2xl
            md:p-5
          "
        >
          <div
            className="
              relative min-h-[790px]
              overflow-hidden
              rounded-[38px]
              border border-white/85
              bg-gradient-to-br
              from-[#fffefa]
              via-[#f9f5ed]
              to-[#eee5d6]
              xl:min-h-[840px]
              [perspective:1800px]
            "
          >
            {/* Cursor spotlight */}

            <motion.div
              style={{
                left: spotlightX,
                top: spotlightY,
              }}
              className="
                pointer-events-none absolute
                z-0 h-[520px] w-[520px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#dcc389]/32
                blur-[135px]
              "
            />

            {/* Soft center glow */}

            <motion.div
              animate={{
                scale: [1, 1.13, 1],
                opacity: [0.3, 0.58, 0.3],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute left-1/2 top-1/2
                h-[430px] w-[430px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#dec68f]/32
                blur-[95px]
              "
            />

            {/* Rotating rings */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 36,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute left-1/2 top-1/2
                h-[640px] w-[640px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border border-dashed
                border-[#b88d3f]/24
              "
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 27,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute left-1/2 top-1/2
                h-[520px] w-[520px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border border-[#bdae97]/30
              "
            />

            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.025, 1],
              }}
              transition={{
                rotate: {
                  duration: 19,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="
                absolute left-1/2 top-1/2
                h-[680px] w-[680px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border border-transparent
                border-r-[#c59842]/12
                border-t-[#c59842]/38
              "
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute left-1/2 top-1/2
                h-[445px] w-[445px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border border-transparent
                border-b-[#c59842]/35
                border-l-[#c59842]/10
              "
            />

            {/* Particles */}

            {particlePositions.map(([left, top], index) => (
              <motion.span
                key={`${left}-${top}`}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.18, 0.9, 0.18],
                  scale: [0.65, 1.35, 0.65],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3.4 + (index % 6),
                  repeat: Infinity,
                  delay: index * 0.14,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute z-10
                  h-[5px] w-[5px]
                  rounded-full
                  bg-[#c39338]
                  shadow-[0_0_15px_rgba(195,147,56,0.85)]
                "
                style={{
                  left,
                  top,
                }}
              />
            ))}

            {/* Top navigation */}

            <div
              className="
                absolute left-1/2 top-6
                z-[80] flex
                -translate-x-1/2
                items-center gap-1.5
                rounded-full
                border border-black/[0.05]
                bg-white/78 p-1.5
                shadow-[0_12px_40px_rgba(62,42,12,0.08)]
                backdrop-blur-xl
              "
            >
              {collections.map((collection, index) => {
                const Icon = collection.icon;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={collection.title}
                    type="button"
                    aria-label={collection.title}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      relative flex h-10
                      items-center justify-center
                      overflow-hidden rounded-full
                      transition-all duration-500
                      ${
                        isActive
                          ? "w-[125px] bg-[#211a14] text-white"
                          : "w-10 text-black/40 hover:bg-black/[0.04]"
                      }
                    `}
                  >
                    <Icon
                      size={14}
                      className="relative z-10 shrink-0"
                    />

                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            width: 0,
                          }}
                          animate={{
                            opacity: 1,
                            width: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            width: 0,
                          }}
                          className="
                            relative z-10 ml-2
                            overflow-hidden
                            whitespace-nowrap
                            text-[9px] font-semibold
                          "
                        >
                          {collection.shortTitle}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            {/* Left floating rail */}

            <div
              className="
                pointer-events-none
                absolute left-[2%] top-1/2
                z-40 hidden h-[610px]
                w-[255px] -translate-y-1/2
                overflow-hidden xl:block
              "
            >
              <div
                className="
                  absolute left-0 right-0 top-0
                  z-30 h-24
                  bg-gradient-to-b
                  from-[#fffdf8]
                  to-transparent
                "
              />

              <div
                className="
                  absolute bottom-0 left-0 right-0
                  z-30 h-24
                  bg-gradient-to-t
                  from-[#f1e8da]
                  to-transparent
                "
              />

              <motion.div
                animate={{
                  y: ["0%", "-50%"],
                }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  pointer-events-auto
                  flex flex-col gap-5
                  py-6 will-change-transform
                "
              >
                {[...leftFloatingCards, ...leftFloatingCards].map(
                  (card, index) => (
                    <MagneticFloatingCard
                      key={`${card.title}-${index}`}
                      {...card}
                      index={index}
                      direction="left"
                    />
                  )
                )}
              </motion.div>
            </div>

            {/* Right floating rail */}

            <div
              className="
                pointer-events-none
                absolute right-[2%] top-1/2
                z-40 hidden h-[610px]
                w-[255px] -translate-y-1/2
                overflow-hidden xl:block
              "
            >
              <div
                className="
                  absolute left-0 right-0 top-0
                  z-30 h-24
                  bg-gradient-to-b
                  from-[#fffdf8]
                  to-transparent
                "
              />

              <div
                className="
                  absolute bottom-0 left-0 right-0
                  z-30 h-24
                  bg-gradient-to-t
                  from-[#f1e8da]
                  to-transparent
                "
              />

              <motion.div
                animate={{
                  y: ["-50%", "0%"],
                }}
                transition={{
                  duration: 27,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  pointer-events-auto
                  flex flex-col gap-5
                  py-6 will-change-transform
                "
              >
                {[...rightFloatingCards, ...rightFloatingCards].map(
                  (card, index) => (
                    <MagneticFloatingCard
                      key={`${card.title}-${index}`}
                      {...card}
                      index={index}
                      direction="right"
                    />
                  )
                )}
              </motion.div>
            </div>

            {/* Orbit category chips */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 29,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute left-1/2 top-1/2
                z-[22] hidden
                h-[552px] w-[552px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full lg:block
              "
            >
              {orbitItems.map((item, index) => (
                <OrbitChip
                  key={item.label}
                  {...item}
                  index={index}
                  total={orbitItems.length}
                />
              ))}
            </motion.div>

            {/* Center magnetic scene */}

            <motion.div
              style={{
                rotateX: sceneRotateX,
                rotateY: sceneRotateY,
                transformStyle: "preserve-3d",
              }}
              className="
                absolute left-1/2 top-[47%]
                z-30 -translate-x-1/2
                -translate-y-1/2
                [transform-style:preserve-3d]
              "
            >
              <motion.div
                style={{
                  x: giftX,
                  y: giftY,
                  transformStyle: "preserve-3d",
                }}
                className="
                  relative h-[410px]
                  w-[410px]
                  [transform-style:preserve-3d]
                "
              >
                {/* Gift shadow */}

                <motion.div
                  animate={{
                    scaleX: [1, 0.76, 1],
                    opacity: [0.25, 0.12, 0.25],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute -bottom-10
                    left-1/2 h-16
                    w-[300px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#44301a]/25
                    blur-3xl
                  "
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{
                      opacity: 0,
                      scale: 0.68,
                      rotateY: -42,
                      y: 45,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.74,
                      rotateY: 42,
                      y: -30,
                    }}
                    transition={{
                      duration: 0.78,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      absolute inset-0
                      flex items-center
                      justify-center
                      [transform-style:preserve-3d]
                    "
                  >
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                        y: [0, -16, 0],
                      }}
                      transition={{
                        rotateY: {
                          duration: 18,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        y: {
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      className="
                        relative h-[300px]
                        w-[300px]
                        [transform-style:preserve-3d]
                      "
                    >
                      {/* Gift depth */}

                      <div
                        className="
                          absolute inset-[22px]
                          rounded-[58px]
                          bg-[#846128]
                          shadow-[0_45px_100px_rgba(77,50,12,0.18)]
                        "
                        style={{
                          transform:
                            "translateZ(-50px) translate(19px,18px)",
                        }}
                      />

                      {/* Gift front */}

                      <div
                        className="
                          absolute inset-[22px]
                          overflow-hidden
                          rounded-[58px]
                          border border-white/60
                          shadow-[0_40px_100px_rgba(75,49,12,0.22)]
                        "
                        style={{
                          background: activeCollection.gradient,
                          transform: "translateZ(20px)",
                        }}
                      >
                        <motion.div
                          animate={{
                            x: ["-180%", "310%"],
                          }}
                          transition={{
                            duration: 3.9,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut",
                          }}
                          className="
                            absolute inset-y-0
                            w-20 rotate-[18deg]
                            bg-gradient-to-r
                            from-transparent
                            via-white/55
                            to-transparent
                            blur-xl
                          "
                        />

                        <div
                          className="
                            absolute left-1/2 top-0
                            h-full w-[42px]
                            -translate-x-1/2
                            bg-[#211a14]
                          "
                        />

                        <div
                          className="
                            absolute left-0 top-[51px]
                            h-[30px] w-full
                            bg-[#211a14]
                          "
                        />

                        <div
                          className="
                            absolute left-1/2 top-1/2
                            z-10 flex
                            -translate-x-1/2
                            -translate-y-1/2
                            flex-col items-center
                            text-[#211a14]
                          "
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <ActiveIcon
                              size={57}
                              strokeWidth={1.45}
                            />
                          </motion.div>

                          <p
                            className="
                              mt-4 text-[15px]
                              font-bold tracking-[0.2em]
                            "
                          >
                            BGS
                          </p>

                          <p
                            className="
                              mt-1 text-[7px]
                              font-semibold
                              tracking-[0.3em]
                            "
                          >
                            LUXURY GIFTS
                          </p>
                        </div>
                      </div>

                      {/* Bow */}

                      <motion.div
                        animate={{
                          rotateZ: [-4, 4, -4],
                          scale: [1, 1.055, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="
                          absolute left-1/2
                          top-[-13px] z-20
                          h-[90px] w-[158px]
                          -translate-x-1/2
                        "
                        style={{
                          transform: "translateZ(45px)",
                        }}
                      >
                        <div
                          className="
                            absolute left-[10px] top-[15px]
                            h-[68px] w-[73px]
                            -rotate-[35deg]
                            rounded-[100%_20%_100%_20%]
                            border-[16px]
                            border-[#211a14]
                          "
                        />

                        <div
                          className="
                            absolute right-[10px] top-[15px]
                            h-[68px] w-[73px]
                            rotate-[35deg]
                            rounded-[20%_100%_20%_100%]
                            border-[16px]
                            border-[#211a14]
                          "
                        />

                        <div
                          className="
                            absolute left-1/2
                            top-[37px] h-10 w-10
                            -translate-x-1/2
                            rounded-full bg-[#211a14]
                          "
                        />
                      </motion.div>

                      {/* Magnetic mini gifts */}

                      {[
                        {
                          icon: Flower2,
                          position: "-left-[78px] top-[30px]",
                        },
                        {
                          icon: CakeSlice,
                          position: "-right-[72px] top-[64px]",
                        },
                        {
                          icon: Heart,
                          position: "-left-[65px] bottom-[12px]",
                        },
                        {
                          icon: Crown,
                          position: "-right-[78px] bottom-[22px]",
                        },
                      ].map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <motion.div
                            key={item.position}
                            animate={{
                              y: [0, -16, 0],
                              rotate: [0, 180, 360],
                              scale: [1, 1.12, 1],
                            }}
                            transition={{
                              y: {
                                duration: 3 + index * 0.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              },
                              rotate: {
                                duration: 9 + index,
                                repeat: Infinity,
                                ease: "linear",
                              },
                              scale: {
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              },
                            }}
                            whileHover={{
                              scale: 1.25,
                            }}
                            className={`
                              absolute z-30
                              flex h-12 w-12
                              items-center justify-center
                              rounded-[17px]
                              border border-white/85
                              bg-white/82
                              text-[#a2772b]
                              shadow-[0_16px_42px_rgba(67,44,11,0.13)]
                              backdrop-blur-xl
                              ${item.position}
                            `}
                            style={{
                              transform: "translateZ(55px)",
                            }}
                          >
                            <Icon size={17} />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Bottom details panel */}

            <AnimatePresence mode="wait">
              <motion.div
                key={`details-${activeIndex}`}
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute bottom-7
                  left-1/2 z-[90]
                  flex w-[calc(100%-28px)]
                  max-w-[770px]
                  -translate-x-1/2
                  flex-col items-center
                  justify-between gap-5
                  rounded-[28px]
                  border border-black/[0.055]
                  bg-white/82
                  px-5 py-4
                  shadow-[0_22px_75px_rgba(61,42,13,0.11)]
                  backdrop-blur-2xl
                  md:flex-row md:px-6
                "
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      flex h-12 w-12
                      shrink-0 items-center
                      justify-center
                      rounded-[17px]
                      text-white
                    "
                    style={{
                      backgroundColor: activeCollection.accent,
                      boxShadow: `0 15px 35px ${activeCollection.softAccent}`,
                    }}
                  >
                    <ActiveIcon size={19} />
                  </motion.div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13px] font-semibold text-[#201b15]">
                        {activeCollection.title}
                      </p>

                      <span
                        className="
                          rounded-full
                          bg-[#b58a3a]/10
                          px-2 py-1
                          text-[7px] font-semibold
                          uppercase tracking-[0.15em]
                          text-[#8d6726]
                        "
                      >
                        {activeCollection.subtitle}
                      </span>
                    </div>

                    <p
                      className="
                        mt-1.5 max-w-[450px]
                        text-[10px] leading-5
                        text-black/44
                      "
                    >
                      {activeCollection.description}
                    </p>
                  </div>
                </div>

                <MagneticButton
                  className="
                    group flex shrink-0
                    items-center gap-3
                    rounded-full
                    bg-[#201a15]
                    px-5 py-3
                    text-[10px]
                    font-semibold text-white
                    shadow-[0_15px_38px_rgba(27,20,12,0.17)]
                  "
                >
                  {activeCollection.button}

                  <span
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-full bg-white/10
                      transition duration-300
                      group-hover:translate-x-1
                      group-hover:bg-[#bd9142]
                    "
                  >
                    <ArrowRight size={13} />
                  </span>
                </MagneticButton>
              </motion.div>
            </AnimatePresence>

            {/* Mobile floating marquee */}

            <div
              className="
                absolute bottom-[163px]
                left-0 right-0 z-[75]
                overflow-hidden px-4 xl:hidden
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute inset-y-0 left-0
                  z-20 w-16
                  bg-gradient-to-r
                  from-[#f7f1e7]
                  to-transparent
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute inset-y-0 right-0
                  z-20 w-16
                  bg-gradient-to-l
                  from-[#f7f1e7]
                  to-transparent
                "
              />

              <motion.div
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex w-max gap-3 py-2"
              >
                {[
                  ...leftFloatingCards,
                  ...rightFloatingCards,
                  ...leftFloatingCards,
                  ...rightFloatingCards,
                ].map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={`${card.title}-mobile-${index}`}
                      className="
                        flex min-w-[190px]
                        items-center gap-3
                        rounded-[20px]
                        border border-white/85
                        bg-white/82 p-3
                        shadow-[0_14px_35px_rgba(66,43,10,0.1)]
                        backdrop-blur-xl
                      "
                    >
                      <div
                        className="
                          flex h-10 w-10
                          shrink-0 items-center
                          justify-center
                          rounded-[14px]
                          bg-[#211a14]
                          text-[#e3bd66]
                        "
                      >
                        <Icon size={15} />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-[#201a15]">
                          {card.title}
                        </p>

                        <p className="mt-1 text-[8px] text-black/40">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom strip */}

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="
            mt-8 grid gap-5
            md:grid-cols-[1fr_auto]
            md:items-center
          "
        >
          <div
            className="
              flex flex-wrap items-center
              gap-x-8 gap-y-4
              text-[10px] font-medium
              text-black/45
            "
          >
            <span className="flex items-center gap-2">
              <PackageCheck size={15} className="text-[#a77a2b]" />
              Luxury presentation
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-[#a77a2b]" />
              Secure checkout
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={15} className="text-[#a77a2b]" />
              Timely delivery
            </span>

            <span className="flex items-center gap-2">
              <Award size={15} className="text-[#a77a2b]" />
              Premium quality
            </span>
          </div>

          <MagneticButton
            className="
              group inline-flex
              items-center justify-center
              gap-3 rounded-full
              border border-black/[0.07]
              bg-white/75
              px-5 py-3
              text-[10px] font-semibold
              text-[#211b15]
              shadow-[0_12px_35px_rgba(60,40,10,0.07)]
              backdrop-blur-xl
              transition duration-300
              hover:bg-white
            "
          >
            View All Collections

            <ArrowUpRight
              size={14}
              className="
                transition duration-300
                group-hover:rotate-45
              "
            />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
