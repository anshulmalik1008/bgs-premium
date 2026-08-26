"use client";

const footerLinks = {
  Shop: [
    "Luxury Hampers",
    "Birthday Gifts",
    "Anniversary Gifts",
    "Flowers",
    "Personalised Gifts",
  ],
  Discover: [
    "New Arrivals",
    "Bestsellers",
    "Corporate Gifting",
    "Gift Finder",
    "Our Story",
  ],
  Support: [
    "Contact Us",
    "Track Order",
    "Shipping & Delivery",
    "Returns & Refunds",
    "FAQs",
  ],
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14.2 8.2V6.8c0-.7.5-.9 1.1-.9h2V2.3c-.9-.1-1.8-.3-2.7-.3-2.7 0-4.6 1.7-4.6 4.8v1.4H7v4h3v9.8h4.2v-9.8h3.1l.5-4h-3.6Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0 2.1-.2 4.2-.6 5.5-.3 1-1.1 1.8-2.1 2.1-1.8.5-5.1.6-7.3.6s-5.5-.1-7.3-.6c-1-.3-1.8-1.1-2.1-2.1C2.2 16.2 2 14.1 2 12s.2-4.2.6-5.5c.3-1 1.1-1.8 2.1-2.1C6.5 3.9 9.8 3.8 12 3.8s5.5.1 7.3.6c1 .3 1.8 1.1 2.1 2.1.4 1.3.6 3.4.6 5.5Zm-12.2 4.2 6.1-4.2-6.1-4.2v8.4Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.1-2 .1-2.9l1.2-5.1s-.3-.7-.3-1.8c0-1.7 1-3 2.3-3 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1 4.2-.6 2.5 1.2 4.5 3.6 4.5 4.3 0 7.2-5.5 7.2-12 0-5-4.1-8.7-9.2-8.7-6.4 0-10.4 4.8-10.4 10.1 0 1.8.5 3.1 1.3 4.1.4.4.4.6.3 1.1l-.4 1.5c-.1.5-.5.7-1 .5-2.7-1.1-3.9-4-3.9-7.2C-.2 5.3 4.9 0 13.5 0 20.4 0 25 5 25 11.4c0 7.9-4.4 13.8-10.9 13.8-2.2 0-4.2-1.2-4.9-2.6l-1.3 5c-.5 1.8-1.6 4-2.4 5.4A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M7 3h3l1.5 4-2 1.5c1.2 2.5 3.2 4.5 5.7 5.7l1.5-2 4 1.5v3A3.3 3.3 0 0 1 17.4 20C9.9 20 4 14.1 4 6.6A3.6 3.6 0 0 1 7 3Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function SocialButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-white/70 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#d6b26f]/50 hover:bg-[#d6b26f] hover:text-[#17110c] hover:shadow-[0_14px_35px_rgba(214,178,111,.24)]"
    >
      <span className="transition duration-500 group-hover:scale-110">
        {children}
      </span>
    </button>
  );
}

