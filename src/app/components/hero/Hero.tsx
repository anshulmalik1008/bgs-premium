"use client";


import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroPhone from "./HeroPhone";
import HeroScrollAnimation from "./HeroScrollAnimation";

export default function Hero() {
 

  return (
   
     <section className="relative overflow-hidden pt-28 md:pt-32 lg:pt-36">
  <HeroBackground />

  <div className="container mx-auto">
    <div className="grid lg:grid-cols-2 items-center min-h-screen">
      <div className="hero-content">
        <HeroContent />
      </div>

      <div className="hero-gift relative hidden lg:block">
  <HeroPhone />
</div>
    </div>
  </div>

  <HeroScrollAnimation />
</section>
  );
}