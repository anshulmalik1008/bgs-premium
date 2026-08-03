"use client";

import { useEffect, useMemo, useState } from "react";
import "./checkout.css";

type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge?: string;
  gradient: string;
  quantity: number;
};

const CART_STORAGE_KEY = "bgs_cart_items";

function Icon({
  type,
}: {
  type:
    | "arrow"
    | "bag"
    | "card"
    | "truck"
    | "shield"
    | "check"
    | "location"
    | "gift";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "checkout-icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </svg>
    );
  }

  if (type === "bag") {
    return (
      <svg {...common}>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </svg>
    );
  }

  if (type === "card") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
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

  if (type === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 5 6v5c0 5 3.2 8 7 10 3.8-2 7-5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
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

  return (
    <svg {...common}>
      <rect x="3" y="9" width="18" height="12" rx="2" />
      <path d="M12 9v12M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5V9Z" />
    </svg>
  );
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [deliverySlot, setDeliverySlot] = useState("standard");
  const [giftWrap, setGiftWrap] = useState(true);
  const [billingSame, setBillingSame] = useState(true);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    setCartItems(readCart());
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const shipping = deliverySlot === "express" ? 299 : 0;
  const giftWrapFee = giftWrap ? 149 : 0;
  const total = subtotal + shipping + giftWrapFee;

  function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPlaced(true);
    window.localStorage.removeItem(CART_STORAGE_KEY);
  }

  if (placed) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="checkout-success-card">
            <div className="checkout-success-icon">
              <Icon type="check" />
            </div>

            <span className="checkout-kicker">Order Confirmed</span>

            <h1>
              Your gift is
              <span>on its way.</span>
            </h1>

            <p>
              Thank you for choosing BGS Luxury. Your order has been received
              and is now being prepared with care.
            </p>

            <div className="checkout-success-meta">
              <div>
                <span>Order ID</span>
                <strong>BGS-{Date.now().toString().slice(-6)}</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <div className="checkout-success-actions">
              <a href="/shop">
                Continue shopping
                <Icon type="arrow" />
              </a>

              <a href="/account/orders" className="secondary">
                View orders
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-hero">
        <div className="checkout-shell">
          <span className="checkout-kicker">✦ Secure Checkout</span>

          <h1>
            Complete your
            <span>gifting experience.</span>
          </h1>

          <p>
            Enter delivery details, choose your preferred payment method and
            review your order before placing it.
          </p>
        </div>
      </section>

      <form className="checkout-main" onSubmit={placeOrder}>
        <div className="checkout-shell checkout-layout">
          <div className="checkout-form-column">
            <section className="checkout-panel">
              <div className="checkout-panel-heading">
                <div className="checkout-step-number">01</div>

                <div>
                  <p>Contact Details</p>
                  <h2>Who should receive order updates?</h2>
                </div>
              </div>

              <div className="checkout-fields two-column">
                <label>
                  <span>Full name</span>
                  <input required placeholder="Enter full name" />
                </label>

                <label>
                  <span>Mobile number</span>
                  <input required inputMode="tel" placeholder="+91" />
                </label>

                <label className="full">
                  <span>Email address</span>
                  <input required type="email" placeholder="name@example.com" />
                </label>
              </div>
            </section>

            <section className="checkout-panel">
              <div className="checkout-panel-heading">
                <div className="checkout-step-number">02</div>

                <div>
                  <p>Delivery Address</p>
                  <h2>Where should we deliver the gift?</h2>
                </div>
              </div>

              <div className="checkout-fields two-column">
                <label className="full">
                  <span>Address line</span>
                  <input required placeholder="House number, street and area" />
                </label>

                <label>
                  <span>City</span>
                  <input required placeholder="City" />
                </label>

                <label>
                  <span>State</span>
                  <input required placeholder="State" />
                </label>

                <label>
                  <span>PIN code</span>
                  <input required inputMode="numeric" placeholder="201001" />
                </label>

                <label>
                  <span>Landmark</span>
                  <input placeholder="Optional landmark" />
                </label>
              </div>

              <label className="checkout-checkbox">
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={(event) => setBillingSame(event.target.checked)}
                />

                <span>Billing address is same as delivery address</span>
              </label>
            </section>

            <section className="checkout-panel">
              <div className="checkout-panel-heading">
                <div className="checkout-step-number">03</div>

                <div>
                  <p>Delivery Preference</p>
                  <h2>Choose how quickly it should arrive.</h2>
                </div>
              </div>

              <div className="checkout-options">
                <button
                  type="button"
                  className={deliverySlot === "standard" ? "is-active" : ""}
                  onClick={() => setDeliverySlot("standard")}
                >
                  <Icon type="truck" />

                  <div>
                    <strong>Standard delivery</strong>
                    <span>2–4 business days</span>
                  </div>

                  <b>Free</b>
                </button>

                <button
                  type="button"
                  className={deliverySlot === "express" ? "is-active" : ""}
                  onClick={() => setDeliverySlot("express")}
                >
                  <Icon type="truck" />

                  <div>
                    <strong>Express delivery</strong>
                    <span>Priority handling</span>
                  </div>

                  <b>₹299</b>
                </button>
              </div>

              <label className="checkout-gift-wrap">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(event) => setGiftWrap(event.target.checked)}
                />

                <Icon type="gift" />

                <div>
                  <strong>Luxury gift wrapping</strong>
                  <span>Premium box, ribbon and message card</span>
                </div>

                <b>₹149</b>
              </label>
            </section>

            <section className="checkout-panel">
              <div className="checkout-panel-heading">
                <div className="checkout-step-number">04</div>

                <div>
                  <p>Payment</p>
                  <h2>Select a secure payment method.</h2>
                </div>
              </div>

              <div className="checkout-payment-methods">
                {[
                  {
                    id: "upi",
                    title: "UPI",
                    text: "Google Pay, PhonePe, Paytm and other UPI apps",
                  },
                  {
                    id: "card",
                    title: "Credit / Debit Card",
                    text: "Visa, Mastercard and RuPay",
                  },
                  {
                    id: "cod",
                    title: "Cash on Delivery",
                    text: "Available on eligible addresses",
                  },
                ].map((method) => (
                  <button
                    type="button"
                    key={method.id}
                    className={
                      paymentMethod === method.id ? "is-active" : ""
                    }
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <Icon type="card" />

                    <div>
                      <strong>{method.title}</strong>
                      <span>{method.text}</span>
                    </div>

                    <i />
                  </button>
                ))}
              </div>

              {paymentMethod === "upi" && (
                <div className="checkout-payment-fields">
                  <label>
                    <span>UPI ID</span>
                    <input placeholder="name@bank" />
                  </label>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="checkout-payment-fields two-column">
                  <label className="full">
                    <span>Card number</span>
                    <input inputMode="numeric" placeholder="0000 0000 0000 0000" />
                  </label>

                  <label>
                    <span>Expiry</span>
                    <input placeholder="MM/YY" />
                  </label>

                  <label>
                    <span>CVV</span>
                    <input inputMode="numeric" placeholder="•••" />
                  </label>
                </div>
              )}
            </section>
          </div>

          <aside className="checkout-summary">
            <div className="checkout-summary-heading">
              <Icon type="bag" />

              <div>
                <p>Your Order</p>
                <h2>{cartItems.length} selected gifts</h2>
              </div>
            </div>

            <div className="checkout-items">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <article key={item.id}>
                    <div
                      className="checkout-item-visual"
                      style={{ background: item.gradient }}
                    >
                      {item.category.slice(0, 1)}
                    </div>

                    <div>
                      <p>{item.category}</p>
                      <h3>{item.name}</h3>
                      <span>Qty: {item.quantity}</span>
                    </div>

                    <strong>
                      ₹
                      {(item.price * item.quantity).toLocaleString("en-IN")}
                    </strong>
                  </article>
                ))
              ) : (
                <div className="checkout-empty-cart">
                  <p>Your cart is empty.</p>
                  <a href="/shop">Return to shop</a>
                </div>
              )}
            </div>

            <div className="checkout-summary-lines">
              <div>
                <span>Subtotal</span>
                <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>
                  {shipping === 0
                    ? "Complimentary"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </strong>
              </div>

              <div>
                <span>Gift wrapping</span>
                <strong>
                  {giftWrapFee === 0
                    ? "Not selected"
                    : `₹${giftWrapFee.toLocaleString("en-IN")}`}
                </strong>
              </div>
            </div>

            <div className="checkout-total">
              <span>Total payable</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <button
              type="submit"
              className="checkout-place-order"
              disabled={cartItems.length === 0}
            >
              Place secure order
              <Icon type="arrow" />
            </button>

            <div className="checkout-trust">
              <div>
                <Icon type="shield" />
                <span>Secure encrypted checkout</span>
              </div>

              <div>
                <Icon type="gift" />
                <span>Luxury presentation assured</span>
              </div>

              <div>
                <Icon type="location" />
                <span>Delivery tracking included</span>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}
