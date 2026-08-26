"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BatteryFull,
  Check,
  Search,
  ShoppingBag,
  Signal,
  Sparkles,
  Wifi,
} from "lucide-react";

type PremiumProduct = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  price: number;
  oldPrice?: number;
  category: string;
};

type CartItem = PremiumProduct & {
  name: string;
  quantity: number;
};

const CART_STORAGE_KEY = "bgs_cart_items";

const premiumProducts: PremiumProduct[] = [
  {
    id: 2,
    title: "Luxury Flowers",
    subtitle: "Elegant floral arrangements",
    image: "/images/premium/flowers.jpg",
    badge: "Popular",
    price: 2199,
    oldPrice: 2499,
    category: "Flowers",
  },
  {
    id: 1,
    title: "Premium Hampers",
    subtitle: "Curated luxury experiences",
    image: "/images/premium/hampers.jpg",
    badge: "Exclusive",
    price: 3499,
    oldPrice: 3999,
    category: "Luxury Hampers",
  },
  {
    id: 9,
    title: "Fine Chocolates",
    subtitle: "Handcrafted indulgence",
    image: "/images/premium/chocolates.jpg",
    price: 2799,
    oldPrice: 3099,
    category: "Chocolates",
  },
  {
    id: 13,
    title: "Luxury Watches",
    subtitle: "Timeless elegance",
    image: "/images/premium/watches.jpg",
    price: 6999,
    oldPrice: 7999,
    category: "Luxury Watches",
  },
  {
    id: 3,
    title: "Personalised Gifts",
    subtitle: "Made especially for them",
    image: "/images/premium/personalised.jpg",
    badge: "Custom",
    price: 2899,
    oldPrice: 3299,
    category: "Personalised",
  },
  {
    id: 5,
    title: "Corporate Gifts",
    subtitle: "Premium business impressions",
    image: "/images/premium/corporate.jpg",
    price: 4299,
    category: "Corporate",
  },
  {
    id: 4,
    title: "Designer Cakes",
    subtitle: "Beautiful celebrations",
    image: "/images/premium/cakes.jpg",
    price: 1899,
    category: "Cakes",
  },
  {
    id: 14,
    title: "Luxury Fragrances",
    subtitle: "Signature premium scents",
    image: "/images/premium/fragrances.jpg",
    price: 3999,
    oldPrice: 4499,
    category: "Fragrances",
  },
];

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(CART_STORAGE_KEY);
    return value ? (JSON.parse(value) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export default function MacbookPremium() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 22,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 22,
  });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  useEffect(() => {
    setCartItems(readCart());
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const interval = window.setInterval(() => {
      if (paused) return;

      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const nextScroll = slider.scrollLeft + 320;

      slider.scrollTo({
        left: nextScroll >= maxScroll - 10 ? 0 : nextScroll,
        behavior: "smooth",
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, [paused]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5,
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5,
    );
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setPaused(false);
  }

  function addToCart(product: PremiumProduct) {
    try {
      const currentCart = readCart();

      const existing = currentCart.find(
        (item) => item.id === product.id,
      );

      const nextCart: CartItem[] = existing
        ? currentCart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    (item.quantity || 1) + 1,
                    10,
                  ),
                }
              : item,
          )
        : [
            ...currentCart,
            {
              ...product,
              name: product.title,
              quantity: 1,
            },
          ];

      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(nextCart),
      );

      setCartItems(nextCart);

      // Notify other UI components that the cart has changed.
      window.dispatchEvent(
        new CustomEvent("bgs-cart-updated", {
          detail: {
            cart: nextCart,
          },
        }),
      );

      setAddedProductId(product.id);

      window.setTimeout(() => {
        setAddedProductId(null);
      }, 1400);
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error,
      );
    }
  }

  function buyNow(product: PremiumProduct) {
  try {
    const buyNowItem: CartItem = {
      ...product,
      name: product.title,
      quantity: 1,
    };

    const currentCart = readCart();

    const existing = currentCart.find(
      (item) => item.id === product.id,
    );

    const nextCart: CartItem[] = existing
      ? currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: 1,
              }
            : item,
        )
      : [...currentCart, buyNowItem];

    // Save the product in the normal cart.
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(nextCart),
    );

    // Save the complete Buy Now product separately.
    window.localStorage.setItem(
      "bgs_buy_now",
      JSON.stringify(buyNowItem),
    );

    setCartItems(nextCart);

    window.dispatchEvent(
      new CustomEvent("bgs-cart-updated", {
        detail: {
          cart: nextCart,
        },
      }),
    );

    window.location.href = `/checkout?product=${product.id}&mode=buy-now`;
  } catch (error) {
    console.error(
      "Buy now failed:",
      error,
    );
  }
}

  return (
    <section className="relative overflow-hidden bg-[#f6f4ef] py-20 sm:py-28 lg:py-32">
      <div className="absolute left-[-180px] top-24 h-[500px] w-[500px] rounded-full bg-[#e6d3ad]/40 blur-[170px]" />

      <div className="absolute bottom-[-220px] right-[-120px] h-[600px] w-[600px] rounded-full bg-[#cdb48b]/25 blur-[190px]" />

      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#111_0.7px,transparent_0.7px)] [background-size:14px_14px]" />

      <div className="relative mx-auto max-w-[1550px] px-5 sm:px-8 lg:px-10">
        <div className="mb-14 grid items-end gap-10 lg:mb-20 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl">
              <Sparkles size={14} />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                Premium Collection
              </span>
            </div>

            <h2 className="mt-7 max-w-[700px] text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] text-neutral-950 sm:text-[62px] lg:text-[78px]">
              Luxury shopping,
              <span className="block text-neutral-400">
                inside MacBook.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[570px] lg:justify-self-end"
          >
            <p className="text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Explore premium gifts, add products directly to your cart or
              continue to checkout from the MacBook collection.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Explore collection

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-950 transition group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </Link>

              <Link
                href="/cart"
                className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-5 py-3.5 text-sm font-medium text-neutral-800"
              >
                <ShoppingBag size={16} />
                Cart
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-neutral-950 px-1.5 text-[10px] text-white">
                  {cartCount}
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setPaused(true)}
          className="relative flex justify-center [perspective:1800px]"
        >
          <div className="absolute top-1/2 h-[420px] w-[900px] -translate-y-1/2 rounded-full bg-[#d8bc89]/25 blur-[160px]" />

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
              rotateX: 12,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-[1180px]"
          >
            <div className="relative mx-auto w-[92%] rounded-t-[28px] border border-white/20 bg-gradient-to-br from-[#252525] via-[#060606] to-[#222222] p-[9px] shadow-[0_45px_120px_rgba(20,16,12,0.3)] sm:rounded-t-[34px] sm:p-[11px]">
              <div className="absolute left-1/2 top-[4px] z-30 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#1d3047] shadow-[0_0_5px_rgba(100,150,210,0.8)] sm:top-[5px]" />

              <div className="relative aspect-[16/9] overflow-hidden rounded-t-[20px] bg-[#f5f2ec] sm:rounded-t-[25px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.96),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(220,193,147,0.25),transparent_48%)]" />

                <header className="relative z-10 flex h-9 items-center justify-between border-b border-black/5 bg-white/65 px-4 backdrop-blur-xl sm:h-11 sm:px-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 sm:h-3 sm:w-3" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 sm:h-3 sm:w-3" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 sm:h-3 sm:w-3" />
                  </div>

                  <div className="hidden items-center gap-5 sm:flex">
                    <Link
                      href="/"
                      className="text-[10px] font-medium text-neutral-500"
                    >
                      BGS Luxury
                    </Link>

                    <Link
                      href="/shop"
                      className="text-[10px] text-neutral-500"
                    >
                      Premium
                    </Link>

                    <Link
                      href="/shop"
                      className="text-[10px] text-neutral-500"
                    >
                      Collections
                    </Link>

                    <Link
                      href="/shop?category=Corporate"
                      className="text-[10px] text-neutral-500"
                    >
                      Corporate
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-700">
                    <Signal size={12} />
                    <Wifi size={12} />
                    <BatteryFull size={15} />
                  </div>
                </header>

                <div className="relative z-10 px-4 pb-5 pt-4 sm:px-8 sm:pb-8 sm:pt-6 lg:px-10">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-neutral-400 sm:text-[10px]">
                        Discover excellence
                      </p>

                      <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-3xl lg:text-4xl">
                        Premium Collection
                      </h3>

                      <p className="mt-1 hidden text-xs text-neutral-500 sm:block">
                        Choose a product, add it to cart or buy it now.
                      </p>
                    </div>

                    <Link
                      href="/search"
                      aria-label="Search products"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/75 shadow-sm backdrop-blur-md sm:h-11 sm:w-11"
                    >
                      <Search size={16} />
                    </Link>
                  </div>

                  <div className="mt-4 flex items-center gap-2 sm:mt-6">
                    <span className="rounded-full bg-neutral-950 px-3 py-1.5 text-[8px] font-medium text-white sm:text-[10px]">
                      Featured
                    </span>

                    <span className="rounded-full border border-black/5 bg-white/60 px-3 py-1.5 text-[8px] text-neutral-600 backdrop-blur-md sm:text-[10px]">
                      New arrivals
                    </span>

                    <span className="hidden rounded-full border border-black/5 bg-white/60 px-3 py-1.5 text-[10px] text-neutral-600 backdrop-blur-md sm:block">
                      Best sellers
                    </span>
                  </div>

                  <div
                    ref={sliderRef}
                    className="mt-4 flex gap-3 overflow-x-auto pb-2 sm:mt-6 sm:gap-5 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {premiumProducts.map((product, index) => {
                      const added = addedProductId === product.id;

                      return (
                        <motion.article
                          key={product.id}
                          initial={{
                            opacity: 0,
                            y: 25,
                            scale: 0.96,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.55,
                            delay: index * 0.06,
                          }}
                          whileHover={{ y: -6 }}
                          className="group min-w-[160px] overflow-hidden rounded-[18px] border border-white/70 bg-white/85 p-2 shadow-[0_14px_35px_rgba(31,24,18,0.08)] backdrop-blur-xl sm:min-w-[230px] sm:rounded-[24px] sm:p-2.5 lg:min-w-[250px]"
                        >
                          <Link
                            href={`/product/${product.id}`}
                            className="relative block h-[105px] overflow-hidden rounded-[14px] bg-neutral-200 sm:h-[150px] sm:rounded-[19px]"
                          >
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              sizes="250px"
                              className="object-cover transition duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                            {product.badge && (
                              <span className="absolute left-2 top-2 rounded-full bg-black/40 px-2 py-1 text-[7px] uppercase tracking-[0.15em] text-white backdrop-blur-md sm:left-3 sm:top-3 sm:text-[9px]">
                                {product.badge}
                              </span>
                            )}
                          </Link>

                          <div className="px-1 pb-1 pt-3 sm:px-2 sm:pb-2 sm:pt-4">
                            <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#99732a] sm:text-[8px]">
                              {product.category}
                            </p>

                            <Link href={`/product/${product.id}`}>
                              <h4 className="mt-1 text-[11px] font-semibold text-neutral-950 sm:text-[15px]">
                                {product.title}
                              </h4>
                            </Link>

                            <p className="mt-1 hidden text-[10px] leading-4 text-neutral-500 sm:block">
                              {product.subtitle}
                            </p>

                            <div className="mt-3 flex items-end justify-between gap-2">
                              <div>
                                <strong className="block text-[12px] text-neutral-950 sm:text-[14px]">
                                  ₹{product.price.toLocaleString("en-IN")}
                                </strong>

                                {product.oldPrice && (
                                  <del className="block text-[8px] text-neutral-400 sm:text-[9px]">
                                    ₹{product.oldPrice.toLocaleString("en-IN")}
                                  </del>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => addToCart(product)}
                                className={`grid h-8 w-8 place-items-center rounded-full transition sm:h-9 sm:w-9 ${
                                  added
                                    ? "bg-[#647c50] text-white"
                                    : "bg-neutral-950 text-white hover:bg-[#b28a3c]"
                                }`}
                                aria-label={`Add ${product.title} to cart`}
                              >
                                {added ? (
                                  <Check size={14} />
                                ) : (
                                  <ShoppingBag size={14} />
                                )}
                              </button>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <Link
                                href={`/product/${product.id}`}
                                className="flex min-h-8 items-center justify-center rounded-full border border-black/8 bg-white text-[8px] font-semibold text-neutral-700 sm:min-h-9 sm:text-[9px]"
                              >
                                Details
                              </Link>

                              <button
                                type="button"
                                onClick={() => buyNow(product)}
                                className="flex min-h-8 items-center justify-center rounded-full bg-[#d0aa5c] text-[8px] font-semibold text-[#17130d] transition hover:bg-[#dfbd78] sm:min-h-9 sm:text-[9px]"
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto h-3 w-[92%] bg-gradient-to-b from-[#d8d8d8] to-[#9e9e9e] sm:h-4">
              <div className="absolute left-1/2 top-0 h-1.5 w-28 -translate-x-1/2 rounded-b-xl bg-[#777] sm:w-36" />
            </div>

            <div className="relative mx-auto h-7 w-full rounded-b-[70%] bg-gradient-to-b from-[#d9d9d9] via-[#b8b8b8] to-[#888] shadow-[0_25px_45px_rgba(0,0,0,0.22)] sm:h-10">
              <div className="absolute left-1/2 top-0 h-1.5 w-36 -translate-x-1/2 rounded-b-xl bg-[#8b8b8b] sm:w-48" />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[98%] h-[120px] w-[82%] -translate-x-1/2 scale-y-[-1] rounded-[50%] bg-gradient-to-b from-black/15 to-transparent opacity-15 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
