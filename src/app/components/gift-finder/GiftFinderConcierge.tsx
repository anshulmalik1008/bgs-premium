"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CakeSlice,
  Check,
  ChevronRight,
  Coffee,
  Crown,
  Gift,
  Heart,
  LoaderCircle,
  
  Palette,
  PartyPopper,
  Plane,
  Plus,
  RefreshCw,
  BellRing,
  ShoppingBag,
  Sparkles,
  Star,
  UserRound,
  UsersRound,
  WalletCards,
  WandSparkles,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type MouseEvent,
} from "react";


type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type FinderOption = {
  id: string;
  label: string;
  description: string;
  icon: IconType;

};

type FinderStep = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  options: FinderOption[];
};

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: string;
  match: number;
  description: string;
  reason: string;
  icon: IconType;
  gradient: string;
  accent: string;
  badge: string;
};

type Answers = {
  recipient: string;
  occasion: string;
  budget: string;
  personality: string;
};

/* -------------------------------------------------------------------------- */
/*                                 Finder Data                                */
/* -------------------------------------------------------------------------- */

const finderSteps: FinderStep[] = [
  {
    id: "recipient",
    eyebrow: "Step One",
    title: "Who are you gifting?",
    description:
      "Choose the person you want to surprise so we can understand the right emotion and gifting style.",
    options: [
      {
        id: "partner",
        label: "Partner",
        description: "Romantic and meaningful",
        icon: Heart,
      },
      {
        id: "family",
        label: "Family",
        description: "Warm and thoughtful",
        icon: UsersRound,
      },
      {
        id: "friend",
        label: "Friend",
        description: "Fun and memorable",
        icon: UserRound,
      },
      {
        id: "colleague",
        label: "Colleague",
        description: "Professional and refined",
        icon: BriefcaseBusiness,
      },
    ],
  },
  {
    id: "occasion",
    eyebrow: "Step Two",
    title: "What is the moment?",
    description:
      "Select the occasion so each recommendation feels relevant, personal and celebration-ready.",
    options: [
      {
        id: "birthday",
        label: "Birthday",
        description: "Celebrate their special day",
        icon: CakeSlice,
      },
      {
        id: "anniversary",
        label: "Anniversary",
        description: "Celebrate your journey",
        icon: BellRing,
      },
      {
        id: "celebration",
        label: "Congratulations",
        description: "Mark a proud achievement",
        icon: PartyPopper,
      },
      {
        id: "just-because",
        label: "Just Because",
        description: "Make an ordinary day special",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "budget",
    eyebrow: "Step Three",
    title: "Choose your budget",
    description:
      "We will keep every recommendation comfortably within your preferred gifting range.",
    options: [
      {
        id: "under-1500",
        label: "Under ₹1,500",
        description: "Small but thoughtful",
        icon: WalletCards,
      },
      {
        id: "1500-3000",
        label: "₹1,500 – ₹3,000",
        description: "Premium everyday gifting",
        icon: Gift,
      },
      {
        id: "3000-5000",
        label: "₹3,000 – ₹5,000",
        description: "Luxury celebration gifts",
        icon: Crown,
      },
      {
        id: "above-5000",
        label: "Above ₹5,000",
        description: "Statement gifting",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "personality",
    eyebrow: "Step Four",
    title: "What are they like?",
    description:
      "Their personality helps us choose something that feels naturally made for them.",
    options: [
      {
        id: "elegant",
        label: "Elegant",
        description: "Minimal, graceful and refined",
        icon: Crown,
      },
      {
        id: "creative",
        label: "Creative",
        description: "Expressive and original",
        icon: Palette,
      },
      {
        id: "cozy",
        label: "Cozy",
        description: "Comfort-loving and warm",
        icon: Coffee,
      },
      {
        id: "adventurous",
        label: "Adventurous",
        description: "Curious and experience-driven",
        icon: Plane,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               Product Data                                 */
/* -------------------------------------------------------------------------- */

const productPool: Product[] = [
  {
    id: 1,
    name: "Royal Celebration Hamper",
    category: "Premium Hamper",
    price: "₹3,499",
    rating: "4.9",
    match: 96,
    description:
      "A luxury assortment of gourmet treats and elegant keepsakes.",
    reason:
      "A balanced premium choice for meaningful celebrations and elegant personalities.",
    icon: Gift,
    gradient:
      "linear-gradient(145deg, #fffdf7 0%, #ead9b6 50%, #bd8b39 100%)",
    accent: "#9b712d",
    badge: "Best Match",
  },
  {
    id: 2,
    name: "Personalised Memory Box",
    category: "Personalised Gift",
    price: "₹2,899",
    rating: "4.9",
    match: 94,
    description:
      "A customised keepsake box featuring their name and your message.",
    reason:
      "Perfect for recipients who appreciate personal details and lasting memories.",
    icon: Heart,
    gradient:
      "linear-gradient(145deg, #fffaf7 0%, #ebd1c8 50%, #bf7e69 100%)",
    accent: "#9c604d",
    badge: "Made For Them",
  },
  {
    id: 3,
    name: "Blush Flower Story",
    category: "Luxury Flowers",
    price: "₹1,899",
    rating: "4.8",
    match: 92,
    description:
      "Fresh premium flowers arranged with soft textures and signature wrapping.",
    reason:
      "A beautiful emotional gift for warm, romantic and thoughtful moments.",
    icon: Sparkles,
    gradient:
      "linear-gradient(145deg, #fffaf8 0%, #edd8d0 50%, #ca927f 100%)",
    accent: "#a46d59",
    badge: "Fresh Today",
  },
  {
    id: 4,
    name: "Golden Birthday Cake",
    category: "Premium Cake",
    price: "₹1,599",
    rating: "4.8",
    match: 91,
    description:
      "A beautifully finished celebration cake with luxurious golden details.",
    reason:
      "A joyful centrepiece for birthdays, achievements and surprise celebrations.",
    icon: CakeSlice,
    gradient:
      "linear-gradient(145deg, #fffdf8 0%, #eee1c5 50%, #c8a25d 100%)",
    accent: "#95702e",
    badge: "Celebration",
  },
  {
    id: 5,
    name: "Executive Signature Box",
    category: "Corporate Gifting",
    price: "₹4,299",
    rating: "4.9",
    match: 93,
    description:
      "A refined gift box curated for clients, colleagues and professionals.",
    reason:
      "Professional presentation with a premium feel that suits workplace gifting.",
    icon: BriefcaseBusiness,
    gradient:
      "linear-gradient(145deg, #fffefa 0%, #ded8ce 50%, #9d8a6d 100%)",
    accent: "#716047",
    badge: "Executive Edit",
  },
  {
    id: 6,
    name: "Comfort & Coffee Edit",
    category: "Cozy Collection",
    price: "₹2,499",
    rating: "4.8",
    match: 90,
    description:
      "A comforting collection of coffee, treats and relaxing little luxuries.",
    reason:
      "A warm match for someone who enjoys peaceful moments and cozy experiences.",
    icon: Coffee,
    gradient:
      "linear-gradient(145deg, #fffaf4 0%, #e3d4c2 50%, #a77855 100%)",
    accent: "#80583d",
    badge: "Cozy Favourite",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Magnetic Button                               */
/* -------------------------------------------------------------------------- */

function MagneticButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 220,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 220,
    damping: 20,
  });

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        group flex items-center justify-center
        gap-3 rounded-full
        bg-[#211a14]
        px-6 py-4
        text-[10px] font-semibold
        text-white
        shadow-[0_20px_50px_rgba(31,22,12,0.2)]
        transition
        hover:bg-[#32271d]
      "
    >
      {children}
    </motion.button>
  );
}


function OptionCard({
  option,
  selected,
  index,
  onClick,
}: {
  option: FinderOption;
  selected: boolean;
  index: number;
  onClick: () => void;
}) {
  const Icon = option.icon;

  return (
    <motion.button
      type="button"
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`
        group relative overflow-hidden
        rounded-[25px] border p-4
        text-left transition duration-500
        sm:p-5
        ${
          selected
            ? "border-[#a97c32]/35 bg-[#211a14] text-white shadow-[0_24px_60px_rgba(36,25,13,0.2)]"
            : "border-black/[0.055] bg-white/66 text-[#211a15] shadow-[0_15px_40px_rgba(66,43,12,0.055)] hover:bg-white"
        }
      `}
    >
      <motion.div
        animate={
          selected
            ? {
                x: ["-180%", "350%"],
              }
            : {}
        }
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none absolute
          inset-y-0 w-16
          rotate-[20deg]
          bg-gradient-to-r
          from-transparent via-white/15 to-transparent
          blur-xl
        "
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div
          className={`
            flex h-12 w-12
            items-center justify-center
            rounded-[17px] border
            transition duration-500
            ${
              selected
                ? "border-white/15 bg-white/10 text-[#dfb75f]"
                : "border-black/[0.05] bg-[#f5efe4] text-[#8c6425]"
            }
          `}
        >
          <Icon size={19} strokeWidth={1.45} />
        </div>

        <div
          className={`
            flex h-7 w-7
            items-center justify-center
            rounded-full border
            transition duration-500
            ${
              selected
                ? "border-[#dcb25d] bg-[#dcb25d] text-[#211a14]"
                : "border-black/10 bg-white/65 text-transparent"
            }
          `}
        >
          <Check size={13} />
        </div>
      </div>

      <div className="relative z-10 mt-5">
        <p className="text-[12px] font-semibold">
          {option.label}
        </p>

        <p
          className={`
            mt-2 text-[9px] leading-5
            ${
              selected
                ? "text-white/45"
                : "text-black/38"
            }
          `}
        >
          {option.description}
        </p>
      </div>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Match Circle                                  */
/* -------------------------------------------------------------------------- */

function MatchCircle({
  value,
  accent,
}: {
  value: number;
  accent: string;
}) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (value / 100) * circumference;

  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg
        viewBox="0 0 60 60"
        className="-rotate-90"
      >
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth="4"
        />

        <motion.circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1.2,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="text-[10px] font-bold text-[#211a15]"
        >
          {value}%
        </motion.span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Recommendation Card                            */
/* -------------------------------------------------------------------------- */

function RecommendationCard({
  product,
  index,
  onAdd,
}: {
  product: Product;
  index: number;
  onAdd: () => void;
}) {
  const Icon = product.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 150,
    damping: 22,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 150,
    damping: 22,
  });

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-5, 5]
  );

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [4, -4]
  );

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    );
  }

  function reset() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 45,
        scale: 0.92,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="
        relative overflow-hidden
        rounded-[30px]
        border border-black/[0.055]
        bg-white/70 p-3
        shadow-[0_30px_80px_rgba(67,43,12,0.09)]
        backdrop-blur-2xl
        [perspective:1300px]
      "
    >
      <div
        className="
          relative flex min-h-[220px]
          items-center justify-center
          overflow-hidden rounded-[24px]
        "
        style={{
          background: product.gradient,
          transform: "translateZ(24px)",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute h-[180px] w-[180px]
            rounded-full bg-white/55
            blur-[60px]
          "
        />

        <motion.div
          animate={{
            x: ["-180%", "300%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
          }}
          className="
            absolute inset-y-0 z-30
            w-16 rotate-[18deg]
            bg-gradient-to-r
            from-transparent via-white/60 to-transparent
            blur-xl
          "
        />

        <div
          className="
            absolute left-3 top-3 z-30
            rounded-full
            border border-white/60
            bg-white/65 px-3 py-2
            text-[7px] font-semibold
            text-[#3b2b18]
            backdrop-blur-xl
          "
        >
          {product.badge}
        </div>

        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative z-20 flex h-[125px] w-[125px]
            items-center justify-center
            rounded-[38px]
            border border-white/60
            bg-white/40
            text-[#2b2117]
            shadow-[0_24px_60px_rgba(70,44,11,0.18)]
            backdrop-blur-xl
          "
        >
          <Icon size={50} strokeWidth={1.1} />
        </motion.div>
      </div>

      <div
        className="p-3 pt-5"
        style={{
          transform: "translateZ(16px)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="text-[8px] font-semibold uppercase tracking-[0.16em]"
              style={{
                color: product.accent,
              }}
            >
              {product.category}
            </p>

            <h4 className="mt-2 text-[17px] font-semibold leading-tight tracking-[-0.035em] text-[#211a15]">
              {product.name}
            </h4>
          </div>

          <MatchCircle
            value={product.match}
            accent={product.accent}
          />
        </div>

        <p className="mt-3 text-[9px] leading-5 text-black/42">
          {product.description}
        </p>

        <div
          className="
            mt-4 rounded-[18px]
            border border-black/[0.045]
            bg-[#f8f4ec] p-3
          "
        >
          <div className="flex items-start gap-2">
            <WandSparkles
              size={13}
              className="mt-0.5 shrink-0 text-[#a27732]"
            />

            <p className="text-[8px] leading-4 text-black/44">
              <span className="font-semibold text-[#211a15]">
                Why it fits:
              </span>{" "}
              {product.reason}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1">
              <Star
                size={10}
                fill="currentColor"
                className="text-[#d7aa4c]"
              />

              <span className="text-[8px] font-semibold text-black/50">
                {product.rating}
              </span>
            </div>

            <p className="mt-1 text-[16px] font-semibold text-[#211a15]">
              {product.price}
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={onAdd}
            className="
              group flex h-11
              items-center gap-2
              rounded-full
              bg-[#211a14]
              px-4 text-[8px]
              font-semibold text-white
              shadow-[0_14px_35px_rgba(31,22,12,0.18)]
            "
          >
            <Plus
              size={13}
              className="transition group-hover:rotate-90"
            />

            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 AI Loader                                  */
/* -------------------------------------------------------------------------- */

function GiftFinderLoader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="
        flex min-h-[620px]
        flex-col items-center justify-center
        px-6 text-center
      "
    >
      <div className="relative flex h-[210px] w-[210px] items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute inset-0 rounded-full
            border border-dashed border-[#b88a3e]/35
          "
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute inset-[25px]
            rounded-full border
            border-[#b88a3e]/20
          "
        />

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative z-20 flex h-[115px] w-[115px]
            items-center justify-center
            rounded-[38px]
            border border-white/70
            bg-gradient-to-br
            from-[#fffdf8]
            to-[#e3c993]
            text-[#7d571d]
            shadow-[0_25px_70px_rgba(82,53,12,0.16)]
          "
        >
          <WandSparkles size={42} strokeWidth={1.15} />
        </motion.div>

        {Array.from({ length: 6 }).map((_, index) => (
          <motion.span
            key={index}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[14px]"
          >
            <span
              className="
                absolute left-1/2 top-0
                h-2 w-2 -translate-x-1/2
                rounded-full bg-[#c4943f]
                shadow-[0_0_14px_rgba(196,148,63,0.7)]
              "
            />
          </motion.span>
        ))}
      </div>

      <motion.div
        animate={{
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
        }}
        className="mt-8 flex items-center gap-3"
      >
        <LoaderCircle
          size={17}
          className="animate-spin text-[#a77828]"
        />

        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#77531d]">
          Curating perfect matches
        </span>
      </motion.div>

      <h3 className="mt-5 text-[31px] font-semibold tracking-[-0.045em] text-[#211a15]">
        Reading their gifting style...
      </h3>

      <p className="mt-4 max-w-[430px] text-[11px] leading-6 text-black/42">
        We are combining your recipient, occasion, budget and
        personality choices to create the strongest recommendations.
      </p>

      <div className="mt-7 flex gap-2">
        {[0, 1, 2].map((item) => (
          <motion.span
            key={item}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: item * 0.18,
            }}
            className="h-2 w-2 rounded-full bg-[#b18336]"
          />
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

export default function GiftFinderConcierge() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    recipient: "",
    occasion: "",
    budget: "",
    personality: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [isFinding, setIsFinding] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [addedProduct, setAddedProduct] = useState<number | null>(
    null
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 24,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 24,
  });

  const glowX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["20%", "80%"]
  );

  const glowY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["15%", "85%"]
  );

  const activeStep = finderSteps[currentStep];
  const activeAnswer =
    answers[activeStep.id as keyof Answers];

  const progress = showResults
    ? 100
    : ((currentStep + 1) / finderSteps.length) * 100;

  const recommendations = useMemo(() => {
    let sorted = [...productPool];

    if (answers.budget === "under-1500") {
      sorted = [
        productPool[3],
        productPool[2],
        productPool[5],
      ];
    }

    if (answers.budget === "1500-3000") {
      sorted = [
        productPool[1],
        productPool[5],
        productPool[2],
      ];
    }

    if (answers.budget === "3000-5000") {
      sorted = [
        productPool[0],
        productPool[4],
        productPool[1],
      ];
    }

    if (answers.budget === "above-5000") {
      sorted = [
        productPool[4],
        productPool[0],
        productPool[1],
      ];
    }

    if (answers.personality === "cozy") {
      sorted = [
        productPool[5],
        productPool[1],
        productPool[0],
      ];
    }

    if (answers.personality === "creative") {
      sorted = [
        productPool[1],
        productPool[2],
        productPool[0],
      ];
    }

    if (answers.recipient === "colleague") {
      sorted = [
        productPool[4],
        productPool[0],
        productPool[5],
      ];
    }

    if (answers.occasion === "birthday") {
      sorted = [
        productPool[3],
        productPool[0],
        productPool[1],
      ];
    }

    if (answers.occasion === "anniversary") {
      sorted = [
        productPool[1],
        productPool[2],
        productPool[0],
      ];
    }

    return sorted.slice(0, 3).map((product, index) => ({
      ...product,
      match: Math.max(product.match - index * 2, 87),
    }));
  }, [answers]);

  function selectOption(optionId: string) {
    setAnswers((current) => ({
      ...current,
      [activeStep.id]: optionId,
    }));
  }

  function nextStep() {
    if (!activeAnswer) return;

    if (currentStep < finderSteps.length - 1) {
      setCurrentStep((current) => current + 1);
      return;
    }

    setIsFinding(true);

    window.setTimeout(() => {
      setIsFinding(false);
      setShowResults(true);
    }, 2600);
  }

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep((current) => current - 1);
    }
  }

  function restartFinder() {
    setShowResults(false);
    setIsFinding(false);
    setCurrentStep(0);
    setAnswers({
      recipient: "",
      occasion: "",
      budget: "",
      personality: "",
    });
  }

  function addToCart(productId: number) {
    setCartCount((current) => current + 1);
    setAddedProduct(productId);

    window.setTimeout(() => {
      setAddedProduct(null);
    }, 1300);
  }

  function handleMouseMove(
    event: MouseEvent<HTMLDivElement>
  ) {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    );
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#f7f3eb]
        py-24 text-[#211a15]
        lg:py-32
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -left-[230px] top-[-60px]
            h-[640px] w-[640px]
            rounded-full bg-[#d8bd87]/25
            blur-[180px]
          "
        />

        <div
          className="
            absolute -right-[220px] bottom-[-90px]
            h-[660px] w-[660px]
            rounded-full bg-[#dfc89a]/24
            blur-[190px]
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.023]
            [background-image:linear-gradient(to_right,#392d1d_1px,transparent_1px),linear-gradient(to_bottom,#392d1d_1px,transparent_1px)]
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
          className="mx-auto max-w-[900px] text-center"
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-[#aa7c30]/20
              bg-white/70 px-4 py-2
              shadow-[0_10px_35px_rgba(82,58,20,0.06)]
              backdrop-blur-xl
            "
          >
            <WandSparkles
              size={13}
              className="text-[#9b6e27]"
            />

            <span
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.27em]
                text-[#77521d]
              "
            >
              Personal Gift Concierge
            </span>
          </div>

          <h2
            className="
              mt-7 text-[43px]
              font-semibold leading-[0.95]
              tracking-[-0.06em]
              sm:text-[60px]
              lg:text-[78px]
            "
          >
            Your perfect gift,
            <span
              className="
                block bg-gradient-to-r
                from-[#74501a]
                via-[#bd9041]
                to-[#74501a]
                bg-clip-text text-transparent
              "
            >
              found in seconds.
            </span>
          </h2>

          <p
            className="
              mx-auto mt-7 max-w-[670px]
              text-[14px] leading-7
              text-black/48
              md:text-[15px]
            "
          >
            Tell us a little about the person and the moment. Our
            concierge will curate gifts that match their personality,
            your budget and the occasion.
          </p>
        </motion.div>

        {/* Main Finder Panel */}

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMouse}
          initial={{
            opacity: 0,
            y: 65,
            scale: 0.975,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.95,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="
            relative mt-16
            overflow-hidden
            rounded-[40px]
            border border-black/[0.055]
            bg-white/52
            shadow-[0_55px_150px_rgba(65,42,12,0.11)]
            backdrop-blur-2xl
            lg:rounded-[52px]
          "
        >
          <motion.div
            style={{
              left: glowX,
              top: glowY,
            }}
            className="
              pointer-events-none
              absolute h-[560px] w-[560px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full bg-[#e1c994]/27
              blur-[125px]
            "
          />

          <div
            className="
              pointer-events-none absolute inset-3
              rounded-[32px]
              border border-white/75
              lg:rounded-[44px]
            "
          />

          {/* Header */}

          <div
            className="
              relative z-20 flex flex-wrap
              items-center justify-between gap-5
              border-b border-black/[0.05]
              px-6 py-5
              md:px-9
              lg:px-12
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
                  items-center justify-center
                  rounded-[17px]
                  bg-[#211a14]
                  text-[#ddb35c]
                  shadow-[0_14px_35px_rgba(31,22,12,0.18)]
                "
              >
                <WandSparkles size={20} />
              </motion.div>

              <div>
                <p className="text-[11px] font-semibold text-[#211a15]">
                  BGS Gift Concierge
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-black/32">
                  Personal recommendations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="
                  relative flex h-11
                  items-center gap-2
                  rounded-full
                  border border-black/[0.05]
                  bg-white/68 px-4
                  text-[9px] font-semibold
                  text-[#211a15]
                  shadow-[0_10px_30px_rgba(60,38,10,0.06)]
                "
              >
                <ShoppingBag size={14} />

                Cart

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      exit={{
                        scale: 0,
                      }}
                      className="
                        flex h-6 min-w-6
                        items-center justify-center
                        rounded-full
                        bg-[#b28335]
                        px-1.5 text-[8px]
                        text-white
                      "
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Progress */}

          <div className="relative z-20 px-6 pt-7 md:px-9 lg:px-12">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/35">
                {showResults
                  ? "Recommendations ready"
                  : `Step ${currentStep + 1} of ${finderSteps.length}`}
              </span>

              <span className="text-[9px] font-semibold text-[#8c6427]">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-black/[0.055]">
              <motion.div
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  h-full rounded-full
                  bg-gradient-to-r
                  from-[#8b6122]
                  via-[#c39442]
                  to-[#e0bd6d]
                "
              />
            </div>
          </div>

          {/* Finder Content */}

          <div className="relative z-20 min-h-[710px] px-6 py-9 md:px-9 lg:px-12">
            <AnimatePresence mode="wait">
              {isFinding ? (
                <GiftFinderLoader key="loader" />
              ) : showResults ? (
                <motion.div
                  key="results"
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex flex-wrap items-end justify-between gap-5">
                    <div>
                      <div
                        className="
                          inline-flex items-center gap-2
                          rounded-full
                          bg-[#e8d6b2]/55
                          px-4 py-2
                          text-[8px] font-semibold
                          uppercase tracking-[0.18em]
                          text-[#77501a]
                        "
                      >
                        <Sparkles size={11} />

                        Your curated matches
                      </div>

                      <h3
                        className="
                          mt-5 text-[34px]
                          font-semibold tracking-[-0.045em]
                          text-[#211a15]
                          sm:text-[46px]
                        "
                      >
                        These gifts feel just right.
                      </h3>

                      <p className="mt-3 max-w-[600px] text-[11px] leading-6 text-black/43">
                        Each recommendation is based on the choices you
                        made. The strongest matches appear first.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={restartFinder}
                      className="
                        flex items-center gap-2
                        rounded-full border
                        border-black/[0.06]
                        bg-white/70 px-5 py-3.5
                        text-[9px] font-semibold
                        text-[#211a15]
                        transition
                        hover:-translate-y-1
                        hover:bg-white
                      "
                    >
                      <RefreshCw size={13} />
                      Start Again
                    </button>
                  </div>
                  

                  <div className="mt-9 grid gap-5 lg:grid-cols-3">
                    {recommendations.map((product, index) => (
                      <div
                        key={product.id}
                        className="relative"
                      >
                        <RecommendationCard
                          product={product}
                          index={index}
                          onAdd={() =>
                            addToCart(product.id)
                          }
                        />

                        <AnimatePresence>
                          {addedProduct === product.id && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                scale: 0.7,
                                y: 10,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.8,
                                y: -15,
                              }}
                              className="
                                absolute left-1/2 top-1/2
                                z-50 flex
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center gap-2
                                rounded-full
                                bg-[#211a14]
                                px-4 py-3
                                text-[9px] font-semibold
                                text-white
                                shadow-[0_20px_50px_rgba(31,22,12,0.3)]
                              "
                            >
                              <Check
                                size={13}
                                className="text-[#dfb65d]"
                              />

                              Added to cart
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div
                    className="
                      mt-7 flex flex-wrap
                      items-center justify-between gap-5
                      rounded-[28px]
                      border border-black/[0.05]
                      bg-[#211a14]
                      p-5 text-white
                      shadow-[0_25px_70px_rgba(31,22,12,0.2)]
                      sm:p-6
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex h-12 w-12
                          items-center justify-center
                          rounded-[17px]
                          bg-white/10 text-[#dfb65d]
                        "
                      >
                        <Crown size={20} />
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold">
                          Need a more exclusive recommendation?
                        </p>

                        <p className="mt-1 text-[8px] leading-4 text-white/42">
                          Speak with our premium gifting concierge.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="
                        flex items-center gap-3
                        rounded-full
                        bg-white px-5 py-3.5
                        text-[9px] font-semibold
                        text-[#211a15]
                        transition hover:-translate-y-1
                      "
                    >
                      Talk to Concierge
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeStep.id}
                  initial={{
                    opacity: 0,
                    x: 35,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -35,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    grid min-h-[610px]
                    items-center gap-10
                    lg:grid-cols-[0.8fr_1.2fr]
                    lg:gap-16
                  "
                >
                  {/* Step Information */}

                  <div>
                    <div
                      className="
                        inline-flex items-center gap-2
                        rounded-full
                        border border-[#ab7f35]/15
                        bg-[#eadab9]/48
                        px-4 py-2
                        text-[8px] font-semibold
                        uppercase tracking-[0.18em]
                        text-[#79531b]
                      "
                    >
                      <Sparkles size={11} />

                      {activeStep.eyebrow}
                    </div>

                    <h3
                      className="
                        mt-6 text-[38px]
                        font-semibold leading-[0.98]
                        tracking-[-0.05em]
                        text-[#211a15]
                        sm:text-[50px]
                        lg:text-[58px]
                      "
                    >
                      {activeStep.title}
                    </h3>

                    <p className="mt-5 max-w-[480px] text-[11px] leading-6 text-black/43">
                      {activeStep.description}
                    </p>

                    <div
                      className="
                        mt-8 rounded-[26px]
                        border border-black/[0.05]
                        bg-white/58 p-5
                        shadow-[0_18px_50px_rgba(65,42,12,0.06)]
                        backdrop-blur-xl
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex h-10 w-10
                            items-center justify-center
                            rounded-[14px]
                            bg-[#211a14]
                            text-[#dfb75f]
                          "
                        >
                          <WandSparkles size={16} />
                        </div>

                        <div>
                          <p className="text-[9px] font-semibold text-[#211a15]">
                            Concierge insight
                          </p>

                          <p className="mt-1 text-[8px] leading-4 text-black/37">
                            Each answer improves the quality of your
                            final matches.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={previousStep}
                          className="
                            flex h-12 items-center gap-2
                            rounded-full
                            border border-black/[0.06]
                            bg-white/65 px-5
                            text-[9px] font-semibold
                            text-[#211a15]
                            transition
                            hover:-translate-x-1
                            hover:bg-white
                          "
                        >
                          <ArrowLeft size={13} />
                          Back
                        </button>
                      )}

                      <MagneticButton onClick={nextStep}>
                        {currentStep ===
                        finderSteps.length - 1
                          ? "Find My Gifts"
                          : "Continue"}

                        <span
                          className="
                            flex h-7 w-7
                            items-center justify-center
                            rounded-full bg-white/10
                            transition
                            group-hover:translate-x-1
                          "
                        >
                          {currentStep ===
                          finderSteps.length - 1 ? (
                            <WandSparkles size={13} />
                          ) : (
                            <ArrowRight size={13} />
                          )}
                        </span>
                      </MagneticButton>

                      {!activeAnswer && (
                        <motion.span
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          className="text-[8px] text-black/30"
                        >
                          Select one option to continue
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Options */}

                  <div
                    className="
                      relative rounded-[32px]
                      border border-black/[0.05]
                      bg-white/38 p-3
                      shadow-[0_28px_80px_rgba(65,42,12,0.07)]
                      backdrop-blur-xl
                      sm:p-5
                    "
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {activeStep.options.map(
                        (option, index) => (
                          <OptionCard
                            key={option.id}
                            option={option}
                            selected={
                              activeAnswer === option.id
                            }
                            index={index}
                            onClick={() =>
                              selectOption(option.id)
                            }
                          />
                        )
                      )}
                    </div>

                    <div
                      className="
                        mt-4 flex items-center
                        justify-between rounded-[20px]
                        border border-black/[0.045]
                        bg-white/62 px-4 py-3
                      "
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className="
                                flex h-7 w-7
                                items-center justify-center
                                rounded-full border-2
                                border-white
                                bg-gradient-to-br
                                from-[#ead9b6]
                                to-[#aa7c32]
                                text-[7px] font-bold
                                text-white
                              "
                            >
                              {item}
                            </div>
                          ))}
                        </div>

                        <p className="text-[8px] text-black/38">
                          Trusted by 50K+ gift shoppers
                        </p>
                      </div>

                      <ChevronRight
                        size={14}
                        className="text-black/25"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom Benefits */}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Personal Matches",
              text: "Recommendations built around your answers.",
              icon: WandSparkles,
            },
            {
              title: "Budget Friendly",
              text: "Suggestions stay within your selected range.",
              icon: WalletCards,
            },
            {
              title: "Premium Quality",
              text: "Only carefully curated gift collections.",
              icon: Crown,
            },
            {
              title: "Ready To Send",
              text: "Beautiful presentation and secure delivery.",
              icon: Gift,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                viewport={{ once: true }}
                className="
                  flex items-center gap-4
                  rounded-[24px]
                  border border-black/[0.05]
                  bg-white/58 p-4
                  shadow-[0_16px_45px_rgba(65,42,12,0.055)]
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex h-11 w-11
                    shrink-0 items-center
                    justify-center
                    rounded-[15px]
                    bg-[#eee2ca]
                    text-[#8d6526]
                  "
                >
                  <Icon size={17} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold text-[#211a15]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-black/36">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
