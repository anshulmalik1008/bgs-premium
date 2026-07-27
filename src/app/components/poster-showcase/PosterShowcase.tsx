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
  ChevronLeft,
  ChevronRight,
  Crown,
  Flower2,
  Gift,
  Heart,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

import {
  useEffect,
  useState,
  type ComponentType,
  type MouseEvent,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: string;
  badge: string;
  icon: IconType;
  gradient: string;
  accent: string;
};

type PersonProps = {
  side: "left" | "right";
};

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

const products: Product[] = [
  {
    id: 1,
    name: "Royal Celebration Box",
    category: "Luxury Hamper",
    description:
      "Premium treats, elegant keepsakes and signature presentation for unforgettable celebrations.",
    price: "₹3,499",
    rating: "4.9",
    badge: "Bestseller",
    icon: Gift,
    gradient:
      "linear-gradient(145deg, #fffdf7 0%, #ead7b2 48%, #bc8834 100%)",
    accent: "#9a7027",
  },
  {
    id: 2,
    name: "Blush Flower Story",
    category: "Luxury Flowers",
    description:
      "Fresh flowers arranged with soft textures, premium wrapping and thoughtful details.",
    price: "₹2,199",
    rating: "4.8",
    badge: "Fresh Today",
    icon: Flower2,
    gradient:
      "linear-gradient(145deg, #fffaf7 0%, #ebd0c9 48%, #c17f6c 100%)",
    accent: "#a36e5a",
  },
  {
    id: 3,
    name: "Personalised Memory Box",
    category: "Personalised Gift",
    description:
      "A thoughtful keepsake personalised with their name, message and memories.",
    price: "₹2,899",
    rating: "4.9",
    badge: "Made For You",
    icon: Heart,
    gradient:
      "linear-gradient(145deg, #fff9f5 0%, #e7cec4 48%, #b97861 100%)",
    accent: "#98614e",
  },
  {
    id: 4,
    name: "Golden Celebration Cake",
    category: "Premium Cakes",
    description:
      "A beautifully finished celebration cake crafted for birthdays and milestones.",
    price: "₹1,899",
    rating: "5.0",
    badge: "Celebration",
    icon: CakeSlice,
    gradient:
      "linear-gradient(145deg, #fffaf2 0%, #e8dac1 48%, #b59058 100%)",
    accent: "#87643a",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Person Component                              */
/* -------------------------------------------------------------------------- */

function PosterPerson({ side }: PersonProps) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? -60 : 60,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      className="
        relative z-50
        h-[400px] w-[145px]
        shrink-0
        sm:h-[470px] sm:w-[175px]
        lg:h-[600px] lg:w-[230px]
      "
    >
      {/* Ground shadow */}

      <motion.div
        animate={{
          scaleX: [1, 0.86, 1],
          opacity: [0.22, 0.11, 0.22],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute bottom-1 left-1/2
          h-8 w-[120px]
          -translate-x-1/2
          rounded-full bg-black/25
          blur-xl
          lg:h-10 lg:w-[175px]
        "
      />

      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: isLeft ? [0, 0.5, 0] : [0, -0.5, 0],
        }}
        transition={{
          duration: 4.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        {/* Hair */}

        <div
          className={`
            absolute top-[18px] z-20
            h-[60px] w-[60px]
            rounded-[34px_34px_22px_22px]
            bg-[#211914]
            sm:h-[68px] sm:w-[68px]
            lg:top-[28px]
            lg:h-[86px] lg:w-[84px]
            ${
              isLeft
                ? "left-[42px] sm:left-[53px] lg:left-[72px]"
                : "right-[42px] sm:right-[53px] lg:right-[72px]"
            }
          `}
        >
          <div
            className={`
              absolute top-[3px]
              h-[25px] w-[43px]
              rounded-full bg-[#3b2b21]
              lg:h-[36px] lg:w-[59px]
              ${
                isLeft
                  ? "-left-[5px] -rotate-[22deg]"
                  : "-right-[5px] rotate-[22deg]"
              }
            `}
          />
        </div>

        {/* Face */}

        <div
          className={`
            absolute top-[34px] z-30
            h-[64px] w-[52px]
            rounded-[29px_29px_23px_23px]
            bg-gradient-to-br
            from-[#e5b18a]
            via-[#ca8e68]
            to-[#ad6f50]
            shadow-[0_12px_25px_rgba(78,44,25,0.18)]
            sm:top-[42px]
            sm:h-[72px] sm:w-[59px]
            lg:top-[51px]
            lg:h-[88px] lg:w-[71px]
            ${
              isLeft
                ? "left-[46px] sm:left-[57px] lg:left-[79px]"
                : "right-[46px] sm:right-[57px] lg:right-[79px]"
            }
          `}
        >
          <span className="absolute left-[12px] top-[26px] h-[3px] w-[3px] rounded-full bg-[#2a1e18] lg:left-[17px] lg:top-[35px] lg:h-[4px] lg:w-[4px]" />

          <span className="absolute right-[12px] top-[26px] h-[3px] w-[3px] rounded-full bg-[#2a1e18] lg:right-[17px] lg:top-[35px] lg:h-[4px] lg:w-[4px]" />

          <span className="absolute left-1/2 top-[31px] h-[8px] w-[3px] -translate-x-1/2 rounded-full bg-[#995e45]/55 lg:top-[42px] lg:h-[10px] lg:w-[4px]" />

          <span
            className="
              absolute left-1/2 top-[45px]
              h-[6px] w-[15px]
              -translate-x-1/2
              rounded-b-full
              border-b-2 border-[#743f35]
              lg:top-[61px]
              lg:h-[7px] lg:w-[19px]
            "
          />
        </div>

        {/* Neck */}

        <div
          className={`
            absolute top-[91px] z-20
            h-[28px] w-[23px]
            rounded-b-[11px]
            bg-[#bd805e]
            sm:top-[105px]
            lg:top-[130px]
            lg:h-[39px] lg:w-[32px]
            ${
              isLeft
                ? "left-[61px] sm:left-[75px] lg:left-[98px]"
                : "right-[61px] sm:right-[75px] lg:right-[98px]"
            }
          `}
        />

        {/* Shirt body */}

        <div
          className={`
            absolute top-[111px] z-20
            h-[160px] w-[92px]
            overflow-hidden
            rounded-[32px_32px_21px_21px]
            bg-gradient-to-b
            from-[#32291f]
            via-[#1e1914]
            to-[#100d0a]
            shadow-[0_24px_50px_rgba(28,20,11,0.22)]
            sm:top-[126px]
            sm:h-[190px] sm:w-[106px]
            lg:top-[158px]
            lg:h-[238px] lg:w-[134px]
            lg:rounded-[44px_44px_28px_28px]
            ${
              isLeft
                ? "left-[26px] sm:left-[34px] lg:left-[48px]"
                : "right-[26px] sm:right-[34px] lg:right-[48px]"
            }
          `}
        >
          <motion.div
            animate={{
              x: ["-180%", "320%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="
              absolute inset-y-0
              w-10 rotate-[18deg]
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
              blur-lg
            "
          />

          <div className="absolute left-1/2 top-[24px] h-[2px] w-[40px] -translate-x-1/2 bg-[#d2aa57]/60 lg:top-[35px] lg:w-[55px]" />

          <p
            className="
              absolute left-1/2 top-[36px]
              -translate-x-1/2
              text-[6px] font-bold
              tracking-[0.22em]
              text-[#d6b15e]
              lg:top-[53px]
              lg:text-[8px]
            "
          >
            BGS
          </p>
        </div>

        {/* Upper arm going toward poster */}

        <motion.div
          animate={{
            rotate: isLeft ? [-48, -44, -48] : [48, 44, 48],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`
            absolute top-[128px] z-30
            h-[100px] w-[22px]
            origin-top rounded-full
            bg-[#211a15]
            sm:top-[145px]
            sm:h-[115px]
            lg:top-[180px]
            lg:h-[150px] lg:w-[32px]
            ${
              isLeft
                ? "left-[99px] rotate-[-48deg] sm:left-[121px] lg:left-[145px]"
                : "right-[99px] rotate-[48deg] sm:right-[121px] lg:right-[145px]"
            }
          `}
        />

        {/* Upper forearm */}

        <motion.div
          animate={{
            rotate: isLeft ? [-89, -85, -89] : [89, 85, 89],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`
            absolute top-[187px] z-[90]
            h-[80px] w-[19px]
            origin-top rounded-full
            bg-gradient-to-b
            from-[#ca8e68]
            to-[#ad6f50]
            sm:top-[213px]
            sm:h-[91px]
            lg:top-[270px]
            lg:h-[124px] lg:w-[27px]
            ${
              isLeft
                ? "left-[132px] rotate-[-89deg] sm:left-[159px] lg:left-[198px]"
                : "right-[132px] rotate-[89deg] sm:right-[159px] lg:right-[198px]"
            }
          `}
        >
          {/* Top hand */}

          <div
            className={`
              absolute bottom-[-13px]
              h-[28px] w-[24px]
              rounded-[13px]
              bg-[#b97857]
              shadow-[0_7px_16px_rgba(70,39,23,0.16)]
              lg:bottom-[-18px]
              lg:h-[42px] lg:w-[35px]
              lg:rounded-[18px]
              ${
                isLeft
                  ? "-left-[3px] rotate-[8deg]"
                  : "-right-[3px] -rotate-[8deg]"
              }
            `}
          >
            <span
              className={`
                absolute top-[5px]
                h-[3px] w-[15px]
                rounded-full bg-[#8f5842]/40
                lg:h-[5px] lg:w-[21px]
                ${
                  isLeft ? "right-[-6px]" : "left-[-6px]"
                }
              `}
            />

            <span
              className={`
                absolute top-[12px]
                h-[3px] w-[15px]
                rounded-full bg-[#8f5842]/40
                lg:top-[15px]
                lg:h-[5px] lg:w-[21px]
                ${
                  isLeft ? "right-[-7px]" : "left-[-7px]"
                }
              `}
            />
          </div>
        </motion.div>

        {/* Lower arm toward poster */}

        <motion.div
          animate={{
            rotate: isLeft ? [-25, -21, -25] : [25, 21, 25],
          }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`
            absolute top-[185px] z-30
            h-[97px] w-[22px]
            origin-top rounded-full
            bg-[#211a15]
            sm:top-[215px]
            sm:h-[107px]
            lg:top-[252px]
            lg:h-[147px] lg:w-[31px]
            ${
              isLeft
                ? "left-[91px] rotate-[-25deg] sm:left-[111px] lg:left-[135px]"
                : "right-[91px] rotate-[25deg] sm:right-[111px] lg:right-[135px]"
            }
          `}
        />

        {/* Lower forearm */}

        <motion.div
          animate={{
            rotate: isLeft ? [-75, -71, -75] : [75, 71, 75],
          }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`
            absolute top-[255px] z-[90]
            h-[70px] w-[19px]
            origin-top rounded-full
            bg-gradient-to-b
            from-[#ca8e68]
            to-[#ad6f50]
            sm:top-[292px]
            sm:h-[80px]
            lg:top-[358px]
            lg:h-[108px] lg:w-[27px]
            ${
              isLeft
                ? "left-[121px] rotate-[-75deg] sm:left-[146px] lg:left-[181px]"
                : "right-[121px] rotate-[75deg] sm:right-[146px] lg:right-[181px]"
            }
          `}
        >
          {/* Bottom hand */}

          <div
            className={`
              absolute bottom-[-13px]
              h-[28px] w-[24px]
              rounded-[13px]
              bg-[#b97857]
              lg:bottom-[-18px]
              lg:h-[41px] lg:w-[34px]
              lg:rounded-[17px]
              ${
                isLeft
                  ? "-left-[3px] rotate-[7deg]"
                  : "-right-[3px] -rotate-[7deg]"
              }
            `}
          />
        </motion.div>

        {/* Left leg */}

        <div
          className={`
            absolute top-[264px]
            h-[123px] w-[34px]
            rounded-b-[18px]
            bg-gradient-to-b
            from-[#504235]
            to-[#28221c]
            sm:top-[304px]
            sm:h-[142px] sm:w-[40px]
            lg:top-[382px]
            lg:h-[177px] lg:w-[50px]
            lg:rounded-b-[24px]
            ${
              isLeft
                ? "left-[36px] rotate-[2deg] sm:left-[45px] lg:left-[62px]"
                : "right-[36px] -rotate-[2deg] sm:right-[45px] lg:right-[62px]"
            }
          `}
        />

        {/* Right leg */}

        <div
          className={`
            absolute top-[264px]
            h-[123px] w-[34px]
            rounded-b-[18px]
            bg-gradient-to-b
            from-[#463a30]
            to-[#25201a]
            sm:top-[304px]
            sm:h-[142px] sm:w-[40px]
            lg:top-[382px]
            lg:h-[177px] lg:w-[50px]
            lg:rounded-b-[24px]
            ${
              isLeft
                ? "left-[75px] -rotate-[2deg] sm:left-[91px] lg:left-[118px]"
                : "right-[75px] rotate-[2deg] sm:right-[91px] lg:right-[118px]"
            }
          `}
        />

        {/* Shoes */}

        <div
          className={`
            absolute bottom-[12px]
            h-[25px] w-[50px]
            rounded-[19px_23px_11px_11px]
            bg-[#17130f]
            lg:bottom-[20px]
            lg:h-[36px] lg:w-[72px]
            ${
              isLeft
                ? "left-[22px] sm:left-[28px] lg:left-[40px]"
                : "right-[22px] sm:right-[28px] lg:right-[40px]"
            }
          `}
        />

        <div
          className={`
            absolute bottom-[12px]
            h-[25px] w-[50px]
            rounded-[23px_19px_11px_11px]
            bg-[#17130f]
            lg:bottom-[20px]
            lg:h-[36px] lg:w-[72px]
            ${
              isLeft
                ? "left-[75px] sm:left-[91px] lg:left-[120px]"
                : "right-[75px] sm:right-[91px] lg:right-[120px]"
            }
          `}
        />
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Product Visual                                */
/* -------------------------------------------------------------------------- */

function ProductVisual({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.75,
        rotateY: -22,
        y: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.78,
        rotateY: 22,
        y: -25,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative flex min-h-[280px]
        items-center justify-center
        overflow-hidden rounded-[27px]
        lg:min-h-[355px]
      "
      style={{
        background: product.gradient,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.16, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute h-[240px] w-[240px]
          rounded-full bg-white/55
          blur-[70px]
        "
      />

      <motion.div
        animate={{
          x: ["-180%", "320%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "easeInOut",
        }}
        className="
          absolute inset-y-0 z-30
          w-20 rotate-[18deg]
          bg-gradient-to-r
          from-transparent
          via-white/60
          to-transparent
          blur-xl
        "
      />

      <div
        className="
          absolute left-4 top-4 z-30
          flex items-center gap-2
          rounded-full
          border border-white/65
          bg-white/65 px-3 py-2
          text-[7px] font-semibold
          text-[#4c371c]
          backdrop-blur-xl
          lg:left-5 lg:top-5
          lg:text-[8px]
        "
      >
        <Sparkles size={10} />
        {product.badge}
      </div>

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative z-20 flex
          h-[155px] w-[155px]
          items-center justify-center
          rounded-[45px]
          border border-white/60
          bg-white/40
          text-[#241b14]
          shadow-[0_30px_70px_rgba(73,45,9,0.2)]
          backdrop-blur-xl
          lg:h-[205px] lg:w-[205px]
          lg:rounded-[58px]
        "
      >
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon
            size={64}
            strokeWidth={1.15}
            className="lg:h-[82px] lg:w-[82px]"
          />
        </motion.div>

        <p
          className="
            absolute bottom-4 left-1/2
            -translate-x-1/2
            whitespace-nowrap
            text-[6px] font-bold
            tracking-[0.22em]
            text-[#35271a]/65
            lg:bottom-5 lg:text-[8px]
          "
        >
          BGS LUXURY
        </p>
      </motion.div>

      <div
        className="
          absolute bottom-4 right-4 z-30
          flex items-center gap-1.5
          rounded-full bg-[#211a14]/90
          px-3 py-2
          text-[7px] font-semibold
          text-white
          shadow-[0_12px_30px_rgba(31,22,12,0.18)]
          lg:bottom-5 lg:right-5
          lg:text-[8px]
        "
      >
        <Star
          size={10}
          fill="currentColor"
          className="text-[#dfb75e]"
        />

        {product.rating}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

export default function PosterShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 24,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
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
    [3, -3]
  );

  const lightX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["30%", "70%"]
  );

  const lightY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["25%", "75%"]
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % products.length
      );
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  function handlePosterMove(
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

  function resetPoster() {
    mouseX.set(0);
    mouseY.set(0);
  }

  function nextProduct() {
    setActiveIndex(
      (current) => (current + 1) % products.length
    );
  }

  function previousProduct() {
    setActiveIndex(
      (current) =>
        (current - 1 + products.length) % products.length
    );
  }

  const activeProduct = products[activeIndex];

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#f6f2e9]
        py-24 text-[#191611]
        lg:py-32
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -left-48 top-0
            h-[560px] w-[560px]
            rounded-full
            bg-[#dac28e]/25
            blur-[165px]
          "
        />

        <div
          className="
            absolute -right-48 bottom-0
            h-[590px] w-[590px]
            rounded-full
            bg-[#d4b986]/25
            blur-[175px]
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:linear-gradient(to_right,#342819_1px,transparent_1px),linear-gradient(to_bottom,#342819_1px,transparent_1px)]
            [background-size:58px_58px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-3 sm:px-5 md:px-8 lg:px-12">
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
          className="mx-auto max-w-[850px] text-center"
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-[#b58a3a]/20
              bg-white/70 px-4 py-2
              shadow-[0_10px_35px_rgba(82,58,20,0.06)]
              backdrop-blur-xl
            "
          >
            <ShoppingBag
              size={13}
              className="text-[#a77a2a]"
            />

            <span
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.27em]
                text-[#7d591e]
              "
            >
              Signature Product Poster
            </span>
          </div>

          <h2
            className="
              mt-7 text-[42px]
              font-semibold leading-[0.96]
              tracking-[-0.06em]
              text-[#181511]
              sm:text-[58px]
              lg:text-[76px]
            "
          >
            Presented with
            <span
              className="
                block
                bg-gradient-to-r
                from-[#80591c]
                via-[#bf9242]
                to-[#80591c]
                bg-clip-text text-transparent
              "
            >
              pride and perfection.
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
            Two BGS ambassadors hold the collection poster while
            premium products move beautifully inside it.
          </p>
        </motion.div>

        {/* Scene */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.97,
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
            amount: 0.08,
          }}
          className="
            relative mt-16
            overflow-hidden
            rounded-[34px]
            border border-black/[0.055]
            bg-white/50
            px-1 pb-4 pt-10
            shadow-[0_50px_150px_rgba(72,51,17,0.11)]
            backdrop-blur-2xl
            sm:px-3
            lg:rounded-[48px]
            lg:px-5
          "
        >
          {/* Inner background */}

          <div
            className="
              pointer-events-none
              absolute inset-3
              overflow-hidden
              rounded-[28px]
              border border-white/80
              bg-gradient-to-br
              from-[#fffefa]
              via-[#f8f4ec]
              to-[#ede3d3]
              lg:rounded-[40px]
            "
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute left-1/2 top-[43%]
                h-[600px] w-[760px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#dec691]/28
                blur-[140px]
              "
            />

            <div
              className="
                absolute bottom-0 left-0 right-0
                h-[130px]
                bg-gradient-to-t
                from-[#dfd2bf]
                via-[#eee5d8]/80
                to-transparent
              "
            />

            <div
              className="
                absolute bottom-[65px]
                left-1/2 h-[2px]
                w-[90%] -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-[#a77c32]/28
                to-transparent
              "
            />
          </div>

          {/* People and poster row */}

          <div
            className="
              relative z-20 mx-auto
              flex min-h-[510px]
              max-w-[1440px]
              items-end justify-center
              overflow-visible
              sm:min-h-[580px]
              lg:min-h-[750px]
            "
          >
            {/* Left person */}

            <div
              className="
                relative z-50
                -mr-[58px]
                sm:-mr-[70px]
                lg:-mr-[92px]
              "
            >
              <PosterPerson side="left" />
            </div>

            {/* Main poster */}

            <motion.div
              onMouseMove={handlePosterMove}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                resetPoster();
                setIsPaused(false);
              }}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="
                relative z-30
                mb-[64px]
                w-[calc(100%-120px)]
                max-w-[760px]
                sm:mb-[78px]
                sm:w-[calc(100%-160px)]
                lg:mb-[112px]
                lg:max-w-[880px]
                [perspective:1700px]
                [transform-style:preserve-3d]
              "
            >
              {/* Pointer glow */}

              <motion.div
                style={{
                  left: lightX,
                  top: lightY,
                }}
                className="
                  pointer-events-none
                  absolute z-0
                  h-[400px] w-[400px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#e0c58d]/36
                  blur-[110px]
                "
              />

              {/* Left grips */}

              <div
                className="
                  absolute -left-[15px] top-[22%]
                  z-[80] h-[48px] w-[24px]
                  rounded-l-xl
                  border-y border-l
                  border-[#8c6528]/30
                  bg-gradient-to-r
                  from-[#ad7c2c]
                  to-[#e3be69]
                  shadow-[0_8px_20px_rgba(68,43,10,0.18)]
                  lg:h-[58px]
                "
              />

              <div
                className="
                  absolute -left-[15px] bottom-[18%]
                  z-[80] h-[48px] w-[24px]
                  rounded-l-xl
                  border-y border-l
                  border-[#8c6528]/30
                  bg-gradient-to-r
                  from-[#ad7c2c]
                  to-[#e3be69]
                  shadow-[0_8px_20px_rgba(68,43,10,0.18)]
                  lg:h-[58px]
                "
              />

              {/* Right grips */}

              <div
                className="
                  absolute -right-[15px] top-[22%]
                  z-[80] h-[48px] w-[24px]
                  rounded-r-xl
                  border-y border-r
                  border-[#8c6528]/30
                  bg-gradient-to-l
                  from-[#ad7c2c]
                  to-[#e3be69]
                  shadow-[0_8px_20px_rgba(68,43,10,0.18)]
                  lg:h-[58px]
                "
              />

              <div
                className="
                  absolute -right-[15px] bottom-[18%]
                  z-[80] h-[48px] w-[24px]
                  rounded-r-xl
                  border-y border-r
                  border-[#8c6528]/30
                  bg-gradient-to-l
                  from-[#ad7c2c]
                  to-[#e3be69]
                  shadow-[0_8px_20px_rgba(68,43,10,0.18)]
                  lg:h-[58px]
                "
              />

              {/* Poster frame */}

              <div
                className="
                  relative overflow-hidden
                  rounded-[24px]
                  border-[6px]
                  border-[#211a14]
                  bg-[#211a14]
                  p-[2px]
                  shadow-[0_40px_100px_rgba(54,35,12,0.22)]
                  sm:rounded-[32px]
                  sm:border-[7px]
                  lg:rounded-[42px]
                  lg:border-[9px]
                  lg:p-[3px]
                "
                style={{
                  transform: "translateZ(30px)",
                }}
              >
                <div
                  className="
                    relative overflow-hidden
                    rounded-[17px]
                    border border-[#d4ad5a]/55
                    bg-[#faf6ef]
                    p-3
                    sm:rounded-[24px]
                    sm:p-4
                    lg:rounded-[31px]
                    lg:p-6
                  "
                >
                  {/* Moving poster reflection */}

                  <motion.div
                    animate={{
                      x: ["-180%", "350%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none
                      absolute inset-y-0 z-50
                      w-20 rotate-[17deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/60
                      to-transparent
                      blur-2xl
                    "
                  />

                  {/* Top bar */}

                  <div
                    className="
                      mb-3 flex
                      items-center justify-between
                      gap-2 rounded-[16px]
                      border border-black/[0.05]
                      bg-white/72 px-3 py-3
                      shadow-[0_12px_35px_rgba(68,44,11,0.06)]
                      backdrop-blur-xl
                      sm:mb-4 sm:rounded-[22px]
                      sm:px-4
                      lg:rounded-[24px]
                      lg:px-5 lg:py-4
                    "
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="
                          flex h-8 w-8
                          shrink-0 items-center
                          justify-center
                          rounded-[11px]
                          bg-[#211a14]
                          text-[#dfb860]
                          sm:h-10 sm:w-10
                          sm:rounded-[14px]
                        "
                      >
                        <Crown size={14} />
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold text-[#211a15] sm:text-[10px] lg:text-[11px]">
                          BGS Signature Selection
                        </p>

                        <p className="mt-1 hidden text-[7px] uppercase tracking-[0.15em] text-black/35 sm:block">
                          Premium gifts for beautiful moments
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                      {products.map((product, index) => (
                        <button
                          key={product.id}
                          type="button"
                          aria-label={product.name}
                          onClick={() => setActiveIndex(index)}
                          className={`
                            h-[6px] rounded-full
                            transition-all duration-500
                            ${
                              activeIndex === index
                                ? "w-5 bg-[#a77a2a] sm:w-8"
                                : "w-[6px] bg-black/15"
                            }
                          `}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product content */}

                  <div className="grid gap-3 lg:grid-cols-[1.04fr_0.96fr] lg:gap-5">
                    <AnimatePresence mode="wait">
                      <ProductVisual
                        key={activeProduct.id}
                        product={activeProduct}
                      />
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`details-${activeProduct.id}`}
                        initial={{
                          opacity: 0,
                          x: 30,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -25,
                        }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                          flex flex-col justify-center
                          rounded-[22px]
                          border border-black/[0.05]
                          bg-white/68 p-4
                          backdrop-blur-xl
                          lg:rounded-[32px]
                          lg:p-6
                        "
                      >
                        <div
                          className="
                            inline-flex w-fit
                            items-center gap-2
                            rounded-full
                            border border-black/[0.05]
                            bg-white px-3 py-2
                            text-[7px] font-semibold
                            uppercase tracking-[0.14em]
                            lg:text-[8px]
                          "
                          style={{
                            color: activeProduct.accent,
                          }}
                        >
                          <Sparkles size={10} />
                          {activeProduct.category}
                        </div>

                        <h3
                          className="
                            mt-4 text-[22px]
                            font-semibold leading-[1]
                            tracking-[-0.045em]
                            text-[#211a15]
                            sm:text-[26px]
                            lg:mt-5
                            lg:text-[38px]
                          "
                        >
                          {activeProduct.name}
                        </h3>

                        <p
                          className="
                            mt-3 text-[8px]
                            leading-4 text-black/45
                            sm:text-[9px]
                            lg:mt-5
                            lg:text-[10px]
                            lg:leading-5
                          "
                        >
                          {activeProduct.description}
                        </p>

                        <div className="mt-4 flex items-end justify-between lg:mt-6">
                          <div>
                            <p className="text-[7px] uppercase tracking-[0.14em] text-black/30 lg:text-[8px]">
                              Starting from
                            </p>

                            <p className="mt-1 text-[18px] font-semibold text-[#211a15] lg:text-[22px]">
                              {activeProduct.price}
                            </p>
                          </div>

                          <div
                            className="
                              flex items-center gap-1.5
                              rounded-full
                              bg-[#211a14]
                              px-3 py-2
                              text-[7px] font-semibold
                              text-white
                              lg:text-[8px]
                            "
                          >
                            <Star
                              size={10}
                              fill="currentColor"
                              className="text-[#e0b860]"
                            />

                            {activeProduct.rating}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="
                            group mt-4 flex
                            items-center justify-between
                            rounded-full
                            bg-[#211a14]
                            px-4 py-3
                            text-[8px] font-semibold
                            text-white
                            shadow-[0_15px_35px_rgba(31,22,12,0.17)]
                            lg:mt-7
                            lg:px-5 lg:py-3.5
                            lg:text-[10px]
                          "
                        >
                          Explore This Gift

                          <span
                            className="
                              flex h-6 w-6
                              items-center justify-center
                              rounded-full bg-white/10
                              transition duration-300
                              group-hover:translate-x-1
                              group-hover:bg-[#bd9142]
                              lg:h-7 lg:w-7
                            "
                          >
                            <ArrowRight size={12} />
                          </span>
                        </button>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation */}

                  <div
                    className="
                      mt-3 flex items-center
                      justify-between
                      rounded-[16px]
                      border border-black/[0.05]
                      bg-white/66 px-3 py-2
                      sm:mt-4
                      sm:rounded-[22px]
                      sm:px-4 sm:py-3
                    "
                  >
                    <button
                      type="button"
                      onClick={previousProduct}
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-full
                        border border-black/[0.06]
                        bg-white text-black/55
                        transition
                        hover:-translate-x-1
                        hover:bg-[#211a14]
                        hover:text-white
                        sm:h-9 sm:w-9
                      "
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <p className="text-[7px] font-medium uppercase tracking-[0.2em] text-black/34 sm:text-[8px]">
                      0{activeIndex + 1}
                      <span className="mx-2 text-black/15">
                        /
                      </span>
                      0{products.length}
                    </p>

                    <button
                      type="button"
                      onClick={nextProduct}
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-full
                        border border-black/[0.06]
                        bg-white text-black/55
                        transition
                        hover:translate-x-1
                        hover:bg-[#211a14]
                        hover:text-white
                        sm:h-9 sm:w-9
                      "
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right person */}

            <div
              className="
                relative z-50
                -ml-[58px]
                sm:-ml-[70px]
                lg:-ml-[92px]
              "
            >
              <PosterPerson side="right" />
            </div>
          </div>
        </motion.div>

        {/* Product rail */}

        <div
          className="
            mt-8 overflow-hidden
            rounded-[25px]
            border border-black/[0.05]
            bg-white/55 py-3
            shadow-[0_15px_45px_rgba(67,44,11,0.06)]
            backdrop-blur-xl
          "
        >
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-3 px-3"
          >
            {[...products, ...products, ...products].map(
              (product, index) => {
                const Icon = product.icon;

                return (
                  <button
                    key={`${product.id}-${index}`}
                    type="button"
                    onClick={() => {
                      const productIndex = products.findIndex(
                        (item) => item.id === product.id
                      );

                      setActiveIndex(productIndex);
                    }}
                    className="
                      flex min-w-[205px]
                      items-center gap-3
                      rounded-[19px]
                      border border-black/[0.045]
                      bg-white/75 p-3
                      text-left
                      shadow-[0_10px_28px_rgba(62,41,12,0.07)]
                    "
                  >
                    <div
                      className="
                        flex h-11 w-11
                        shrink-0 items-center
                        justify-center
                        rounded-[15px]
                        text-[#211a14]
                      "
                      style={{
                        background: product.gradient,
                      }}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[9px] font-semibold text-[#211a15]">
                        {product.name}
                      </p>

                      <p className="mt-1 text-[8px] text-black/35">
                        {product.price}
                      </p>
                    </div>
                  </button>
                );
              }
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}