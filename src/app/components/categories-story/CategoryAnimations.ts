// components/categories-story/CategoryAnimations.ts

import gsap from "gsap";

export function animateSceneEnter(scene: HTMLElement) {
  const eyebrow = scene.querySelector(".category-eyebrow");
  const title = scene.querySelector(".category-title");
  const description = scene.querySelector(".category-description");
  const button = scene.querySelector(".category-button");
  const image = scene.querySelector(".category-image");
  const glow = scene.querySelector(".category-glow");
  const ring = scene.querySelector(".category-ring");
  const ring2 = scene.querySelector(".category-ring-secondary");
  const tag = scene.querySelector(".category-tag");
  const card = scene.querySelector(".category-detail-card");

  const tl = gsap.timeline();

  tl.fromTo(
    glow,
    {
      scale: 0.6,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
    }
  )

    .fromTo(
      eyebrow,
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
      },
      "-=0.45"
    )

    .fromTo(
      title,
      {
        y: 90,
        opacity: 0,
        rotateX: -15,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
      },
      "-=0.35"
    )

    .fromTo(
      description,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
      },
      "-=0.45"
    )

    .fromTo(
      button,
      {
        y: 25,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
      },
      "-=0.3"
    )

    .fromTo(
      image,
      {
        x: 140,
        scale: 0.8,
        rotate: 8,
        opacity: 0,
      },
      {
        x: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.9,
      },
      "-=0.75"
    )

    .fromTo(
      ring,
      {
        scale: 0.5,
        rotate: -40,
        opacity: 0,
      },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.8,
      },
      "-=0.65"
    )

    .fromTo(
      ring2,
      {
        scale: 0.6,
        rotate: 50,
        opacity: 0,
      },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 1,
      },
      "-=0.8"
    )

    .fromTo(
      tag,
      {
        y: 25,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
      },
      "-=0.55"
    )

    .fromTo(
      card,
      {
        y: 35,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
      },
      "-=0.35"
    );

  return tl;
}

export function animateSceneExit(scene: HTMLElement) {
  return gsap.to(scene, {
    opacity: 0,
    scale: 0.95,
    duration: 0.5,
    ease: "power2.inOut",
  });
}

export function createInfiniteAnimations() {
  gsap.to(".category-ring", {
    rotate: 360,
    duration: 22,
    repeat: -1,
    ease: "none",
  });

  gsap.to(".category-ring-secondary", {
    rotate: -360,
    duration: 28,
    repeat: -1,
    ease: "none",
  });

  gsap.to(".category-glow", {
    scale: 1.08,
    opacity: 0.28,
    yoyo: true,
    repeat: -1,
    duration: 4,
    ease: "sine.inOut",
  });

  gsap.to(".category-image", {
    y: -12,
    yoyo: true,
    repeat: -1,
    duration: 3.5,
    ease: "sine.inOut",
  });

  gsap.to(".category-tag", {
    y: -8,
    yoyo: true,
    repeat: -1,
    duration: 2.8,
    ease: "sine.inOut",
  });
}
