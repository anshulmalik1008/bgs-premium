"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "./productData";
import "./product.css";

type CartItem = ReturnType<typeof getProduct> & {
  quantity: number;
};

const CART_KEY = "bgs_cart_items";
const WISHLIST_KEY = "bgs_wishlist_ids";

function Icon({
  type,
}: {
  type:
    | "heart"
    | "bag"
    | "minus"
    | "plus"
    | "arrow"
    | "truck"
    | "shield"
    | "gift"
    | "star"
    | "calendar";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "product-icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "heart") {
    return <svg {...common}><path d="M12 21s-7-4.35-9.4-8.3C.6 9.4 2.15 5 6.2 5c2.2 0 3.45 1.25 4.15 2.35C11.05 6.25 12.3 5 14.5 5c4.05 0 5.6 4.4 3.6 7.7C15.7 16.65 12 21 12 21Z"/></svg>;
  }

  if (type === "bag") {
    return <svg {...common}><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
  }

  if (type === "minus") {
    return <svg {...common}><path d="M5 12h14"/></svg>;
  }

  if (type === "plus") {
    return <svg {...common}><path d="M5 12h14M12 5v14"/></svg>;
  }

  if (type === "arrow") {
    return <svg {...common}><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></svg>;
  }

  if (type === "truck") {
    return <svg {...common}><path d="M3 6h11v10H3Z"/><path d="M14 10h4l3 3v3h-7Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
  }

  if (type === "shield") {
    return <svg {...common}><path d="M12 3 5 6v5c0 5 3.2 8 7 10 3.8-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
  }

  if (type === "gift") {
    return <svg {...common}><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5V9Z"/></svg>;
  }

  if (type === "calendar") {
    return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
  }

  return <svg {...common}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></svg>;
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function readWishlist(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const product = useMemo(() => getProduct(Number(params.id)), [params.id]);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(true);
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<"details" | "story" | "delivery">("details");

  function addToCart() {
    const cart = readCart();
    const existing = cart.find((item) => item.id === product.id);

    const next = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
            : item
        )
      : [...cart, { ...product, quantity }];

    window.localStorage.setItem(CART_KEY, JSON.stringify(next));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  function toggleWishlist() {
    const current = readWishlist();
    const next = current.includes(product.id)
      ? current.filter((id) => id !== product.id)
      : [...current, product.id];

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setWishlist(next.includes(product.id));
  }

  return (
    <main className="product-page">
      <section className="product-hero">
        <div className="product-grid-overlay" />

        <div className="product-shell product-layout">
          <div className="product-gallery">
            <div
              className="product-main-visual"
              style={{ background: product.gradient }}
            >
              <span className="product-badge">{product.badge}</span>

              <button
                type="button"
                className={`product-heart ${wishlist ? "is-active" : ""}`}
                onClick={toggleWishlist}
                aria-label="Toggle wishlist"
              >
                <Icon type="heart" />
              </button>

              <div className="product-orbit product-orbit-one" />
              <div className="product-orbit product-orbit-two" />
              <div className="product-orbit product-orbit-three" />

              <div className="product-sculpture">
                <span>{product.gallery[activeImage]}</span>
                <small>BGS LUXURY</small>
              </div>

              <span className="product-float product-float-one">
                Premium Packaging
              </span>

              <span className="product-float product-float-two">
                Personalised Note
              </span>
            </div>

            <div className="product-thumbnails">
              {product.gallery.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={activeImage === index ? "is-active" : ""}
                  onClick={() => setActiveImage(index)}
                  style={{ background: product.gradient }}
                >
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          <aside className="product-purchase">
            <p className="product-category">{product.category}</p>

            <h1>{product.name}</h1>

            <div className="product-rating">
              <Icon type="star" />
              <strong>{product.rating}</strong>
              <span>{product.reviews} verified reviews</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-price">
              <strong>₹{product.price.toLocaleString("en-IN")}</strong>

              {product.oldPrice && (
                <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
              )}

              {product.oldPrice && (
                <span>
                  Save ₹
                  {(product.oldPrice - product.price).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <div className="product-selector">
              <div>
                <span>Quantity</span>
                <small>Maximum 10</small>
              </div>

              <div className="product-quantity">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                >
                  <Icon type="minus" />
                </button>

                <strong>{quantity}</strong>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.min(10, value + 1))
                  }
                >
                  <Icon type="plus" />
                </button>
              </div>
            </div>

            <label className="product-gift-wrap">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(event) => setGiftWrap(event.target.checked)}
              />

              <Icon type="gift" />

              <div>
                <strong>Luxury gift wrapping</strong>
                <span>Premium box, ribbon and note card</span>
              </div>

              <b>₹149</b>
            </label>

            <label className="product-message">
              <span>Personal gift message</span>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={180}
                placeholder="Write something meaningful..."
              />

              <small>{message.length}/180</small>
            </label>

            <label className="product-date">
              <Icon type="calendar" />

              <div>
                <span>Preferred delivery date</span>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(event) => setDeliveryDate(event.target.value)}
                />
              </div>
            </label>

            <div className="product-actions">
              <button
                type="button"
                className={`product-add ${added ? "is-added" : ""}`}
                onClick={addToCart}
              >
                <Icon type="bag" />
                {added ? "Added to cart" : "Add to cart"}
              </button>

              <a href="/checkout" className="product-buy">
                Buy now
                <Icon type="arrow" />
              </a>
            </div>

            <div className="product-assurance">
              <article>
                <Icon type="truck" />
                <div>
                  <strong>Premium delivery</strong>
                  <span>Handled with care</span>
                </div>
              </article>

              <article>
                <Icon type="shield" />
                <div>
                  <strong>Secure purchase</strong>
                  <span>Protected checkout</span>
                </div>
              </article>

              <article>
                <Icon type="gift" />
                <div>
                  <strong>Gift-ready</strong>
                  <span>Luxury finish included</span>
                </div>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section className="product-details">
        <div className="product-shell">
          <div className="product-tabs">
            {[
              { id: "details", label: "Product Details" },
              { id: "story", label: "The Story" },
              { id: "delivery", label: "Delivery & Care" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={tab === item.id ? "is-active" : ""}
                onClick={() => setTab(item.id as typeof tab)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "details" && (
            <div className="product-detail-grid">
              <div className="product-detail-copy">
                <span className="product-kicker">What makes it special</span>
                <h2>Designed as a complete gifting experience.</h2>
                <p>{product.story}</p>
              </div>

              <article className="product-list-card">
                <h3>Signature features</h3>
                <ul>
                  {product.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </article>

              <article className="product-list-card">
                <h3>Inside the gift</h3>
                <ul>
                  {product.includes.map((item) => (
                    <li key={item}>✦ {item}</li>
                  ))}
                </ul>
              </article>
            </div>
          )}

          {tab === "story" && (
            <div className="product-story-panel">
              <span className="product-kicker">The BGS Story</span>
              <h2>Created to feel personal, polished and memorable.</h2>
              <p>{product.story}</p>
            </div>
          )}

          {tab === "delivery" && (
            <div className="product-story-panel">
              <span className="product-kicker">Delivery & Care</span>
              <h2>Every detail is protected from our studio to their door.</h2>
              <p>
                Delivery availability depends on location and product type.
                Final delivery estimates appear at checkout after entering the
                recipient address.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="product-related">
        <div className="product-shell">
          <div className="product-related-heading">
            <div>
              <span className="product-kicker">Continue Exploring</span>
              <h2>You may also love</h2>
            </div>

            <a href="/shop">
              View all gifts
              <Icon type="arrow" />
            </a>
          </div>

          <div className="product-related-grid">
            {[
              ["Blush Flower Story", "₹2,199", "#ead0c9"],
              ["Memory Keepsake Box", "₹2,899", "#dec8be"],
              ["Golden Celebration Cake", "₹1,899", "#dec99e"],
            ].map(([name, price, color], index) => (
              <article key={name}>
                <div
                  className="product-related-visual"
                  style={{
                    background: `linear-gradient(145deg,#fff,${color})`,
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>

                <p>Signature Collection</p>
                <h3>{name}</h3>
                <strong>{price}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
