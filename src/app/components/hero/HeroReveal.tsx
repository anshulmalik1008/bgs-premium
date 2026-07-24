"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import useGsap from "@/app/hooks/useGsap";

export default function HeroReveal() {
  const section = useRef<HTMLDivElement>(null);

  useGsap(section, () => {

    const ctx = section.current;

    if (!ctx) return;

    const title = ctx.querySelectorAll<HTMLElement>(".hero-word");
    const desc = ctx.querySelector<HTMLElement>(".hero-desc");
    const buttons = ctx.querySelector<HTMLElement>(".hero-buttons");
    const image = ctx.querySelector<HTMLElement>(".hero-image");


    gsap.from(title, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power4.out",
    });


    if (desc) {
      gsap.from(desc, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }


    if (buttons) {
      gsap.from(buttons, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "back.out(1.7)",
      });
    }


    if (image) {

      gsap.from(image, {
        scale: 0.8,
        opacity: 0,
        rotateY: 20,
        duration: 1.4,
        delay: 0.3,
        ease: "power4.out",
      });


      gsap.to(image, {

        y: -120,

        scrollTrigger:{
          trigger: ctx,
          start:"top top",
          end:"bottom top",
          scrub:true,
        }

      });

    }

  });


  return null;
}
