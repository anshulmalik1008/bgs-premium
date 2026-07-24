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
  Check,
  ChevronRight,
  Crown,
  Flower2,
  Gift,
  Heart,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent,
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

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  icon: IconType;
  gradient: string;
  accent: string;
  badge: string;
};

type CartItem = Product & {
  quantity: number;
};

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

const products: Product[] = [
  {
    id: 1,
    name: "Royal Celebration Box",
    category: "Luxury Hamper",
    description: "Premium treats, keepsakes and elegant presentation.",
    price: 3499,
    rating: 4.9,
    icon: Gift,
    gradient:
      "linear-gradient(145deg, #FFFDF6 0%, #E8D2A8 52%, #B98635 100%)",
    accent: "#A6782A",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Blush Flower Edit",
    category: "Fresh Flowers",
    description: "Hand-arranged flowers with a refined luxury finish.",
    price: 2199,
    rating: 4.8,
    icon: Flower2,
    gradient:
      "linear-gradient(145deg, #FFF9F7 0%, #EBCFC8 52%, #C18170 100%)",
    accent: "#A86F5E",
    badge: "Fresh",
  },
  {
    id: 3,
    name: "Personalised Memory Box",
    category: "Personalised",
    description: "A premium keepsake created with names and memories.",
    price: 2899,
    rating: 4.9,
    icon: Heart,
    gradient:
      "linear-gradient(145deg, #FFF8F4 0%, #E7CDC1 52%, #B97860 100%)",
    accent: "#9E624D",
    badge: "Custom",
  },
  {
    id: 4,
    name: "Signature Gold Hamper",
    category: "Premium Collection",
    description: "A rich collection designed for unforgettable moments.",
    price: 4299,
    rating: 5,
    icon: Crown,
    gradient:
      "linear-gradient(145deg, #FFFDF5 0%, #E7D5B1 52%, #A9772B 100%)",
    accent: "#966820",
    badge: "Exclusive",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Magnetic Button                               */
/* -------------------------------------------------------------------------- */

function MagneticButton({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 250,
    damping: 19,
  });

  const smoothY = useSpring(y, {
    stiffness: 250,
    damping: 19,
  });

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    const element = buttonRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) * 0.17);
    y.set((event.clientY - centerY) * 0.17);
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
      whileTap={{
        scale: 0.95,
      }}
      onMouseMove={handleMove}
      onMouseLeave={resetPosition}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Product Card                                 */
/* -------------------------------------------------------------------------- */

