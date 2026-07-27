type GalleryItem = {
  id: number;
  title: string;
  category: string;
  type: "reel" | "photo";
  likes: string;
  views: string;
  badge: string;
  gradient: string;
  size: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "A Golden Birthday Surprise",
    category: "Birthday Edit",
    type: "reel",
    likes: "12.4K",
    views: "84K",
    badge: "Trending Reel",
    gradient:
      "linear-gradient(145deg, #2c2219 0%, #7d5a2e 45%, #d3ab63 100%)",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Blush Flower Moment",
    category: "Flowers",
    type: "photo",
    likes: "8.5K",
    views: "41K",
    badge: "Most Loved",
    gradient:
      "linear-gradient(145deg, #fff7f5 0%, #e9c6c0 52%, #b9786d 100%)",
    size: "",
  },
  {
    id: 3,
    title: "Luxury Hamper Unboxing",
    category: "Hampers",
    type: "reel",
    likes: "16K",
    views: "102K",
    badge: "Viral Pick",
    gradient:
      "linear-gradient(145deg, #1f1b16 0%, #6d5738 50%, #c6a46d 100%)",
    size: "",
  },
  {
    id: 4,
    title: "Personalised With Love",
    category: "Keepsakes",
    type: "photo",
    likes: "6.9K",
    views: "33K",
    badge: "Made For You",
    gradient:
      "linear-gradient(145deg, #fffaf6 0%, #ead7ca 52%, #b98669 100%)",
    size: "",
  },
  {
    id: 5,
    title: "The Wedding Keepsake Edit",
    category: "Wedding",
    type: "reel",
    likes: "14.2K",
    views: "91K",
    badge: "Wedding Story",
    gradient:
      "linear-gradient(145deg, #faf7f0 0%, #dfcfb4 48%, #9e7c4b 100%)",
    size: "md:col-span-2",
  },
  {
    id: 6,
    title: "A Note That Said Everything",
    category: "Just Because",
    type: "photo",
    likes: "7.8K",
    views: "39K",
    badge: "Heartfelt",
    gradient:
      "linear-gradient(145deg, #fff9f2 0%, #ead9bf 50%, #b88c50 100%)",
    size: "",
  },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l10-6.5L8 5.5Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 21s-7-4.35-9.4-8.3C.6 9.4 2.15 5 6.2 5c2.2 0 3.45 1.25 4.15 2.35C11.05 6.25 12.3 5 14.5 5c4.05 0 5.6 4.4 3.6 7.7C15.7 16.65 12 21 12 21Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function SocialGallery() {
  return (
    <section className="relative overflow-hidden bg-[#f8f5ef] py-24 text-[#1d1813] lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-0 h-[570px] w-[570px] rounded-full bg-[#dac28d]/20 blur-[175px]" />
        <div className="absolute -right-44 bottom-0 h-[620px] w-[620px] rounded-full bg-[#d6b77b]/20 blur-[190px]" />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[920px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b68a40]/20 bg-white/75 px-4 py-2 shadow-[0_10px_35px_rgba(66,42,9,0.05)] backdrop-blur-xl">
            <InstagramIcon />
            <span className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#7d5721]">
              Social Gallery
            </span>
          </div>

          <h2 className="mt-7 text-[44px] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[60px] lg:text-[82px]">
            Moments shared
            <span className="block bg-gradient-to-r from-[#79531d] via-[#bd9146] to-[#79531d] bg-clip-text text-transparent">
              with BGS.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[690px] text-[14px] leading-7 text-black/50 md:text-[15px]">
            A living gallery of joyful reveals, thoughtful surprises and gifts
            that became part of someone&apos;s story.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[38px] border border-black/[0.06] bg-white/50 p-3 shadow-[0_55px_145px_rgba(63,39,8,0.11)] backdrop-blur-2xl sm:p-5 lg:rounded-[52px] lg:p-7">
          <div className="grid auto-rows-[260px] gap-5 md:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.id}
                className={`group relative min-h-[260px] overflow-hidden rounded-[30px] border border-white/65 shadow-[0_24px_70px_rgba(63,39,8,0.10)] transition duration-500 hover:-translate-y-2 ${item.size}`}
                style={{ background: item.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-80" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.42),transparent_34%)] transition-transform duration-700 group-hover:scale-110" />

                <div className="absolute left-4 top-4 z-20 rounded-full border border-white/30 bg-white/20 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-xl">
                  ✦ {item.badge}
                </div>

                {item.type === "reel" && (
                  <div className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/20 text-white shadow-[0_20px_55px_rgba(0,0,0,.18)] backdrop-blur-xl transition duration-500 group-hover:scale-110">
                    <PlayIcon />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/65">
                    {item.category}
                  </p>

                  <h3 className="mt-2 max-w-[340px] text-[21px] font-semibold leading-tight tracking-[-0.035em] text-white md:text-[25px]">
                    {item.title}
                  </h3>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-[9px] font-semibold text-white/75">
                      <span className="flex items-center gap-1.5">
                        <HeartIcon />
                        {item.likes}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <EyeIcon />
                        {item.views}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[8px] font-semibold text-[#251c14] shadow-[0_10px_30px_rgba(0,0,0,.13)] transition hover:scale-105"
                    >
                      Shop
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-[26px] border border-black/[0.05] bg-white/65 px-5 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Follow our gifting stories
              </p>
              <p className="mt-1 text-[15px] font-semibold text-[#241c15]">
                @bgsluxurygifts
              </p>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-full bg-[#211a14] px-6 py-4 text-[11px] font-semibold text-white shadow-[0_18px_45px_rgba(31,22,12,0.18)] transition hover:-translate-y-1"
            >
              Shop The Look
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
