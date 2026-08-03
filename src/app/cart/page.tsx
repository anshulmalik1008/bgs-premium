"use client";

import { useMemo, useState } from "react";
import { initialCartItems } from "./cartData";
import "./cart.css";

function Icon({
  type,
}: {
  type: "minus" | "plus" | "trash" | "bag" | "arrow" | "gift";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "cart-icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    "aria-hidden": true,
  };

  if (type === "minus") {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
      </svg>
    );
  }

  if (type === "plus") {
    return (
      <svg {...common}>
        <path d="M5 12h14M12 5v14" />
      </svg>
    );
  }

  if (type === "trash") {
    return (
      <svg {...common}>
        <path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" />
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

  if (type === "gift") {
    return (
      <svg {...common}>
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M12 9v12M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5V9Z" />
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

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [items]
  );

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 3000 || items.length === 0 ? 0 : 199;
  const total = subtotal - discount + shipping;

  function updateQuantity(id: number, amount: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, Math.min(10, item.quantity + amount)),
            }
          : item
      )
    );
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="cart-page">
      <section className="cart-hero">
        <div className="cart-shell">
          <span className="cart-kicker">✦ Your Luxury Selection</span>
          <h1>
            Your cart,
            <span>beautifully curated.</span>
          </h1>
          <p>
            Review your selected gifts, adjust quantities and continue to a
            secure checkout experience.
          </p>
        </div>
      </section>

      <section className="cart-main">
        <div className="cart-shell cart-layout">
          <div className="cart-items-panel">
            <div className="cart-panel-heading">
              <div>
                <p>Shopping Cart</p>
                <h2>{items.length} selected gifts</h2>
              </div>

              <a href="/shop">
                Continue shopping
                <Icon type="arrow" />
              </a>
            </div>

            {items.length > 0 ? (
              <div className="cart-list">
                {items.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div
                      className="cart-item-visual"
                      style={{ background: item.gradient }}
                    >
                      <div className="cart-item-object">
                        {item.category.slice(0, 1)}
                      </div>
                    </div>

                    <div className="cart-item-content">
                      <div className="cart-item-top">
                        <div>
                          <p>{item.category}</p>
                          <h3>{item.name}</h3>
                        </div>

                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Icon type="trash" />
                        </button>
                      </div>

                      {item.message && (
                        <div className="cart-message">
                          <Icon type="gift" />
                          <span>{item.message}</span>
                        </div>
                      )}

                      <div className="cart-item-bottom">
                        <div className="cart-quantity">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Icon type="minus" />
                          </button>

                          <strong>{item.quantity}</strong>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Icon type="plus" />
                          </button>
                        </div>

                        <div className="cart-price">
                          <strong>
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                          {item.oldPrice && (
                            <del>
                              ₹
                              {(item.oldPrice * item.quantity).toLocaleString(
                                "en-IN"
                              )}
                            </del>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="cart-empty">
                <div className="cart-empty-icon">
                  <Icon type="bag" />
                </div>
                <h3>Your cart is waiting for something special.</h3>
                <p>
                  Explore our premium collection and add a meaningful gift.
                </p>
                <a href="/shop">
                  Explore collection
                  <Icon type="arrow" />
                </a>
              </div>
            )}
          </div>

          <aside className="cart-summary">
            <span className="cart-kicker">Order Summary</span>
            <h2>Complete your selection</h2>

            <div className="cart-summary-lines">
              <div>
                <span>Subtotal</span>
                <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
              </div>

              <div>
                <span>Shipping</span>
                <strong>
                  {shipping === 0 ? "Complimentary" : `₹${shipping}`}
                </strong>
              </div>

              <div>
                <span>Discount</span>
                <strong>- ₹{discount.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <div className="cart-coupon">
              <label htmlFor="coupon">Gift code or coupon</label>

              <div>
                <input
                  id="coupon"
                  value={coupon}
                  onChange={(event) => {
                    setCoupon(event.target.value);
                    setCouponApplied(false);
                  }}
                  placeholder="Enter code"
                />

                <button
                  type="button"
                  onClick={() =>
                    setCouponApplied(coupon.trim().toUpperCase() === "BGS10")
                  }
                >
                  Apply
                </button>
              </div>

              <p className={couponApplied ? "is-success" : ""}>
                {couponApplied
                  ? "BGS10 applied — 10% off your order."
                  : "Try demo code BGS10"}
              </p>
            </div>

            <div className="cart-total">
              <span>Total</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <a
              href={items.length > 0 ? "/checkout" : "/shop"}
              className="cart-checkout"
            >
              {items.length > 0 ? "Proceed to checkout" : "Start shopping"}
              <Icon type="arrow" />
            </a>

            <div className="cart-trust">
              <span>Secure checkout</span>
              <span>Premium packaging</span>
              <span>Delivery support</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