function ProductCard({
  product,
  isSelected,
  onSelect,
  onAdd,
}: {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onAdd: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 170,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 170,
    damping: 20,
  });

  const rotateY = useTransform(smoothX, [-20, 20], [-5, 5]);
  const rotateX = useTransform(smoothY, [-20, 20], [5, -5]);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const element = cardRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) * 0.12);
    y.set((event.clientY - centerY) * 0.12);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const Icon = product.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onSelect}
      style={{
        x: smoothX,
        y: smoothY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        y: -7,
      }}
      className={`
        group relative cursor-pointer
        overflow-hidden rounded-[28px]
        border p-3
        transition-colors duration-500
        [transform-style:preserve-3d]
        ${
          isSelected
            ? "border-[#b88935]/30 bg-white shadow-[0_28px_75px_rgba(70,46,12,0.13)]"
            : "border-black/[0.05] bg-white/58 shadow-[0_18px_55px_rgba(70,46,12,0.07)]"
        }
      `}
    >
      <div
        className="
          relative flex min-h-[180px]
          items-center justify-center
          overflow-hidden rounded-[22px]
        "
        style={{
          background: product.gradient,
          transform: "translateZ(20px)",
        }}
      >
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
            absolute inset-y-0
            w-16 rotate-[18deg]
            bg-gradient-to-r
            from-transparent
            via-white/55
            to-transparent
            blur-xl
          "
        />

        <span
          className="
            absolute left-3 top-3
            rounded-full border
            border-white/60
            bg-white/65 px-2.5 py-1
            text-[7px] font-bold
            uppercase tracking-[0.14em]
            text-[#4f371a]
            backdrop-blur-xl
          "
        >
          {product.badge}
        </span>

        <motion.div
          animate={{
            y: [0, -7, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex h-[92px] w-[92px]
            items-center justify-center
            rounded-[32px]
            border border-white/55
            bg-white/42
            text-[#2b2117]
            shadow-[0_25px_55px_rgba(72,45,10,0.16)]
            backdrop-blur-xl
          "
        >
          <Icon size={39} strokeWidth={1.35} />
        </motion.div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-[#211a14]/90 px-2.5 py-1.5 text-[8px] font-semibold text-white">
          <Star
            size={10}
            fill="currentColor"
            className="text-[#e3bd68]"
          />

          {product.rating}
        </div>
      </div>

      <div
        className="px-2 pb-1 pt-4"
        style={{
          transform: "translateZ(14px)",
        }}
      >
        <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#a0762c]">
          {product.category}
        </p>

        <h3 className="mt-2 text-[15px] font-semibold tracking-[-0.025em] text-[#211a15]">
          {product.name}
        </h3>

        <p className="mt-2 text-[9px] leading-4 text-black/40">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[7px] uppercase tracking-[0.14em] text-black/30">
              Starting from
            </p>

            <p className="mt-1 text-[14px] font-semibold text-[#211a15]">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          <MagneticButton
            onClick={() => {
              onSelect();
              onAdd();
            }}
            className="
              group flex items-center gap-2
              rounded-full bg-[#211a14]
              px-4 py-2.5
              text-[9px] font-semibold
              text-white
              shadow-[0_12px_28px_rgba(31,23,13,0.17)]
            "
          >
            Add

            <Plus
              size={12}
              className="
                transition duration-300
                group-hover:rotate-90
              "
            />
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Shopping Cart                                */
/* -------------------------------------------------------------------------- */

function ShoppingTrolley({
  count,
  isAdding,
}: {
  count: number;
  isAdding: boolean;
}) {
  return (
    <motion.div
      animate={{
        x: isAdding ? [0, 15, -4, 0] : [0, 3, 0],
      }}
      transition={{
        duration: isAdding ? 0.75 : 3,
        repeat: isAdding ? 0 : Infinity,
        ease: "easeInOut",
      }}
      className="
        relative mx-auto
        h-[190px] w-[260px]
      "
    >
      <motion.div
        animate={{
          opacity: [0.12, 0.24, 0.12],
          scaleX: [1, 0.82, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute bottom-2 left-1/2
          h-7 w-[200px]
          -translate-x-1/2
          rounded-full bg-black/25
          blur-xl
        "
      />

      {/* Cart handle */}

      <div
        className="
          absolute left-7 top-6
          h-[10px] w-[65px]
          -rotate-[7deg]
          rounded-full
          bg-[#241c15]
        "
      />

      <div
        className="
          absolute left-[73px] top-[10px]
          h-[52px] w-[9px]
          -rotate-[7deg]
          rounded-full
          bg-[#241c15]
        "
      />

      {/* Cart basket */}

      <div
        className="
          absolute left-[70px] top-[52px]
          h-[84px] w-[155px]
          -skew-x-[7deg]
          overflow-hidden
          rounded-[13px_21px_26px_20px]
          border-[7px] border-[#241c15]
          bg-white/30
          shadow-[0_22px_55px_rgba(61,40,12,0.14)]
          backdrop-blur-xl
        "
      >
        <div className="absolute inset-x-0 top-[24px] h-[6px] bg-[#241c15]/85" />
        <div className="absolute inset-x-0 top-[51px] h-[6px] bg-[#241c15]/85" />

        <div className="absolute inset-y-0 left-[42px] w-[6px] bg-[#241c15]/85" />
        <div className="absolute inset-y-0 left-[92px] w-[6px] bg-[#241c15]/85" />

        <AnimatePresence>
          {Array.from({
            length: Math.min(count, 4),
          }).map((_, index) => (
            <motion.div
              key={`${count}-${index}`}
              initial={{
                opacity: 0,
                y: -80,
                rotate: -15,
                scale: 0.6,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: index % 2 === 0 ? -4 : 5,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 16,
                delay: index * 0.05,
              }}
              className="
                absolute bottom-2
                h-11 w-10 rounded-[11px]
                border border-white/60
                bg-gradient-to-br
                from-[#fff8e8]
                to-[#c8943c]
                shadow-[0_8px_18px_rgba(68,43,9,0.16)]
              "
              style={{
                left: 12 + index * 31,
              }}
            >
              <div className="absolute left-1/2 top-0 h-full w-[7px] -translate-x-1/2 bg-[#292018]" />
              <div className="absolute left-0 top-[9px] h-[6px] w-full bg-[#292018]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cart frame */}

      <div
        className="
          absolute left-[82px] top-[132px]
          h-[8px] w-[138px]
          rounded-full bg-[#241c15]
        "
      />

      {/* Wheels */}

      {[105, 194].map((left, index) => (
        <motion.div
          key={left}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: isAdding ? 0.6 : 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute bottom-[18px]
            h-9 w-9 rounded-full
            border-[7px] border-[#241c15]
            bg-[#d4a451]
            shadow-[0_8px_18px_rgba(45,31,14,0.18)]
          "
          style={{ left }}
        >
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#241c15]/50" />
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#241c15]/50" />
        </motion.div>
      ))}

      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            className="
              absolute right-4 top-5
              flex h-9 w-9
              items-center justify-center
              rounded-full
              border-4 border-[#f6f0e6]
              bg-[#211a14]
              text-[11px] font-bold
              text-white
              shadow-[0_10px_25px_rgba(31,22,10,0.2)]
            "
          >
            {count}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

export default function GiftStudio() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [flyingProduct, setFlyingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [demoMode, setDemoMode] = useState(true);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(product: Product) {
    if (isAdding) return;

    setSelectedProduct(product);
    setFlyingProduct(product);
    setIsAdding(true);

    window.setTimeout(() => {
      setCart((currentCart) => {
        const existing = currentCart.find(
          (item) => item.id === product.id
        );

        if (existing) {
          return currentCart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        }

        return [
          ...currentCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      });

      setFlyingProduct(null);
    }, 750);

    window.setTimeout(() => {
      setIsAdding(false);
    }, 1050);
  }

  function changeQuantity(productId: number, amount: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + amount),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  useEffect(() => {
    if (!demoMode) return;

    const timer = window.setInterval(() => {
      const nextProduct =
        products[
          (products.findIndex(
            (product) => product.id === selectedProduct.id
          ) +
            1) %
            products.length
        ];

      setSelectedProduct(nextProduct);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [demoMode, selectedProduct]);

  const SelectedIcon = selectedProduct.icon;

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#f5f1e9]
        py-24 text-[#191611]
        lg:py-32
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -left-44 top-0
            h-[550px] w-[550px]
            rounded-full
            bg-[#ddc592]/22
            blur-[160px]
          "
        />

        <div
          className="
            absolute -right-44 bottom-0
            h-[590px] w-[590px]
            rounded-full
            bg-[#d8bf8b]/24
            blur-[170px]
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.022]
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
            y: 34,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-[850px] text-center"
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full border
              border-[#b58a3a]/20
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
                text-[#7e591e]
              "
            >
              Interactive Gift Store
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
            Discover it.
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
              Add it to the moment.
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
            Explore curated gifts, add your favourites to the trolley
            and watch your celebration come together.
          </p>
        </motion.div>

        {/* Store panel */}

        <motion.div
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
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          onMouseEnter={() => setDemoMode(false)}
          onMouseLeave={() => setDemoMode(true)}
          className="
            relative mt-16
            overflow-hidden
            rounded-[46px]
            border border-black/[0.055]
            bg-white/52 p-3
            shadow-[0_50px_145px_rgba(72,51,17,0.11)]
            backdrop-blur-2xl
            md:p-5
          "
        >
          <div
            className="
              relative overflow-hidden
              rounded-[38px]
              border border-white/85
              bg-gradient-to-br
              from-[#fffefa]
              via-[#f9f5ed]
              to-[#eee5d6]
              p-5 md:p-7 lg:p-9
            "
          >
            {/* Store top bar */}

            <div
              className="
                mb-7 flex flex-col
                gap-4 rounded-[26px]
                border border-black/[0.05]
                bg-white/65 px-5 py-4
                shadow-[0_15px_45px_rgba(69,46,13,0.07)]
                backdrop-blur-xl
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-[16px]
                    bg-[#211a14]
                    text-[#e0b960]
                    shadow-[0_12px_28px_rgba(31,23,13,0.18)]
                  "
                >
                  <ShoppingBag size={17} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#211a15]">
                    BGS Signature Store
                  </p>

                  <p className="mt-1 text-[8px] text-black/38">
                    Select a gift and add it to your celebration
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="
                    flex items-center gap-2
                    rounded-full border
                    border-[#b48735]/15
                    bg-[#c3943d]/10
                    px-3 py-2
                    text-[8px] font-semibold
                    text-[#815c20]
                  "
                >
                  <Sparkles size={11} />

                  Premium collection
                </span>

                <span
                  className="
                    flex items-center gap-2
                    rounded-full bg-[#211a14]
                    px-3 py-2
                    text-[8px] font-semibold
                    text-white
                  "
                >
                  <ShoppingCart size={11} />

                  {cartCount} items
                </span>
              </div>
            </div>

            <div
              className="
                grid gap-7
                xl:grid-cols-[1.35fr_0.7fr]
              "
            >
              {/* Product shelves */}

              <div className="relative">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#a1762a]">
                      Curated for you
                    </p>

                    <h3 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] text-[#211a15]">
                      Choose your perfect gift
                    </h3>
                  </div>

                  <p className="hidden text-[9px] text-black/38 md:block">
                    Click any product to explore
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={
                        selectedProduct.id === product.id
                      }
                      onSelect={() =>
                        setSelectedProduct(product)
                      }
                      onAdd={() => addToCart(product)}
                    />
                  ))}
                </div>

                {/* Flying product */}

                <AnimatePresence>
                  {flyingProduct && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        left: "35%",
                        top: "45%",
                        scale: 0.7,
                        rotate: -12,
                      }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        left: ["35%", "62%", "95%"],
                        top: ["45%", "15%", "57%"],
                        scale: [0.7, 1, 0.4],
                        rotate: [-12, 15, 360],
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        pointer-events-none
                        absolute z-[100]
                        flex h-16 w-16
                        items-center justify-center
                        rounded-[20px]
                        border border-white/70
                        text-[#211a14]
                        shadow-[0_20px_50px_rgba(64,41,10,0.18)]
                      "
                      style={{
                        background: flyingProduct.gradient,
                      }}
                    >
                      <flyingProduct.icon size={25} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart side */}

              <div
                className="
                  relative overflow-hidden
                  rounded-[32px]
                  border border-white/90
                  bg-white/68 p-5
                  shadow-[0_25px_75px_rgba(68,44,11,0.1)]
                  backdrop-blur-2xl
                "
              >
                <div
                  className="
                    absolute right-0 top-0
                    h-[220px] w-[220px]
                    rounded-full
                    bg-[#d9bf82]/20
                    blur-[65px]
                  "
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#a1762a]">
                        Your trolley
                      </p>

                      <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-[#211a15]">
                        Celebration cart
                      </h3>
                    </div>

                    <motion.div
                      animate={
                        isAdding
                          ? {
                              scale: [1, 1.25, 1],
                              rotate: [0, -8, 8, 0],
                            }
                          : {}
                      }
                      className="
                        flex h-11 w-11
                        items-center justify-center
                        rounded-[16px]
                        bg-[#211a14]
                        text-[#dfb961]
                      "
                    >
                      <ShoppingCart size={17} />
                    </motion.div>
                  </div>

                  <ShoppingTrolley
                    count={cartCount}
                    isAdding={isAdding}
                  />

                  <AnimatePresence mode="wait">
                    {cart.length === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="
                          rounded-[22px]
                          border border-dashed
                          border-black/[0.09]
                          bg-white/38 p-5
                          text-center
                        "
                      >
                        <ShoppingBag
                          size={20}
                          className="mx-auto text-[#a5792c]"
                        />

                        <p className="mt-3 text-[11px] font-semibold text-[#211a15]">
                          Your trolley is waiting
                        </p>

                        <p className="mt-1 text-[8px] text-black/38">
                          Add a gift from the collection
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="items"
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="space-y-3"
                      >
                        {cart.map((item) => {
                          const Icon = item.icon;

                          return (
                            <motion.div
                              layout
                              key={item.id}
                              className="
                                flex items-center gap-3
                                rounded-[20px]
                                border border-black/[0.045]
                                bg-white/65 p-3
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
                                  background: item.gradient,
                                }}
                              >
                                <Icon size={16} />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[9px] font-semibold text-[#211a15]">
                                  {item.name}
                                </p>

                                <p className="mt-1 text-[8px] text-black/38">
                                  ₹
                                  {item.price.toLocaleString(
                                    "en-IN"
                                  )}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    changeQuantity(item.id, -1)
                                  }
                                  className="
                                    flex h-7 w-7
                                    items-center justify-center
                                    rounded-full
                                    bg-black/[0.045]
                                    text-black/45
                                    transition
                                    hover:bg-black/[0.09]
                                  "
                                >
                                  <Minus size={11} />
                                </button>

                                <span className="min-w-4 text-center text-[9px] font-semibold">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    changeQuantity(item.id, 1)
                                  }
                                  className="
                                    flex h-7 w-7
                                    items-center justify-center
                                    rounded-full
                                    bg-[#211a14]
                                    text-white
                                  "
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className="
                      mt-5 rounded-[24px]
                      border border-black/[0.05]
                      bg-[#f7f0e5]/70 p-4
                    "
                  >
                    <div className="flex items-center justify-between text-[9px] text-black/45">
                      <span>Subtotal</span>

                      <span>
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#211a15]">
                        Total
                      </span>

                      <span className="text-[17px] font-semibold text-[#211a15]">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <MagneticButton
                    className="
                      group mt-4 flex w-full
                      items-center justify-between
                      rounded-full bg-[#211a14]
                      px-5 py-3.5
                      text-[10px] font-semibold
                      text-white
                      shadow-[0_16px_38px_rgba(30,22,12,0.17)]
                    "
                  >
                    Continue to checkout

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

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      {
                        icon: PackageCheck,
                        label: "Premium pack",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Secure",
                      },
                      {
                        icon: Truck,
                        label: "Fast delivery",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="
                            flex flex-col items-center
                            rounded-[17px]
                            border border-black/[0.045]
                            bg-white/52 p-3 text-center
                          "
                        >
                          <Icon
                            size={14}
                            className="text-[#a1762a]"
                          />

                          <span className="mt-2 text-[7px] text-black/40">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected product strip */}

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct.id}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  mt-7 flex flex-col
                  gap-5 rounded-[28px]
                  border border-black/[0.05]
                  bg-white/60 p-5
                  shadow-[0_18px_55px_rgba(68,44,11,0.07)]
                  backdrop-blur-xl
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex h-12 w-12
                      shrink-0 items-center
                      justify-center
                      rounded-[17px]
                      text-white
                    "
                    style={{
                      backgroundColor: selectedProduct.accent,
                    }}
                  >
                    <SelectedIcon size={19} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-semibold text-[#211a15]">
                        {selectedProduct.name}
                      </p>

                      <span
                        className="
                          rounded-full
                          bg-[#b88935]/10
                          px-2 py-1
                          text-[7px] font-semibold
                          text-[#8b6325]
                        "
                      >
                        Selected
                      </span>
                    </div>

                    <p className="mt-1 text-[9px] text-black/40">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(selectedProduct)}
                  className="
                    group flex shrink-0
                    items-center justify-center
                    gap-3 rounded-full
                    border border-black/[0.06]
                    bg-white px-5 py-3
                    text-[9px] font-semibold
                    text-[#211a15]
                    shadow-[0_12px_30px_rgba(60,39,10,0.08)]
                  "
                >
                  Add selected gift

                  <ChevronRight
                    size={13}
                    className="
                      transition duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom trust row */}

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
            duration: 0.7,
            delay: 0.15,
          }}
          viewport={{ once: true }}
          className="
            mt-8 flex flex-wrap
            items-center justify-center
            gap-x-10 gap-y-4
            text-[10px] font-medium
            text-black/42
          "
        >
          <span className="flex items-center gap-2">
            <Check size={14} className="text-[#a77a2b]" />
            Curated premium products
          </span>

          <span className="flex items-center gap-2">
            <ShieldCheck
              size={14}
              className="text-[#a77a2b]"
            />
            Secure checkout
          </span>

          <span className="flex items-center gap-2">
            <Truck size={14} className="text-[#a77a2b]" />
            Reliable delivery
          </span>

          <span className="flex items-center gap-2">
            <Sparkles
              size={14}
              className="text-[#a77a2b]"
            />
            Luxury presentation
          </span>
        </motion.div>
      </div>
    </section>
  );
}
