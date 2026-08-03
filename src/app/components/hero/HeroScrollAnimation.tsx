"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollAnimation() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-content", {
        opacity: 1,
        y: 0,
      });

      
      gsap.set(".hero-bg", {
        scale: 1,
        opacity: 1,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=1100",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Background ka halka cinematic movement
      timeline.to(
        ".hero-bg",
        {
          scale: 1.035,
          opacity: 0.92,
          ease: "none",
        },
        0
      );

      // Left hero text upar fade hoga
      timeline.to(
        ".hero-content",
        {
          y: -110,
          opacity: 0,
          ease: "none",
        },
        0
      );

      // Phone ka size same rahega
      // Sirf halka upar move hoga
     
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
