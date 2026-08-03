"use client";

import { useMemo, useState } from "react";
import "./track-order.css";

type TrackingStep = {
  id: number;
  title: string;
  description: string;
  time: string;
  status: "completed" | "active" | "upcoming";
};

const demoSteps: TrackingStep[] = [
  {
    id: 1,
    title: "Order confirmed",
    description: "Your order has been received and payment is verified.",
    time: "03 Aug, 10:42 AM",
    status: "completed",
  },
  {
    id: 2,
    title: "Gift preparation",
    description: "Our team is preparing your gift and premium packaging.",
    time: "03 Aug, 12:15 PM",
    status: "completed",
  },
  {
    id: 3,
    title: "Ready for dispatch",
    description: "The order is packed and waiting for courier pickup.",
    time: "Expected today",
    status: "active",
  },
  {
    id: 4,
    title: "Out for delivery",
    description: "Your gift will be delivered to the recipient.",
    time: "Expected tomorrow",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Delivered",
    description: "The gifting experience is complete.",
    time: "Expected by 05 Aug",
    status: "upcoming",
  },
];

function Icon({
  type,
}: {
  type:
    | "search"
    | "package"
    | "truck"
    | "check"
    | "location"
    | "phone"
    | "arrow"
    | "gift"
    | "clock";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "track-icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
    );
  }

  if (type === "package") {
    return (
      <svg {...common}>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7v10l8 4 8-4V7M12 11v10" />
      </svg>
    );
  }

  if (type === "truck") {
    return (
      <svg {...common}>
        <path d="M3 6h11v10H3Z" />
        <path d="M14 10h4l3 3v3h-7Z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...common}>
        <path d="M7 3h3l1.5 4-2 1.5c1.2 2.5 3.2 4.5 5.7 5.7l1.5-2 4 1.5v3A3.3 3.3 0 0 1 17.4 20C9.9 20 4 14.1 4 6.6A3.6 3.6 0 0 1 7 3Z" />
      </svg>
    );
  }

  if (type === "gift") {
    return (
      <svg {...common}>
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M12 9v12M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5V9Z" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [mobile, setMobile] = useState("");
  const [searched, setSearched] = useState(false);

  const progress = useMemo(() => {
    const completed = demoSteps.filter(
      (step) => step.status === "completed"
    ).length;

    const active = demoSteps.some((step) => step.status === "active") ? 1 : 0;

    return ((completed + active * 0.5) / demoSteps.length) * 100;
  }, []);

  function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!orderId.trim() || !mobile.trim()) return;

    setSearched(true);
  }

  return (
    <main className="track-page">
      <section className="track-hero">
        <div className="track-grid-overlay" />

        <div className="track-shell track-hero-grid">
          <div className="track-hero-copy">
            <span className="track-kicker">✦ Track Your Gift</span>

            <h1>
              Follow every step,
              <span>from us to them.</span>
            </h1>

            <p>
              Enter your order details to view the latest delivery status and
              expected arrival.
            </p>

            <form className="track-search-form" onSubmit={handleTrack}>
              <label>
                <span>Order ID</span>

                <div>
                  <Icon type="package" />

                  <input
                    value={orderId}
                    onChange={(event) => setOrderId(event.target.value)}
                    placeholder="Example: BGS-482913"
                    required
                  />
                </div>
              </label>

              <label>
                <span>Mobile number</span>

                <div>
                  <Icon type="phone" />

                  <input
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    placeholder="+91 98765 43210"
                    inputMode="tel"
                    required
                  />
                </div>
              </label>

              <button type="submit">
                <Icon type="search" />
                Track order
              </button>
            </form>
          </div>

          <div className="track-visual" aria-hidden="true">
            <div className="track-glow" />
            <div className="track-orbit track-orbit-one" />
            <div className="track-orbit track-orbit-two" />

            <div className="track-package">
              <Icon type="gift" />
              <span>BGS</span>
            </div>

            <div className="track-road">
              <div className="track-road-line" />
              <div className="track-truck">
                <Icon type="truck" />
              </div>
            </div>

            <span className="track-float track-float-one">
              Secure Packaging
            </span>

            <span className="track-float track-float-two">
              Live Updates
            </span>
          </div>
        </div>
      </section>

      <section className="track-main">
        <div className="track-shell">
          {!searched ? (
            <div className="track-placeholder">
              <div className="track-placeholder-icon">
                <Icon type="location" />
              </div>

              <span className="track-kicker">Order Journey</span>

              <h2>Your delivery timeline will appear here.</h2>

              <p>
                Use the order ID and mobile number linked to your purchase.
              </p>
            </div>
          ) : (
            <>
              <section className="track-summary">
                <div>
                  <p>Order Number</p>
                  <h2>{orderId.toUpperCase()}</h2>
                  <span>Royal Celebration Hamper</span>
                </div>

                <div className="track-status-badge">
                  <span />
                  Ready for dispatch
                </div>
              </section>

              <section className="track-progress-card">
                <div className="track-progress-heading">
                  <div>
                    <span className="track-kicker">Live Order Status</span>
                    <h2>Your gift is being prepared for dispatch.</h2>
                  </div>

                  <div className="track-estimate">
                    <Icon type="clock" />

                    <div>
                      <span>Estimated delivery</span>
                      <strong>05 Aug 2026</strong>
                    </div>
                  </div>
                </div>

                <div className="track-progress-bar">
                  <span style={{ width: `${progress}%` }} />
                </div>

                <div className="track-timeline">
                  {demoSteps.map((step) => (
                    <article
                      key={step.id}
                      className={`track-step track-step-${step.status}`}
                    >
                      <div className="track-step-marker">
                        {step.status === "completed" ? (
                          <Icon type="check" />
                        ) : step.status === "active" ? (
                          <Icon type="package" />
                        ) : (
                          <span>{step.id}</span>
                        )}
                      </div>

                      <div>
                        <p>{step.time}</p>
                        <h3>{step.title}</h3>
                        <span>{step.description}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="track-info-grid">
                <article>
                  <div className="track-info-icon">
                    <Icon type="location" />
                  </div>

                  <p>Delivery Address</p>

                  <h3>Home</h3>

                  <span>
                    Raj Nagar Extension, Ghaziabad, Uttar Pradesh – 201017
                  </span>
                </article>

                <article>
                  <div className="track-info-icon">
                    <Icon type="truck" />
                  </div>

                  <p>Delivery Partner</p>

                  <h3>BGS Premium Logistics</h3>

                  <span>Tracking ID: BGSL-982145</span>
                </article>

                <article>
                  <div className="track-info-icon">
                    <Icon type="phone" />
                  </div>

                  <p>Need Help?</p>

                  <h3>Gift Concierge</h3>

                  <a href="tel:+919876543210">
                    Contact support
                    <Icon type="arrow" />
                  </a>
                </article>
              </section>

              <section className="track-actions">
                <a href="/account">
                  View all orders
                  <Icon type="arrow" />
                </a>

                <a href="/shop" className="secondary">
                  Continue shopping
                </a>
              </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
