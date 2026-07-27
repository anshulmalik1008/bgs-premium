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
  Crown,
  Flower2,
  Gift,
  Heart,
  PackageOpen,
  ShoppingBag,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type MouseEvent,
  type ReactNode,
} from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type CollectionItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  rating: string;
  badge: string;
  icon: IconType;
  gradient: string;
  accent: string;
  soft: string;
};

const collectionItems: CollectionItem[] = [
  {
    id: 1,
    title: "The Grand Celebration",
    category: "Luxury Hampers",
    description:
      "A refined hamper with gourmet treats, keepsakes and elegant presentation.",
    price: "₹3,499",
    rating: "4.9",
    badge: "Bestseller",
    icon: Gift,
    gradient:
      "linear-gradient(145deg, #fffdf8 0%, #eadab8 48%, #c3984f 100%)",
    accent: "#9c742d",
    soft: "#f2e7cf",
  },
  {
    id: 2,
    title: "Blush Flower Story",
    category: "Premium Flowers",
    description:
      "Soft blooms, premium wrapping and a timeless luxury arrangement.",
    price: "₹2,199",
    rating: "4.8",
    badge: "Fresh Today",
    icon: Flower2,
    gradient:
      "linear-gradient(145deg, #fff9f7 0%, #edcfca 48%, #c78778 100%)",
    accent: "#a56f62",
    soft: "#f3dfda",
  },
  {
    id: 3,
    title: "Golden Cake Moment",
    category: "Signature Cakes",
    description:
      "A celebration cake crafted with premium finishes and thoughtful detail.",
    price: "₹1,899",
    rating: "5.0",
    badge: "Celebration",
    icon: CakeSlice,
    gradient:
      "linear-gradient(145deg, #fffaf2 0%, #eadcc2 48%, #b99358 100%)",
    accent: "#87663a",
    soft: "#eee2cc",
  },
  {
    id: 4,
    title: "Memory Keepsake Box",
    category: "Personalised Gifts",
    description:
      "Personalised with their name, message and your favourite memories.",
    price: "₹2,899",
    rating: "4.9",
    badge: "Made For You",
    icon: Heart,
    gradient:
      "linear-gradient(145deg, #fff8f4 0%, #e7cec4 48%, #b97962 100%)",
    accent: "#95614e",
    soft: "#efdcd4",
  },
];

const orbitLabels = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Corporate",
  "Just Because",
];

function MagneticButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 18,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 18,
  });

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.15);
    y.set(offsetY * 0.15);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function GiftCube({ activeItem }: { activeItem: CollectionItem }) {
  const Icon = activeItem.icon;

  return (
    <div className="relative flex h-full min-h-[350px] items-center justify-center lg:min-h-[560px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[330px] w-[330px] rounded-full border border-[#b89045]/15 lg:h-[470px] lg:w-[470px]"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[255px] w-[255px] rounded-full border border-dashed border-[#b89045]/20 lg:h-[370px] lg:w-[370px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.14, 1],
          opacity: [0.28, 0.58, 0.28],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-[260px] w-[260px] rounded-full bg-[#d7bb7b]/35 blur-[90px] lg:h-[380px] lg:w-[380px]"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{
            opacity: 0,
            scale: 0.75,
            rotateY: -45,
            y: 35,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
            y: [0, -12, 0],
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            rotateY: 45,
            y: -20,
          }}
          transition={{
            opacity: { duration: 0.45 },
            scale: { duration: 0.55 },
            rotateY: { duration: 0.65 },
            y: {
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative z-20 flex h-[190px] w-[190px] items-center justify-center rounded-[52px] border border-white/75 shadow-[0_45px_110px_rgba(72,43,6,0.22)] backdrop-blur-xl lg:h-[285px] lg:w-[285px] lg:rounded-[72px]"
          style={{
            background: activeItem.gradient,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-[110px] w-[110px] items-center justify-center rounded-[36px] border border-white/65 bg-white/32 text-[#241a12] shadow-[0_20px_45px_rgba(73,44,11,0.14)] backdrop-blur-xl lg:h-[165px] lg:w-[165px] lg:rounded-[48px]"
          >
            <Icon
              size={55}
              strokeWidth={1.15}
              className="lg:h-[80px] lg:w-[80px]"
            />
          </motion.div>

          <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/45 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#392a18] backdrop-blur-xl lg:left-6 lg:top-6">
            {activeItem.badge}
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold tracking-[0.28em] text-[#342719]/55 lg:bottom-7 lg:text-[10px]">
            BGS LUXURY
          </div>
        </motion.div>
      </AnimatePresence>

      {orbitLabels.map((label, index) => {
        const angles = [-88, -22, 48, 120, 192];
        const radius = 43;
        const angle = angles[index] * (Math.PI / 180);
        const left = 50 + radius * Math.cos(angle);
        const top = 50 + radius * Math.sin(angle);

        return (
          <motion.div
            key={label}
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3.4 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.18,
            }}
            className="absolute z-30 hidden rounded-full border border-black/[0.05] bg-white/72 px-3 py-2 text-[8px] font-semibold text-black/50 shadow-[0_12px_35px_rgba(60,38,8,0.08)] backdrop-blur-xl md:block"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {label}
          </motion.div>
        );
      })}

      {[0, 1, 2, 3, 4, 5].map((particle) => (
        <motion.div
          key={particle}
          animate={{
            y: [0, -14, 0],
            x: [0, particle % 2 === 0 ? 7 : -7, 0],
            opacity: [0.25, 0.85, 0.25],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + particle * 0.45,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle * 0.22,
          }}
          className="absolute z-10 h-2 w-2 rounded-full bg-[#b78a38]/55 blur-[1px]"
          style={{
            left: `${22 + particle * 11}%`,
            top: `${18 + (particle % 3) * 24}%`,
          }}
        />
      ))}
    </div>
  );
}

function CollectionCard({
  item,
  active,
  onClick,
}: {
  item: CollectionItem;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      className={`group relative overflow-hidden rounded-[28px] border p-4 text-left transition-all duration-500 sm:p-5 ${
        active
          ? "border-[#b48a3c]/35 bg-white shadow-[0_28px_80px_rgba(64,39,8,0.12)]"
          : "border-black/[0.05] bg-white/55 shadow-[0_16px_45px_rgba(64,39,8,0.06)] hover:bg-white/85"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 25% 15%, ${item.soft}, transparent 58%)`,
        }}
      />

      <div className="relative z-10 flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[19px] border border-white/70 text-[#241a12] shadow-[0_14px_30px_rgba(62,38,7,0.09)]"
          style={{ background: item.gradient }}
        >
          <Icon size={23} strokeWidth={1.35} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-[13px] font-semibold tracking-[-0.02em] text-[#1f1914]">
              {item.title}
            </p>

            <span className="rounded-full bg-[#211a14] px-2.5 py-1.5 text-[8px] font-semibold text-white">
              {item.price}
            </span>
          </div>

          <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-black/35">
            {item.category}
          </p>

          <p className="mt-3 line-clamp-2 text-[10px] leading-5 text-black/43">
            {item.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[9px] font-semibold text-black/55">
              <Star
                size={11}
                fill="currentColor"
                className="text-[#c69b4b]"
              />
              {item.rating}
            </div>

            <span className="flex items-center gap-1.5 text-[9px] font-semibold text-[#8f6829] transition-transform duration-300 group-hover:translate-x-1">
              View
              <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function LuxuryExperienceWall() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 75,
    damping: 22,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 75,
    damping: 22,
  });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["25%", "75%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["20%", "80%"]);

  const activeItem = useMemo(
    () => collectionItems[activeIndex],
    [activeIndex]
  );

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % collectionItems.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f4ed] py-24 text-[#1c1813] lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-0 h-[600px] w-[600px] rounded-full bg-[#ddc99d]/25 blur-[170px]" />
        <div className="absolute -right-52 bottom-0 h-[650px] w-[650px] rounded-full bg-[#d6bd85]/25 blur-[185px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#342819_1px,transparent_1px),linear-gradient(to_bottom,#342819_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mx-auto max-w-[900px] text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b98d3e]/20 bg-white/72 px-4 py-2 shadow-[0_10px_35px_rgba(72,48,13,0.06)] backdrop-blur-xl">
            <WandSparkles size={13} className="text-[#a87c2d]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#805b22]">
              Luxury Experience Wall
            </span>
          </div>

          <h2 className="mt-7 text-[44px] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[60px] lg:text-[82px]">
            Every gift carries
            <span className="block bg-gradient-to-r from-[#80591c] via-[#c1984d] to-[#80591c] bg-clip-text text-transparent">
              a beautiful story.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[680px] text-[14px] leading-7 text-black/48 md:text-[15px]">
            Explore signature collections designed around emotions, occasions
            and unforgettable moments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 55, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            resetMouse();
          }}
          className="relative mt-16 overflow-hidden rounded-[36px] border border-black/[0.055] bg-white/48 p-3 shadow-[0_55px_150px_rgba(72,46,12,0.11)] backdrop-blur-2xl sm:p-5 lg:rounded-[52px] lg:p-7"
        >
          <motion.div
            style={{
              left: glowX,
              top: glowY,
            }}
            className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e0c58d]/30 blur-[130px]"
          />

          <div className="relative z-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative overflow-hidden rounded-[30px] border border-white/80 bg-gradient-to-br from-[#fffefa] via-[#f8f4ec] to-[#ece2d2] [perspective:1800px] lg:rounded-[42px]"
            >
              <GiftCube activeItem={activeItem} />

              <div className="absolute bottom-4 left-4 right-4 z-40 flex items-center justify-between rounded-[20px] border border-white/65 bg-white/65 px-4 py-3 shadow-[0_16px_45px_rgba(67,42,11,0.08)] backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5">
                <div>
                  <p className="text-[9px] font-semibold text-[#211a14] sm:text-[10px]">
                    {activeItem.title}
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-black/35">
                    {activeItem.category}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-[#211a14] px-3 py-2 text-[8px] font-semibold text-white">
                  <Star
                    size={10}
                    fill="currentColor"
                    className="text-[#e0b860]"
                  />
                  {activeItem.rating}
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              {collectionItems.map((item, index) => (
                <CollectionCard
                  key={item.id}
                  item={item}
                  active={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="flex flex-wrap items-center gap-3 rounded-[26px] border border-black/[0.05] bg-white/58 p-4 backdrop-blur-xl">
              {[
                { icon: Crown, label: "Curated Luxury" },
                { icon: PackageOpen, label: "Premium Packaging" },
                { icon: Sparkles, label: "Personal Touch" },
                { icon: ShoppingBag, label: "Fast Delivery" },
              ].map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 rounded-full border border-black/[0.05] bg-white/75 px-3 py-2 text-[9px] font-semibold text-black/48"
                  >
                    <Icon size={12} className="text-[#a77b2e]" />
                    {feature.label}
                  </div>
                );
              })}
            </div>

            <MagneticButton className="group flex items-center justify-center gap-3 rounded-full bg-[#211a14] px-6 py-4 text-[11px] font-semibold text-white shadow-[0_18px_45px_rgba(31,22,12,0.18)]">
              Explore All Collections

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:translate-x-1 group-hover:bg-[#b88d3e]">
                <ArrowRight size={13} />
              </span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
