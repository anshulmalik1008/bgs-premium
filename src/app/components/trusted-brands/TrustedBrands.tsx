"use client";

const brandRowOne = [
  "Google",
  "Microsoft",
  "Adobe",
  "Amazon",
  "Infosys",
  "Deloitte",
  "TCS",
  "Accenture",
];


const brandRowTwo = [
  "Flipkart",
  "Paytm",
  "Pine Labs",
  "HDFC Bank",
  "KPMG",
  "EY",
  "Wipro",
  "Tech Mahindra",
];

const highlights = [
  {
    value: "120+",
    label: "Corporate Partners",
  },
  {
    value: "18K+",
    label: "Premium Gifts Delivered",
  },
  {
    value: "42",
    label: "Cities Covered",
  },
];

function BrandPill({ name }: { name: string }) {
  return (
    <div className="group flex min-w-[190px] items-center justify-center rounded-[24px] border border-black/[0.055] bg-white/65 px-7 py-6 shadow-[0_16px_45px_rgba(58,38,12,0.055)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_60px_rgba(58,38,12,0.09)]">
      <span className="text-[18px] font-semibold tracking-[-0.035em] text-[#272019]/70 transition duration-300 group-hover:text-[#9b6f2b]">
        {name}
      </span>
    </div>
  );
}

export default function TrustedBrands() {
  const firstLoop = [...brandRowOne, ...brandRowOne];
  const secondLoop = [...brandRowTwo, ...brandRowTwo];

  return (
    <section className="relative overflow-hidden bg-[#f2eee6] py-24 text-[#1e1813] lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-10 h-[540px] w-[540px] rounded-full bg-[#dbc38e]/20 blur-[170px]" />
        <div className="absolute -right-48 bottom-0 h-[620px] w-[620px] rounded-full bg-[#d7b97d]/18 blur-[190px]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#2d2318_1px,transparent_1px),linear-gradient(to_bottom,#2d2318_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[920px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b88a3d]/20 bg-white/70 px-4 py-2 shadow-[0_10px_35px_rgba(63,40,10,0.05)] backdrop-blur-xl">
            <span className="text-[12px] text-[#9b6c26]">✦</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#7c5721]">
              Trusted by Leading Teams
            </span>
          </div>

          <h2 className="mt-7 text-[44px] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[60px] lg:text-[82px]">
            Gifting experiences
            <span className="block bg-gradient-to-r from-[#74501d] via-[#bf9448] to-[#74501d] bg-clip-text text-transparent">
              brands remember.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[710px] text-[14px] leading-7 text-black/48 md:text-[15px]">
            From employee celebrations to executive gifting, BGS helps teams
            create premium moments that feel thoughtful, polished and personal.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-[28px] border border-black/[0.05] bg-white/58 px-6 py-7 text-center shadow-[0_18px_55px_rgba(64,42,11,0.06)] backdrop-blur-xl"
            >
              <p className="text-[32px] font-semibold tracking-[-0.055em] text-[#251d16] md:text-[38px]">
                {item.value}
              </p>

              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/38">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#f2eee6] to-transparent md:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#f2eee6] to-transparent md:w-44" />

        <div className="overflow-hidden">
          <div className="brand-marquee flex w-max gap-4 px-4">
            {firstLoop.map((brand, index) => (
              <BrandPill key={`${brand}-${index}`} name={brand} />
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-hidden">
          <div className="brand-marquee-reverse flex w-max gap-4 px-4">
            {secondLoop.map((brand, index) => (
              <BrandPill key={`${brand}-${index}`} name={brand} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-[1550px] px-5 md:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[32px] border border-black/[0.055] bg-[#211a14] px-6 py-7 text-white shadow-[0_30px_85px_rgba(31,23,15,0.18)] sm:flex-row sm:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Corporate Gifting
            </p>

            <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] sm:text-[30px]">
              Build a gifting experience for your team.
            </h3>
          </div>

          <button
            type="button"
            className="group flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-[11px] font-semibold text-[#211a14] transition hover:-translate-y-1"
          >
            Explore Corporate Gifts

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#211a14] text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-[#a87c35]">
              ↗
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .brand-marquee {
          animation: brandMarquee 30s linear infinite;
        }

        .brand-marquee-reverse {
          animation: brandMarqueeReverse 32s linear infinite;
        }

        .brand-marquee:hover,
        .brand-marquee-reverse:hover {
          animation-play-state: paused;
        }

        @keyframes brandMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes brandMarqueeReverse {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-marquee,
          .brand-marquee-reverse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}