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
  Baby,
  Balloon,
  BriefcaseBusiness,
  CakeSlice,
  Check,
  ChevronLeft,
  ChevronRight,
  Crown,
  Flower2,
  Gift,
  GraduationCap,
  Heart,
  PartyPopper,
  BellRing,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

import {
  useEffect,
  useState,
  type ComponentType,
  type MouseEvent,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ProductItem = {
  name: string;
  price: string;
  icon: IconType;
};

type Occasion = {
  id: number;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  button: string;
  icon: IconType;
  secondaryIcon: IconType;
  accent: string;
  darkAccent: string;
  softAccent: string;
  gradient: string;
  glow: string;
  message: string;
  products: ProductItem[];
};

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

const occasions: Occasion[] = [
  {
    id: 1,
    title: "Make Birthdays Feel Bigger",
    shortTitle: "Birthday",
    eyebrow: "Celebrate Their Day",
    description:
      "Thoughtful birthday gifts, premium cakes and joyful surprises curated to make their special day unforgettable.",
    button: "Explore Birthday Gifts",
    icon: CakeSlice,
    secondaryIcon: Balloon,
    accent: "#b6812c",
    darkAccent: "#6f4a16",
    softAccent: "#f1dfba",
    gradient:
      "linear-gradient(135deg, #fffdf7 0%, #f4e7c9 48%, #dfbd76 100%)",
    glow: "rgba(207, 158, 70, 0.33)",
    message: "A little more joy for their biggest day.",
    products: [
      {
        name: "Golden Birthday Cake",
        price: "₹1,899",
        icon: CakeSlice,
      },
      {
        name: "Celebration Hamper",
        price: "₹2,999",
        icon: Gift,
      },
      {
        name: "Birthday Flower Edit",
        price: "₹1,599",
        icon: Flower2,
      },
    ],
  },
  {
    id: 2,
    title: "Celebrate Every Love Story",
    shortTitle: "Anniversary",
    eyebrow: "Made For Togetherness",
    description:
      "Elegant flowers, personalised keepsakes and meaningful gifts designed to celebrate another beautiful year together.",
    button: "Explore Anniversary Gifts",
    icon: Heart,
    secondaryIcon: BellRing,
    accent: "#a16858",
    darkAccent: "#6f3f34",
    softAccent: "#efd8d0",
    gradient:
      "linear-gradient(135deg, #fffaf7 0%, #efd8d1 48%, #c98e7e 100%)",
    glow: "rgba(198, 132, 113, 0.3)",
    message: "For the memories behind you and the moments ahead.",
    products: [
      {
        name: "Forever Rose Box",
        price: "₹2,499",
        icon: Flower2,
      },
      {
        name: "Memory Keepsake",
        price: "₹2,899",
        icon: Heart,
      },
      {
        name: "Couple Celebration Box",
        price: "₹3,299",
        icon: Gift,
      },
    ],
  },
  {
    id: 3,
    title: "Designed For The Big Day",
    shortTitle: "Wedding",
    eyebrow: "A Grand New Beginning",
    description:
      "Luxury wedding gifts and elegant hampers crafted to celebrate a beautiful beginning with style and warmth.",
    button: "Explore Wedding Gifts",
    icon: BellRing,
    secondaryIcon: Crown,
    accent: "#a17c36",
    darkAccent: "#65491d",
    softAccent: "#eee2c5",
    gradient:
      "linear-gradient(135deg, #fffdf8 0%, #eadfc4 48%, #c5a45f 100%)",
    glow: "rgba(181, 146, 75, 0.31)",
    message: "A timeless gift for a beautiful new chapter.",
    products: [
      {
        name: "Royal Wedding Hamper",
        price: "₹4,499",
        icon: Crown,
      },
      {
        name: "New Beginning Box",
        price: "₹3,799",
        icon: Gift,
      },
      {
        name: "Wedding Flower Story",
        price: "₹2,799",
        icon: Flower2,
      },
    ],
  },
  {
    id: 4,
    title: "Turn Success Into Celebration",
    shortTitle: "Congratulations",
    eyebrow: "Celebrate The Achievement",
    description:
      "Premium gifts for promotions, milestones, new beginnings and every achievement worth celebrating.",
    button: "Explore Congratulations Gifts",
    icon: Trophy,
    secondaryIcon: PartyPopper,
    accent: "#8a703a",
    darkAccent: "#5c461f",
    softAccent: "#e8dfc8",
    gradient:
      "linear-gradient(135deg, #fffdf8 0%, #eae1cb 48%, #b8a06a 100%)",
    glow: "rgba(171, 146, 88, 0.3)",
    message: "Because every achievement deserves a beautiful moment.",
    products: [
      {
        name: "Success Celebration Box",
        price: "₹2,999",
        icon: Trophy,
      },
      {
        name: "Premium Congratulations Cake",
        price: "₹1,799",
        icon: CakeSlice,
      },
      {
        name: "Milestone Hamper",
        price: "₹3,499",
        icon: Gift,
      },
    ],
  },
  {
    id: 5,
    title: "Professional Gifting, Refined",
    shortTitle: "Corporate",
    eyebrow: "Designed For Business",
    description:
      "Curated corporate gifts for employees, clients and partners, presented with premium quality and professional elegance.",
    button: "Explore Corporate Gifts",
    icon: BriefcaseBusiness,
    secondaryIcon: Crown,
    accent: "#786241",
    darkAccent: "#493b28",
    softAccent: "#e6dfd3",
    gradient:
      "linear-gradient(135deg, #fffefa 0%, #e5ded2 48%, #a99473 100%)",
    glow: "rgba(148, 128, 93, 0.28)",
    message: "Build stronger relationships through thoughtful gifting.",
    products: [
      {
        name: "Executive Gift Box",
        price: "₹3,999",
        icon: BriefcaseBusiness,
      },
      {
        name: "Client Appreciation Hamper",
        price: "₹4,499",
        icon: Gift,
      },
      {
        name: "Team Celebration Box",
        price: "₹2,799",
        icon: Trophy,
      },
    ],
  },
  {
    id: 6,
    title: "No Occasion Needed",
    shortTitle: "Just Because",
    eyebrow: "Unexpected. Thoughtful. Beautiful.",
    description:
      "Sometimes the best gifts arrive without a reason. Send a thoughtful surprise and make an ordinary day special.",
    button: "Explore Just Because Gifts",
    icon: Gift,
    secondaryIcon: Sparkles,
    accent: "#9c6948",
    darkAccent: "#60422f",
    softAccent: "#ead8cc",
    gradient:
      "linear-gradient(135deg, #fffaf6 0%, #ead8cd 48%, #c49070 100%)",
    glow: "rgba(192, 132, 97, 0.28)",
    message: "A simple surprise can become their favourite memory.",
    products: [
      {
        name: "Thinking Of You Box",
        price: "₹2,299",
        icon: Heart,
      },
      {
        name: "Fresh Flower Surprise",
        price: "₹1,799",
        icon: Flower2,
      },
      {
        name: "Little Joy Hamper",
        price: "₹2,499",
        icon: Gift,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                              Floating Product                              */
/* -------------------------------------------------------------------------- */

function FloatingProductCard({
  product,
  index,
  occasion,
}: {
  product: ProductItem;
  index: number;
  occasion: Occasion;
}) {
  const Icon = product.icon;

  const positions = [
    "left-[3%] top-[17%] rotate-[-5deg]",
    "right-[3%] top-[21%] rotate-[5deg]",
    "bottom-[4%] left-[12%] rotate-[3deg]",
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0],
      }}
      exit={{
        opacity: 0,
        scale: 0.75,
        y: -25,
      }}
      transition={{
        opacity: {
          duration: 0.45,
          delay: index * 0.08,
        },
        scale: {
          duration: 0.5,
          delay: index * 0.08,
        },
        y: {
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`
        absolute z-40
        hidden w-[190px]
        rounded-[25px]
        border border-white/75
        bg-white/68 p-3
        shadow-[0_22px_65px_rgba(69,44,12,0.12)]
        backdrop-blur-2xl
        xl:block
        ${positions[index]}
      `}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex h-12 w-12
            shrink-0 items-center justify-center
            rounded-[17px]
            border border-white/60
            text-[#2d2419]
            shadow-inner
          "
          style={{
            background: occasion.gradient,
          }}
        >
          <Icon size={18} strokeWidth={1.4} />
        </motion.div>

        <div className="min-w-0">
          <p className="truncate text-[9px] font-semibold text-[#211a15]">
            {product.name}
          </p>

          <p
            className="mt-1 text-[8px] font-semibold"
            style={{
              color: occasion.accent,
            }}
          >
            {product.price}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Occasion Visual                               */
/* -------------------------------------------------------------------------- */

function OccasionVisual({ occasion }: { occasion: Occasion }) {
  const Icon = occasion.icon;
  const SecondaryIcon = occasion.secondaryIcon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={occasion.id}
        initial={{
          opacity: 0,
          scale: 0.75,
          rotateY: -25,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateY: 0,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          rotateY: 25,
          y: -30,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative flex
          h-[360px] w-[360px]
          items-center justify-center
          sm:h-[430px] sm:w-[430px]
          lg:h-[500px] lg:w-[500px]
        "
      >
        {/* Outer orbital rings */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute inset-[8px]
            rounded-full border
            border-dashed border-black/10
          "
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute inset-[42px]
            rounded-full border
            border-black/[0.08]
          "
        />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute inset-[78px]
            rounded-full border
            border-dashed border-black/[0.09]
          "
        />

        {/* Orbit dots */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[20px]"
        >
          <div
            className="
              absolute left-1/2 top-0
              h-4 w-4 -translate-x-1/2
              rounded-full border-4 border-white
              shadow-[0_8px_20px_rgba(55,34,8,0.18)]
            "
            style={{
              backgroundColor: occasion.accent,
            }}
          />
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[55px]"
        >
          <div
            className="
              absolute bottom-[6%] right-[2%]
              h-3 w-3
              rounded-full border-[3px]
              border-white
              shadow-[0_8px_18px_rgba(55,34,8,0.16)]
            "
            style={{
              backgroundColor: occasion.accent,
            }}
          />
        </motion.div>

        {/* Main glow */}

        <motion.div
          animate={{
            scale: [1, 1.16, 1],
            opacity: [0.38, 0.65, 0.38],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute h-[280px] w-[280px]
            rounded-full blur-[80px]
            sm:h-[330px] sm:w-[330px]
          "
          style={{
            backgroundColor: occasion.glow,
          }}
        />

        {/* Main glass circle */}

        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 1.5, -1.5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative z-20 flex
            h-[220px] w-[220px]
            items-center justify-center
            overflow-hidden rounded-full
            border border-white/65
            bg-white/44
            shadow-[0_40px_100px_rgba(68,43,11,0.16)]
            backdrop-blur-2xl
            sm:h-[270px] sm:w-[270px]
            lg:h-[310px] lg:w-[310px]
          "
          style={{
            background: occasion.gradient,
          }}
        >
          <motion.div
            animate={{
              x: ["-160%", "280%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="
              absolute inset-y-0 z-20
              w-20 rotate-[18deg]
              bg-gradient-to-r
              from-transparent
              via-white/55
              to-transparent
              blur-2xl
            "
          />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-30 text-[#2b2218]"
          >
            <Icon
              size={92}
              strokeWidth={1}
              className="sm:h-[115px] sm:w-[115px] lg:h-[132px] lg:w-[132px]"
            />
          </motion.div>

          <div
            className="
              absolute bottom-7 left-1/2
              -translate-x-1/2 whitespace-nowrap
              text-[8px] font-bold
              uppercase tracking-[0.24em]
              text-[#322719]/55
            "
          >
            BGS moments
          </div>
        </motion.div>

        {/* Top floating icon */}

        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute right-[8%] top-[11%]
            z-30 flex h-16 w-16
            items-center justify-center
            rounded-[22px]
            border border-white/70
            bg-white/65
            text-[#2b2218]
            shadow-[0_18px_45px_rgba(62,40,11,0.12)]
            backdrop-blur-xl
          "
        >
          <SecondaryIcon size={24} strokeWidth={1.4} />
        </motion.div>

        {/* Bottom badge */}

        <motion.div
          animate={{
            y: [0, 9, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute bottom-[9%] left-[4%]
            z-30 flex items-center gap-2
            rounded-full border
            border-white/75
            bg-white/70 px-4 py-3
            text-[8px] font-semibold
            text-[#2c2319]
            shadow-[0_16px_40px_rgba(61,39,10,0.1)]
            backdrop-blur-xl
          "
        >
          <Star
            size={12}
            fill="currentColor"
            style={{
              color: occasion.accent,
            }}
          />

          Curated for the moment
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

export default function OccasionJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 75,
    damping: 24,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 75,
    damping: 24,
  });

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-4, 4]
  );

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [3.5, -3.5]
  );

  const spotlightX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["25%", "75%"]
  );

  const spotlightY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["20%", "80%"]
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % occasions.length
      );
    }, 5200);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const activeOccasion = occasions[activeIndex];

  function handleMouseMove(
    event: MouseEvent<HTMLDivElement>
  ) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  function nextOccasion() {
    setActiveIndex(
      (current) => (current + 1) % occasions.length
    );
  }

  function previousOccasion() {
    setActiveIndex(
      (current) =>
        (current - 1 + occasions.length) %
        occasions.length
    );
  }

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#f8f5ee]
        py-24 text-[#181511]
        lg:py-32
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.23, 0.42, 0.23],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute -left-[230px]
            top-[70px]
            h-[620px] w-[620px]
            rounded-full blur-[180px]
          "
          style={{
            backgroundColor: activeOccasion.glow,
          }}
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.18, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute -right-[240px]
            bottom-[-70px]
            h-[650px] w-[650px]
            rounded-full blur-[190px]
          "
          style={{
            backgroundColor: activeOccasion.glow,
          }}
        />

        <div
          className="
            absolute inset-0
            opacity-[0.022]
            [background-image:linear-gradient(to_right,#392d1e_1px,transparent_1px),linear-gradient(to_bottom,#392d1e_1px,transparent_1px)]
            [background-size:62px_62px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-5 md:px-8 lg:px-12">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mx-auto max-w-[880px] text-center"
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-[#af8438]/20
              bg-white/70 px-4 py-2
              shadow-[0_10px_35px_rgba(82,58,20,0.06)]
              backdrop-blur-xl
            "
          >
            <Sparkles
              size={13}
              className="text-[#9d7228]"
            />

            <span
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.27em]
                text-[#79551f]
              "
            >
              Gift By Occasion
            </span>
          </div>

          <h2
            className="
              mt-7 text-[44px]
              font-semibold leading-[0.95]
              tracking-[-0.06em]
              sm:text-[60px]
              lg:text-[78px]
            "
          >
            Every moment has
            <span
              className="
                block bg-gradient-to-r
                from-[#73501a]
                via-[#bd9041]
                to-[#73501a]
                bg-clip-text text-transparent
              "
            >
              a perfect gift.
            </span>
          </h2>

          <p
            className="
              mx-auto mt-7 max-w-[650px]
              text-[14px] leading-7
              text-black/48
              md:text-[15px]
            "
          >
            Choose the occasion and discover gifts thoughtfully
            curated for the people, emotions and memories that
            matter most.
          </p>
        </motion.div>

        {/* Occasion selector */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            delay: 0.1,
          }}
          viewport={{ once: true }}
          className="
            mx-auto mt-12 flex
            max-w-[1100px]
            gap-2 overflow-x-auto
            rounded-[26px]
            border border-black/[0.05]
            bg-white/62 p-2
            shadow-[0_18px_55px_rgba(65,43,13,0.07)]
            backdrop-blur-2xl
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={occasion.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`
                  relative flex min-w-[145px]
                  flex-1 items-center justify-center
                  gap-2 overflow-hidden
                  rounded-[20px] px-4 py-3.5
                  text-[9px] font-semibold
                  transition duration-500
                  ${
                    isActive
                      ? "text-white shadow-[0_14px_35px_rgba(47,31,12,0.16)]"
                      : "text-black/45 hover:bg-white hover:text-black/75"
                  }
                `}
                style={{
                  backgroundColor: isActive
                    ? occasion.darkAccent
                    : "transparent",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-occasion-tab"
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${occasion.darkAccent}, ${occasion.accent})`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 26,
                    }}
                  />
                )}

                <Icon
                  size={14}
                  className="relative z-10 shrink-0"
                />

                <span className="relative z-10 whitespace-nowrap">
                  {occasion.shortTitle}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Main experience panel */}

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            resetMouse();
          }}
          initial={{
            opacity: 0,
            y: 65,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.95,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            relative mt-8
            min-h-[780px]
            overflow-hidden
            rounded-[40px]
            border border-black/[0.055]
            bg-white/53
            shadow-[0_55px_150px_rgba(65,42,12,0.11)]
            backdrop-blur-2xl
            lg:rounded-[52px]
          "
        >
          {/* Inner animated environment */}

          <div
            className="
              pointer-events-none
              absolute inset-3
              overflow-hidden
              rounded-[32px]
              border border-white/75
              lg:rounded-[44px]
            "
            style={{
              background: activeOccasion.gradient,
            }}
          >
            <motion.div
              style={{
                left: spotlightX,
                top: spotlightY,
              }}
              className="
                absolute h-[520px] w-[520px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full bg-white/45
                blur-[120px]
              "
            />

            <div
              className="
                absolute inset-0
                bg-gradient-to-br
                from-white/45
                via-transparent
                to-black/[0.025]
              "
            />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 34,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute left-1/2 top-1/2
                h-[900px] w-[900px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border border-dashed border-white/40
              "
            />

            {Array.from({ length: 20 }).map((_, index) => (
              <motion.span
                key={index}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.25, 0.8, 0.25],
                  scale: [0.8, 1.25, 0.8],
                }}
                transition={{
                  duration: 3.5 + (index % 5),
                  repeat: Infinity,
                  delay: index * 0.17,
                  ease: "easeInOut",
                }}
                className="
                  absolute h-[4px] w-[4px]
                  rounded-full bg-white
                  shadow-[0_0_15px_rgba(255,255,255,0.9)]
                "
                style={{
                  left: `${6 + ((index * 17) % 90)}%`,
                  top: `${8 + ((index * 23) % 82)}%`,
                }}
              />
            ))}
          </div>

          {/* Floating desktop products */}

          <AnimatePresence mode="wait">
            <div key={`floating-${activeOccasion.id}`}>
              {activeOccasion.products.map(
                (product, index) => (
                  <FloatingProductCard
                    key={product.name}
                    product={product}
                    index={index}
                    occasion={activeOccasion}
                  />
                )
              )}
            </div>
          </AnimatePresence>

          {/* Main content */}

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="
              relative z-20 grid
              min-h-[780px]
              items-center gap-10
              px-6 py-14
              md:px-10
              lg:grid-cols-[0.92fr_1.08fr]
              lg:px-16 lg:py-16
              xl:px-24
              [perspective:1600px]
              [transform-style:preserve-3d]
            "
          >
            {/* Text */}

            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeOccasion.id}`}
                initial={{
                  opacity: 0,
                  x: -45,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 35,
                  y: -10,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-30 max-w-[610px]"
                style={{
                  transform: "translateZ(55px)",
                }}
              >
                <div
                  className="
                    inline-flex items-center
                    gap-2 rounded-full
                    border border-white/65
                    bg-white/55 px-4 py-2.5
                    text-[9px] font-semibold
                    uppercase tracking-[0.2em]
                    shadow-[0_12px_30px_rgba(59,38,10,0.07)]
                    backdrop-blur-xl
                  "
                  style={{
                    color: activeOccasion.darkAccent,
                  }}
                >
                  <Sparkles size={12} />

                  {activeOccasion.eyebrow}
                </div>

                <h3
                  className="
                    mt-7 text-[43px]
                    font-semibold leading-[0.96]
                    tracking-[-0.055em]
                    text-[#211a14]
                    sm:text-[57px]
                    xl:text-[70px]
                  "
                >
                  {activeOccasion.title}
                </h3>

                <p
                  className="
                    mt-6 max-w-[540px]
                    text-[13px] leading-7
                    text-[#211a14]/53
                    md:text-[14px]
                  "
                >
                  {activeOccasion.description}
                </p>

                <div
                  className="
                    mt-7 flex items-start gap-3
                    rounded-[23px]
                    border border-white/60
                    bg-white/42 p-4
                    shadow-[0_14px_40px_rgba(60,38,10,0.06)]
                    backdrop-blur-xl
                  "
                >
                  <div
                    className="
                      mt-0.5 flex h-8 w-8
                      shrink-0 items-center
                      justify-center rounded-full
                      text-white
                    "
                    style={{
                      backgroundColor:
                        activeOccasion.darkAccent,
                    }}
                  >
                    <Check size={14} />
                  </div>

                  <p className="text-[10px] leading-5 text-[#211a14]/55">
                    {activeOccasion.message}
                  </p>
                </div>

                {/* Mobile product list */}

                <div className="mt-6 grid gap-2 xl:hidden">
                  {activeOccasion.products.map((product) => {
                    const ProductIcon = product.icon;

                    return (
                      <div
                        key={product.name}
                        className="
                          flex items-center justify-between
                          rounded-[19px]
                          border border-white/60
                          bg-white/48 p-3
                          backdrop-blur-xl
                        "
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex h-10 w-10
                              items-center justify-center
                              rounded-[14px]
                              bg-white/65
                              text-[#2a2117]
                            "
                          >
                            <ProductIcon size={16} />
                          </div>

                          <p className="text-[9px] font-semibold text-[#211a15]">
                            {product.name}
                          </p>
                        </div>

                        <p
                          className="text-[9px] font-semibold"
                          style={{
                            color: activeOccasion.darkAccent,
                          }}
                        >
                          {product.price}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="
                      group flex items-center
                      gap-4 rounded-full
                      px-6 py-4
                      text-[10px] font-semibold
                      text-white
                      shadow-[0_20px_45px_rgba(48,31,10,0.17)]
                      transition duration-300
                      hover:-translate-y-1
                    "
                    style={{
                      background: `linear-gradient(135deg, ${activeOccasion.darkAccent}, ${activeOccasion.accent})`,
                    }}
                  >
                    {activeOccasion.button}

                    <span
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-full bg-white/12
                        transition duration-300
                        group-hover:translate-x-1
                        group-hover:bg-white/20
                      "
                    >
                      <ArrowRight size={14} />
                    </span>
                  </button>

                  <div
                    className="
                      flex items-center gap-2
                      rounded-full border
                      border-white/65
                      bg-white/45 px-4 py-3
                      text-[8px] font-semibold
                      text-[#211a14]/55
                      backdrop-blur-xl
                    "
                  >
                    <Star
                      size={12}
                      fill="currentColor"
                      style={{
                        color: activeOccasion.accent,
                      }}
                    />

                    4.9 average rating
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Visual */}

            <div
              className="
                relative flex
                min-h-[520px]
                items-center justify-center
              "
              style={{
                transform: "translateZ(30px)",
              }}
            >
              <OccasionVisual occasion={activeOccasion} />
            </div>
          </motion.div>

          {/* Bottom navigation */}

          <div
            className="
              absolute bottom-6 left-1/2
              z-50 flex -translate-x-1/2
              items-center gap-3
              rounded-full border
              border-white/70
              bg-white/64 p-2
              shadow-[0_18px_50px_rgba(60,38,10,0.1)]
              backdrop-blur-2xl
            "
          >
            <button
              type="button"
              onClick={previousOccasion}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-white/80
                text-black/55
                transition duration-300
                hover:-translate-x-1
                hover:bg-[#211a14]
                hover:text-white
              "
            >
              <ChevronLeft size={15} />
            </button>

            <div className="flex items-center gap-1.5">
              {occasions.map((occasion, index) => (
                <button
                  key={occasion.id}
                  type="button"
                  aria-label={occasion.shortTitle}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    h-[7px] rounded-full
                    transition-all duration-500
                    ${
                      index === activeIndex
                        ? "w-8"
                        : "w-[7px] bg-black/15"
                    }
                  `}
                  style={{
                    backgroundColor:
                      index === activeIndex
                        ? activeOccasion.accent
                        : undefined,
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextOccasion}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-white/80
                text-black/55
                transition duration-300
                hover:translate-x-1
                hover:bg-[#211a14]
                hover:text-white
              "
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </motion.div>

        {/* Bottom occasion cards */}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon;
            const isActive = index === activeIndex;

            return (
              <motion.button
                key={occasion.id}
                type="button"
                whileHover={{
                  y: -6,
                }}
                onClick={() => setActiveIndex(index)}
                className={`
                  relative overflow-hidden
                  rounded-[24px]
                  border p-4 text-left
                  transition duration-500
                  ${
                    isActive
                      ? "border-transparent shadow-[0_20px_55px_rgba(66,42,11,0.12)]"
                      : "border-black/[0.05] bg-white/55 hover:bg-white/80"
                  }
                `}
                style={{
                  background: isActive
                    ? occasion.gradient
                    : undefined,
                }}
              >
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-[15px]
                    border border-white/60
                    bg-white/58
                    text-[#211a14]
                    backdrop-blur-xl
                  "
                >
                  <Icon size={17} />
                </div>

                <p className="mt-4 text-[10px] font-semibold text-[#211a15]">
                  {occasion.shortTitle}
                </p>

                <p className="mt-1 text-[8px] leading-4 text-black/38">
                  Curated premium collection
                </p>

                {isActive && (
                  <motion.div
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    className="
                      absolute bottom-0 left-0
                      h-[3px] w-full
                      origin-left
                    "
                    style={{
                      backgroundColor: occasion.accent,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