export default function LuxuryFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#100c09] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-44 top-20 h-[520px] w-[520px] rounded-full bg-[#9d6f2d]/20 blur-[160px]" />
        <div className="absolute -right-56 bottom-0 h-[620px] w-[620px] rounded-full bg-[#d7b16c]/15 blur-[200px]" />
        <div className="absolute left-1/2 top-[20%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#6f4b1c]/10 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="pointer-events-none absolute right-[8%] top-16 hidden h-[280px] w-[280px] lg:block">
        <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-[#d8b474]/20 [transform:rotateX(68deg)_rotateZ(12deg)]" />
        <div className="absolute inset-8 animate-[spin_13s_linear_infinite_reverse] rounded-full border border-white/10 [transform:rotateY(68deg)_rotateZ(-18deg)]" />
        <div className="absolute inset-[88px] animate-pulse rounded-full bg-gradient-to-br from-[#f4d596] via-[#a87328] to-[#3f2a10] shadow-[0_0_85px_rgba(214,178,111,.35)]" />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-5 pb-10 pt-24 md:px-8 lg:px-12 lg:pt-32">
        <div className="relative overflow-hidden rounded-[38px] border border-white/[0.09] bg-white/[0.045] p-7 shadow-[0_45px_130px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:p-10 lg:rounded-[50px] lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,255,255,.08),transparent_26%)]" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#d8b474]/10 [transform:rotateX(65deg)_rotateZ(20deg)]" />

          <div className="relative grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d6b26f]/20 bg-[#d6b26f]/10 px-4 py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e6c98d]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e1c383]">
                  The Art of Gifting
                </span>
              </div>

              <h2 className="mt-7 max-w-[850px] text-[46px] font-semibold leading-[0.95] tracking-[-0.065em] sm:text-[64px] lg:text-[88px]">
                Make every gesture
                <span className="block bg-gradient-to-r from-[#fff4dc] via-[#d7b16c] to-[#916321] bg-clip-text text-transparent">
                  unforgettable.
                </span>
              </h2>

              <p className="mt-7 max-w-[650px] text-[14px] leading-7 text-white/48 md:text-[15px]">
                Discover curated gifts, handcrafted details and elevated
                experiences designed for life&apos;s most meaningful moments.
              </p>
            </div>

            <div className="group relative mx-auto w-full max-w-[420px] [perspective:1000px] lg:ml-auto">
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.025] p-6 shadow-[0_30px_80px_rgba(0,0,0,.34)] backdrop-blur-xl transition duration-700 [transform:rotateY(-8deg)_rotateX(4deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-8px)]">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#d6b26f]/20 blur-2xl" />

                <p className="relative text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9b876]">
                  Private Concierge
                </p>

                <h3 className="relative mt-3 text-[25px] font-semibold tracking-[-0.04em]">
                  Need help choosing the perfect gift?
                </h3>

                <p className="relative mt-3 text-[12px] leading-6 text-white/45">
                  Our gifting specialists will help you curate something truly
                  personal.
                </p>

                <button
                  type="button"
                  className="relative mt-6 flex w-full items-center justify-between rounded-full bg-[#f3e5c9] px-5 py-4 text-[11px] font-semibold text-[#1a130d] transition duration-500 hover:bg-white"
                >
                  Talk to a Gift Expert

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a130d] text-white">
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-16 lg:grid-cols-[1.1fr_1.4fr] lg:gap-20 lg:py-20">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6b26f]/30 bg-gradient-to-br from-[#dcbf83] to-[#7d521b] text-[22px] font-semibold text-[#17100a] shadow-[0_16px_45px_rgba(214,178,111,.2)]">
                B
              </div>

              <div>
                <p className="text-[24px] font-semibold tracking-[-0.05em]">
                  BGS Luxury
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  Premium Gifting House
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-[460px] text-[13px] leading-7 text-white/42">
              Thoughtfully curated gifts that turn beautiful moments into
              lasting memories.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 text-[12px] text-white/50">
                <MailIcon />
                <span>hello@bgsluxury.com</span>
              </div>

              <div className="flex items-start gap-3 text-[12px] text-white/50">
                <PhoneIcon />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-start gap-3 text-[12px] leading-6 text-white/50">
                <LocationIcon />
                <span>Ghaziabad, Uttar Pradesh, India</span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <SocialButton label="Instagram">
                <InstagramIcon />
              </SocialButton>

              <SocialButton label="Facebook">
                <FacebookIcon />
              </SocialButton>

              <SocialButton label="YouTube">
                <YoutubeIcon />
              </SocialButton>

              <SocialButton label="Pinterest">
                <PinterestIcon />
              </SocialButton>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d7b16c]">
                  {title}
                </h3>

                <ul className="mt-6 space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-2 text-[13px] text-white/48 transition duration-300 hover:text-white"
                      >
                        <span className="h-px w-0 bg-[#d7b16c] transition-all duration-300 group-hover:w-4" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        

        <div className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.035] px-6 py-6 backdrop-blur-xl lg:px-8">
          <div className="absolute -left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#d6b26f]/12 blur-2xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Secure Payments
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {["VISA", "Mastercard", "RuPay", "UPI", "PayPal"].map(
                  (payment) => (
                    <span
                      key={payment}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.055] px-3 py-2 text-[9px] font-semibold text-white/55"
                    >
                      {payment}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] text-white/35">
              <a href="#" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms & Conditions
              </a>
              <a href="#" className="transition hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-9 text-[10px] text-white/28 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BGS Luxury Gifts. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Crafted with
            <span className="text-[#d7b16c]">◆</span>
            for meaningful moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
