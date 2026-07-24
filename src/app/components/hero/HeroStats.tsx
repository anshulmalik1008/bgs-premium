"use client";

import CountUp from "react-countup";
import { heroData } from "./heroData";

export default function HeroStats() {
  return (
    <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10">

      {heroData.stats.map((item) => (

        <div key={item.label}>

          <h3 className="text-3xl font-bold text-white lg:text-4xl">

            <CountUp
              end={Number(item.value.replace(/\D/g, ""))}
              duration={2}
            />

            {item.value.replace(/[0-9]/g, "")}

          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            {item.label}
          </p>

        </div>

      ))}

    </div>
  );
}
