"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { categoryData } from "./categoryData";

gsap.registerPlugin(ScrollTrigger);

export default function PremiumCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const scenesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scenesWrapper = scenesRef.current;
    const progress = progressRef.current;

    if (!section || !scenesWrapper || !progress) return;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      const scenes = gsap.utils.toArray<HTMLElement>(
        scenesWrapper.querySelectorAll(".story-scene")
      );

      const progressItems = gsap.utils.toArray<HTMLElement>(
        progress.querySelectorAll(".story-progress-item")
      );

      if (!scenes.length) return;

      const context = gsap.context(() => {
        gsap.set(scenes, {
          autoAlpha: 0,
          pointerEvents: "none",
        });

        gsap.set(scenes[0], {
          autoAlpha: 1,
          pointerEvents: "auto",
        });

        gsap.set(progressItems, {
          color: "rgba(255,255,255,0.25)",
          scale: 1,
        });

        gsap.set(progressItems[0], {
          color: "#D4AF37",
          scale: 1.12,
        });

        scenes.forEach((scene, index) => {
          const eyebrow = scene.querySelector(".story-eyebrow");
          const title = scene.querySelector(".story-title");
          const description = scene.querySelector(".story-description");
          const button = scene.querySelector(".story-button");
          const image = scene.querySelector(".story-image");
          const imageFrame = scene.querySelector(".story-image-frame");
          const badge = scene.querySelector(".story-badge");
          const glow = scene.querySelector(".story-glow");

          if (index === 0) {
            gsap.set([eyebrow, title, description, button, imageFrame, badge], {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
            });

            gsap.set(image, {
              scale: 1,
              rotate: 0,
            });

            gsap.set(glow, {
              autoAlpha: 1,
              scale: 1,
            });
          } else {
            gsap.set([eyebrow, title, description, button], {
              autoAlpha: 0,
              y: 50,
            });

            gsap.set(imageFrame, {
              autoAlpha: 0,
              x: 140,
              scale: 0.9,
            });

            gsap.set(image, {
              scale: 1.12,
              rotate: index % 2 === 0 ? -3 : 3,
            });

            gsap.set(badge, {
              autoAlpha: 0,
              y: 30,
            });

            gsap.set(glow, {
              autoAlpha: 0,
              scale: 0.7,
            });
          }
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${window.innerHeight * Math.max(categoryData.length, 2)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          scenes[0].querySelector(".story-eyebrow"),
          { autoAlpha: 0, x: -35 },
          { autoAlpha: 1, x: 0, duration: 0.4 }
        );

        timeline.fromTo(
          scenes[0].querySelector(".story-title"),
          { autoAlpha: 0, y: 65 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "<0.08"
        );

        timeline.fromTo(
          scenes[0].querySelector(".story-description"),
          { autoAlpha: 0, y: 35 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "<0.16"
        );

        timeline.fromTo(
          scenes[0].querySelector(".story-button"),
          { autoAlpha: 0, y: 25 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          "<0.12"
        );

        timeline.fromTo(
          scenes[0].querySelector(".story-image-frame"),
          { autoAlpha: 0, x: 120, scale: 0.9 },
          { autoAlpha: 1, x: 0, scale: 1, duration: 0.85 },
          "<-0.45"
        );

        timeline.to({}, { duration: 0.8 });

        scenes.forEach((scene, index) => {
          if (index === 0) return;

          const previousScene = scenes[index - 1];

          const previousText = previousScene.querySelector(".story-text");
          const previousImage =
            previousScene.querySelector(".story-image-frame");
          const previousGlow = previousScene.querySelector(".story-glow");

          const eyebrow = scene.querySelector(".story-eyebrow");
          const title = scene.querySelector(".story-title");
          const description = scene.querySelector(".story-description");
          const button = scene.querySelector(".story-button");
          const imageFrame = scene.querySelector(".story-image-frame");
          const image = scene.querySelector(".story-image");
          const badge = scene.querySelector(".story-badge");
          const glow = scene.querySelector(".story-glow");

          timeline
            .to(previousText, {
              autoAlpha: 0,
              x: -90,
              duration: 0.55,
            })
            .to(
              previousImage,
              {
                autoAlpha: 0,
                x: 100,
                scale: 0.92,
                duration: 0.65,
              },
              "<"
            )
            .to(
              previousGlow,
              {
                autoAlpha: 0,
                scale: 1.25,
                duration: 0.55,
              },
              "<"
            )
            .set(previousScene, {
              autoAlpha: 0,
              pointerEvents: "none",
            })
            .set(scene, {
              autoAlpha: 1,
              pointerEvents: "auto",
            })
            .to(
              progressItems[index - 1],
              {
                color: "rgba(255,255,255,0.25)",
                scale: 1,
                duration: 0.2,
              },
              "<"
            )
            .to(
              progressItems[index],
              {
                color: "#D4AF37",
                scale: 1.12,
                duration: 0.25,
              },
              "<"
            )
            .fromTo(
              glow,
              {
                autoAlpha: 0,
                scale: 0.65,
              },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.7,
              }
            )
            .fromTo(
              eyebrow,
              {
                autoAlpha: 0,
                x: -40,
              },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.4,
              },
              "<0.08"
            )
            .fromTo(
              title,
              {
                autoAlpha: 0,
                y: 70,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
              },
              "<0.08"
            )
            .fromTo(
              description,
              {
                autoAlpha: 0,
                y: 35,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
              },
              "<0.15"
            )
            .fromTo(
              button,
              {
                autoAlpha: 0,
                y: 25,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
              },
              "<0.1"
            )
            .fromTo(
              imageFrame,
              {
                autoAlpha: 0,
                x: 140,
                scale: 0.88,
              },
              {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                duration: 0.85,
              },
              "<-0.45"
            )
            .fromTo(
              image,
              {
                scale: 1.12,
                rotate: index % 2 === 0 ? -3 : 3,
              },
              {
                scale: 1,
                rotate: 0,
                duration: 1,
              },
              "<"
            )
            .fromTo(
              badge,
              {
                autoAlpha: 0,
                y: 25,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
              },
              "<0.2"
            )
            .to({}, { duration: 0.85 });
        });

        ScrollTrigger.refresh();
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      {/* Desktop scroll story */}
      <div className="relative hidden h-screen overflow-hidden lg:block">
        {/* Fixed background */}
        <div className="absolute inset-0 bg-[#050505]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(212,175,55,0.09),transparent_42%)]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle,#ffffff 1px,transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Progress */}
        <div
          ref={progressRef}
          className="absolute left-8 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-5 xl:left-12"
        >
          {categoryData.map((item) => (
            <div
              key={item.id}
              className="story-progress-item text-[10px] font-semibold tracking-[0.2em]"
            >
              {item.number}
            </div>
          ))}

          <div className="absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-white/5" />
        </div>

        {/* Scenes */}
        <div ref={scenesRef} className="relative h-full w-full">
          {categoryData.map((item, index) => (
            <article
              key={item.id}
              className="story-scene absolute inset-0"
            >
              <div
                className="story-glow pointer-events-none absolute right-[10%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-[160px]"
                style={{
                  backgroundColor: item.accent,
                  opacity: 0.14,
                }}
              />

              <div className="relative mx-auto grid scale-[0.88] h-full max-w-[1200px] grid-cols-[0.72fr_1.30fr] items-center gap-8 px-20 xl:gap-12 xl:px-28">
                {/* Story text */}
                <div className="story-text max-w-xl">
                  <div className="story-eyebrow flex items-center gap-4">
                    <span
                      className="h-px w-12"
                      style={{ backgroundColor: item.accent }}
                    />

                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.32em]"
                      style={{ color: item.accent }}
                    >
                      {item.eyebrow}
                    </p>
                  </div>

                  <h2 className="story-title mt-7 text-4xl font-medium leading-[0.92] tracking-[-0.055em] xl:text-5xl">
                    {item.title}
                  </h2>

                  <p className="story-description mt-7 max-w-lg text-[12px] leading-6 text-white/55 lg:text-base">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    className="story-button group mt-9 inline-flex items-center gap-5 rounded-full border border-white/10 bg-white/[0.06] py-2 pl-5 pr-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl transition hover:bg-white/[0.1]"
                  >
                    Explore Collection

                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full text-black transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
                      style={{ backgroundColor: item.accent }}
                    >
                      <ArrowUpRight size={17} />
                    </span>
                  </button>
                </div>

                {/* Product visual */}
                <div className="relative flex h-[650px] items-center justify-center">
                  <div className="story-image-frame relative h-[400px] w-full max-w-[440px] overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] shadow-[0_45px_120px_rgba(0,0,0,0.5)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={index === 0}
                      sizes="50vw"
                      className="story-image object-cover scale-80"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />

                    <div className="story-badge absolute right-7 top-7 rounded-2xl border border-white/15 bg-black/25 px-3 py-2 backdrop-blur-xl">
                      <div className="flex items-center gap-2">
                        <Sparkles
                          size={13}
                          style={{ color: item.accent }}
                        />

                        <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/55">
                          BGS Exclusive
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-white">
                        Premium Selection
                      </p>
                    </div>

                    <div className="absolute bottom-7 left-7">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">
                        Collection
                      </p>

                      <p className="mt-2 text-xl font-medium text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4">
                <span
                  className="h-[3px] w-16 rounded-full"
                  style={{ backgroundColor: item.accent }}
                />

                <span className="text-[9px] font-semibold tracking-[0.24em] text-white/35">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(categoryData.length).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="absolute bottom-8 right-10 z-50 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/30">
          Scroll to continue
        </div>
      </div>

      {/* Mobile layout */}
      <div className="relative px-5 py-20 sm:px-8 lg:hidden">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
              Category Stories
            </p>

            <h2 className="mt-5 text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl">
              Gifts designed to be remembered.
            </h2>
          </div>

          <div className="space-y-16">
            {categoryData.map((item, index) => (
              <article key={item.id}>
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="text-sm font-semibold tracking-[0.2em]"
                    style={{ color: item.accent }}
                  >
                    {item.number}
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/30">
                    {item.eyebrow}
                  </span>
                </div>

                <div className="relative h-[430px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] sm:h-[540px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <h3 className="text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/60">
                      {item.description}
                    </p>

                    <button className="mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                      Explore
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
