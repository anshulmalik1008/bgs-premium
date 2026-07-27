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
  BadgeCheck,
  Heart,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";

type Review = {
  id: number;
  name: string;
  location: string;
  initials: string;
  occasion: string;
  review: string;
  rating: number;
  order: string;
  accent: string;
  soft: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Aarav Mehta",
    location: "New Delhi",
    initials: "AM",
    occasion: "Anniversary Surprise",
    review:
      "The packaging felt extremely premium and the personal note made the whole gift feel truly special. It looked even better than the pictures.",
    rating: 5,
    order: "Luxury Celebration Hamper",
    accent: "#b58a42",
    soft: "#efe2ca",
  },
  {
    id: 2,
    name: "Riya Sharma",
    location: "Gurugram",
    initials: "RS",
    occasion: "Birthday Gift",
    review:
      "Everything arrived on time and beautifully packed. The quality, presentation and little details made it feel like a luxury experience.",
    rating: 5,
    order: "Blush Flower Story",
    accent: "#b97b70",
    soft: "#f1ddd8",
  },
  {
    id: 3,
    name: "Kabir Malhotra",
    location: "Noida",
    initials: "KM",
    occasion: "Corporate Gifting",
    review:
      "Our clients loved the hampers. The branding was subtle, elegant and handled professionally from start to finish.",
    rating: 5,
    order: "Executive Signature Box",
    accent: "#75644f",
    soft: "#e8e0d6",
  },
  {
    id: 4,
    name: "Meera Kapoor",
    location: "Mumbai",
    initials: "MK",
    occasion: "Wedding Celebration",
    review:
      "The gift looked refined and thoughtful. Every element felt curated rather than simply added together.",
    rating: 5,
    order: "Wedding Keepsake Edit",
    accent: "#9e7652",
    soft: "#ede0d2",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "98%", label: "Would Gift Again" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.35,
            delay: index * 0.08,
          }}
        >
          <Star
            size={15}
            fill={index < rating ? "currentColor" : "none"}
            className={
              index < rating ? "text-[#c99a44]" : "text-black/15"
            }
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function CustomerLove() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 20,
  });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["22%", "78%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["18%", "82%"]);

  const activeReview = useMemo(
    () => reviews[activeIndex],
    [activeIndex]
  );

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  function nextReview() {
    setActiveIndex((current) => (current + 1) % reviews.length);
  }

  function previousReview() {
    setActiveIndex(
      (current) => (current - 1 + reviews.length) % reviews.length
    );
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
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
    <section className="relative overflow-hidden bg-[#f3efe7] py-24 text-[#1f1914] lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-10 h-[560px] w-[560px] rounded-full bg-[#d9c49a]/25 blur-[170px]" />
        <div className="absolute -right-48 bottom-0 h-[600px] w-[600px] rounded-full bg-[#d9b985]/20 blur-[185px]" />

        <div className="absolute inset-0 opacity-[0.022] [background-image:linear-gradient(to_right,#2c2116_1px,transparent_1px),linear-gradient(to_bottom,#2c2116_1px,transparent_1px)] [background-size:68px_68px]" />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[900px] text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b58942]/20 bg-white/70 px-4 py-2 shadow-[0_10px_35px_rgba(63,40,10,0.05)] backdrop-blur-xl">
            <Heart
              size={13}
              className="text-[#a8782b]"
              fill="currentColor"
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#805a23]">
              Customer Love
            </span>
          </div>

          <h2 className="mt-7 text-[44px] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[60px] lg:text-[82px]">
            Loved in every
            <span className="block bg-gradient-to-r from-[#79531d] via-[#bd9146] to-[#79531d] bg-clip-text text-transparent">
              meaningful moment.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[680px] text-[14px] leading-7 text-black/48 md:text-[15px]">
            Real stories from customers who trusted BGS to turn their
            celebrations into unforgettable experiences.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
              }}
              className="rounded-[28px] border border-black/[0.05] bg-white/55 px-6 py-6 text-center shadow-[0_18px_55px_rgba(64,42,11,0.06)] backdrop-blur-xl"
            >
              <p className="text-[30px] font-semibold tracking-[-0.05em] text-[#251d16] md:text-[36px]">
                {stat.value}
              </p>
              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/38">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            resetMouse();
          }}
          className="relative mt-8 overflow-hidden rounded-[38px] border border-black/[0.055] bg-white/48 p-3 shadow-[0_50px_140px_rgba(63,39,8,0.11)] backdrop-blur-2xl sm:p-5 lg:rounded-[52px] lg:p-7"
        >
          <motion.div
            style={{
              left: glowX,
              top: glowY,
            }}
            className="pointer-events-none absolute z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ddc08a]/28 blur-[140px]"
          />

          <div className="relative z-10 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative min-h-[420px] overflow-hidden rounded-[30px] border border-white/80 bg-gradient-to-br from-[#fffdf9] via-[#f4eee4] to-[#e8dbc7] p-6 [perspective:1800px] lg:min-h-[560px] lg:rounded-[42px] lg:p-8"
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/70 bg-white/65 text-[#a47a31] shadow-[0_15px_35px_rgba(57,35,8,0.08)] backdrop-blur-xl"
              >
                <Quote size={23} strokeWidth={1.4} />
              </motion.div>

              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-white/70 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-black/42 backdrop-blur-xl">
                <BadgeCheck
                  size={12}
                  className="text-[#9a702b]"
                />
                Verified Customer
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex h-full flex-col justify-end pt-24"
                >
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-[30px] border border-white/70 text-[25px] font-semibold shadow-[0_24px_60px_rgba(58,36,8,0.12)]"
                    style={{
                      background: `linear-gradient(145deg, #fff, ${activeReview.soft})`,
                      color: activeReview.accent,
                    }}
                  >
                    {activeReview.initials}
                  </div>

                  <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c672d]">
                    {activeReview.occasion}
                  </p>

                  <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.04em] text-[#211a14] lg:text-[36px]">
                    {activeReview.name}
                  </h3>

                  <p className="mt-1 text-[11px] text-black/40">
                    {activeReview.location}
                  </p>

                  <div className="mt-6">
                    <StarRating rating={activeReview.rating} />
                  </div>

                  <div className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-black/[0.05] bg-white/62 px-3 py-2 text-[9px] font-medium text-black/44">
                    <Sparkles
                      size={11}
                      className="text-[#b08336]"
                    />
                    {activeReview.order}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="flex min-h-[420px] flex-col justify-between rounded-[30px] border border-black/[0.05] bg-white/64 p-6 shadow-[0_20px_60px_rgba(64,41,10,0.05)] backdrop-blur-xl lg:min-h-[560px] lg:rounded-[42px] lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview.id}
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
                >
                  <Quote
                    size={42}
                    strokeWidth={1}
                    className="text-[#b88b3e]/45"
                  />

                  <p className="mt-8 max-w-[760px] text-[25px] font-medium leading-[1.35] tracking-[-0.04em] text-[#211a14] sm:text-[32px] lg:text-[42px]">
                    “{activeReview.review}”
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex flex-col gap-6 border-t border-black/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  {reviews.map((review, index) => (
                    <button
                      key={review.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show review ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        activeIndex === index
                          ? "w-10 bg-[#a97d31]"
                          : "w-2.5 bg-black/12 hover:bg-black/25"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={previousReview}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.07] bg-white text-[#241c15] shadow-[0_12px_30px_rgba(55,34,7,0.06)]"
                    aria-label="Previous review"
                  >
                    <ArrowLeft size={17} />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={nextReview}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#211a14] text-white shadow-[0_16px_35px_rgba(33,26,20,0.18)]"
                    aria-label="Next review"
                  >
                    <ArrowRight size={17} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
