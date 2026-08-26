"use client";

import Link from "next/link";
import {
  useState,
  type FormEvent,
} from "react";

import {
  ArrowLeft,
  Check,
  Circle,
  Gift,
  LoaderCircle,
  MapPin,
  PackageCheck,
  Search,
  Truck,
} from "lucide-react";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type TrackingOrder = {
  id: number;

  orderNumber: string;

  status: OrderStatus;

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  subtotal: string | number;
  shipping: string | number;
  discount: string | number;
  total: string | number;

  giftMessage?: string | null;

  createdAt: string;
  updatedAt: string;

  user: {
    name: string;
    email: string;
    phone?: string | null;
  };

  address: {
    fullName: string;
    phone: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  items: Array<{
    id: number;
    quantity: number;
    price: string | number;

    product: {
      id: number;
      name: string;
      slug: string;
      images: unknown;
    };
  }>;
};

type TrackingResponse = {
  success: boolean;
  message?: string;
  order?: TrackingOrder;
};

const trackingSteps = [
  {
    id: "CONFIRMED",
    title: "Order Confirmed",
    text: "Your order has been received.",
  },

  {
    id: "PROCESSING",
    title: "Preparing Your Gift",
    text: "Your order is being prepared.",
  },

  {
    id: "SHIPPED",
    title: "Shipped",
    text: "Your gift is on the way.",
  },

  {
    id: "DELIVERED",
    title: "Delivered",
    text: "Your order has been delivered.",
  },
] as const;

function statusIndex(status: OrderStatus) {
  if (status === "PENDING") {
    return 0;
  }

  if (status === "CONFIRMED") {
    return 0;
  }

  if (status === "PROCESSING") {
    return 1;
  }

  if (status === "SHIPPED") {
    return 2;
  }

  if (status === "DELIVERED") {
    return 3;
  }

  return -1;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [order, setOrder] =
    useState<TrackingOrder | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function trackOrder(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setOrder(null);

    const cleanOrderNumber =
      orderNumber.trim();

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanOrderNumber || !cleanEmail) {
      setError(
        "Enter your order number and email address.",
      );

      return;
    }

    setLoading(true);

    try {
      // Fetch the latest order status from MySQL.
      const response = await fetch(
        `/api/orders/track?orderNumber=${encodeURIComponent(
          cleanOrderNumber,
        )}&email=${encodeURIComponent(
          cleanEmail,
        )}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data =
        (await response.json()) as TrackingResponse;

      if (
        !response.ok ||
        !data.success ||
        !data.order
      ) {
        throw new Error(
          data.message ||
            "Order could not be found.",
        );
      }

      setOrder(data.order);
    } catch (error) {
      console.error(
        "Track order failed:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Order tracking failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  const activeStep = order
    ? statusIndex(order.status)
    : -1;

  return (
    <main className="min-h-screen bg-[#f5f2eb] px-4 py-8 text-[#181512] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1250px]">
        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-black/50"
          >
            <ArrowLeft size={16} />
            Back to BGS Luxury
          </Link>

          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#181512] text-[#d8b557]">
              <Gift size={19} />
            </div>

            <div>
              <strong className="block text-sm">
                BGS Luxury
              </strong>

              <span className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                Order Tracking
              </span>
            </div>
          </div>
        </header>

        <section className="overflow-hidden rounded-[34px] bg-[#12110e] p-7 text-white sm:p-10 lg:p-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b557]">
            Track Your Gift
          </span>

          <h1 className="mt-5 max-w-[800px] text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Follow every step of your
            <span className="block text-[#b5a475]">
              gifting journey.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/40">
            Enter the order number from your
            confirmation and the email used
            during checkout.
          </p>

          <form
            onSubmit={trackOrder}
            className="mt-9 grid gap-3 lg:grid-cols-[1fr_1fr_auto]"
          >
            <input
              value={orderNumber}
              onChange={(event) =>
                setOrderNumber(
                  event.target.value,
                )
              }
              placeholder="BGS-12345678"
              className="h-14 rounded-2xl border border-white/10 bg-white/[0.06] px-5 text-sm outline-none placeholder:text-white/25 focus:border-[#d8b557]/40"
            />

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              placeholder="Email address"
              className="h-14 rounded-2xl border border-white/10 bg-white/[0.06] px-5 text-sm outline-none placeholder:text-white/25 focus:border-[#d8b557]/40"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#d8b557] px-7 font-semibold text-[#181512] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                  Tracking
                </>
              ) : (
                <>
                  <Search size={17} />
                  Track Order
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-400/10 bg-red-400/[0.07] px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
        </section>

        {order && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_.8fr]">
            <div className="rounded-[30px] border border-black/[0.06] bg-white/80 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#98701f]">
                    Live Order Status
                  </span>

                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">
                    {order.orderNumber}
                  </h2>

                  <p className="mt-2 text-xs text-black/40">
                    Ordered{" "}
                    {formatDate(
                      order.createdAt,
                    )}
                  </p>
                </div>

                <span className="rounded-full bg-[#181512] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#e4c15c]">
                  {order.status}
                </span>
              </div>

              {order.status ===
              "CANCELLED" ? (
                <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm text-red-700">
                  This order has been
                  cancelled.
                </div>
              ) : (
                <div className="mt-10 grid gap-5">
                  {trackingSteps.map(
                    (step, index) => {
                      const completed =
                        index <= activeStep;

                      return (
                        <div
                          key={step.id}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`grid h-10 w-10 place-items-center rounded-full ${
                                completed
                                  ? "bg-[#181512] text-[#e4c15c]"
                                  : "bg-black/[0.05] text-black/25"
                              }`}
                            >
                              {completed ? (
                                <Check
                                  size={17}
                                />
                              ) : (
                                <Circle
                                  size={16}
                                />
                              )}
                            </div>

                            {index <
                              trackingSteps.length -
                                1 && (
                              <div
                                className={`h-12 w-px ${
                                  index <
                                  activeStep
                                    ? "bg-[#b89132]"
                                    : "bg-black/10"
                                }`}
                              />
                            )}
                          </div>

                          <div className="pt-1">
                            <strong className="text-sm">
                              {step.title}
                            </strong>

                            <p className="mt-1 text-xs text-black/40">
                              {step.text}
                            </p>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              )}

              <div className="mt-9 border-t border-black/[0.06] pt-7">
                <h3 className="text-xl font-semibold tracking-[-0.04em]">
                  Order Items
                </h3>

                <div className="mt-5 grid gap-3">
                  {order.items.map(
                    (item) => (
                      <article
                        key={item.id}
                        className="flex items-center justify-between gap-5 rounded-2xl bg-[#f5f2eb] p-4"
                      >
                        <div>
                          <strong className="text-sm">
                            {
                              item.product
                                .name
                            }
                          </strong>

                          <p className="mt-1 text-[10px] text-black/40">
                            Quantity:{" "}
                            {item.quantity}
                          </p>
                        </div>

                        <strong className="text-sm">
                          ₹
                          {(
                            Number(
                              item.price,
                            ) *
                            item.quantity
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </strong>
                      </article>
                    ),
                  )}
                </div>
              </div>
            </div>

            <aside className="grid content-start gap-5">
              <article className="rounded-[28px] bg-white/80 p-6">
                <div className="flex items-center gap-3">
                  <MapPin
                    size={19}
                    className="text-[#98701f]"
                  />

                  <h3 className="font-semibold">
                    Delivery Address
                  </h3>
                </div>

                <p className="mt-5 text-sm font-semibold">
                  {
                    order.address
                      .fullName
                  }
                </p>

                <p className="mt-2 text-xs leading-6 text-black/45">
                  {order.address.line1}
                  {order.address.line2
                    ? `, ${order.address.line2}`
                    : ""}
                  <br />

                  {order.address.city},{" "}
                  {order.address.state} -{" "}
                  {
                    order.address
                      .postalCode
                  }
                </p>
              </article>

              <article className="rounded-[28px] bg-[#181512] p-6 text-white">
                <div className="flex items-center gap-3 text-[#e4c15c]">
                  <PackageCheck
                    size={19}
                  />

                  <h3 className="font-semibold">
                    Order Summary
                  </h3>
                </div>

                <div className="mt-6 grid gap-4 text-xs">
                  <div className="flex justify-between text-white/45">
                    <span>Subtotal</span>

                    <strong className="text-white">
                      ₹
                      {Number(
                        order.subtotal,
                      ).toLocaleString(
                        "en-IN",
                      )}
                    </strong>
                  </div>

                  <div className="flex justify-between text-white/45">
                    <span>Shipping</span>

                    <strong className="text-white">
                      ₹
                      {Number(
                        order.shipping,
                      ).toLocaleString(
                        "en-IN",
                      )}
                    </strong>
                  </div>

                  <div className="flex justify-between border-t border-white/10 pt-4 text-white/45">
                    <span>Total</span>

                    <strong className="text-lg text-[#e4c15c]">
                      ₹
                      {Number(
                        order.total,
                      ).toLocaleString(
                        "en-IN",
                      )}
                    </strong>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-xl bg-white/[0.05] p-3 text-[10px] text-white/45">
                  <Truck size={15} />
                  Status updates are synced
                  with the Agent Portal.
                </div>
              </article>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
}
