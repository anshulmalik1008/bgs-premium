"use client";

import { useEffect, useMemo, useState } from "react";
import "./wishlist.css";

type WishlistProduct = {
  id: number;
  name: string;
  category: string;
  occasion: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge?: string;
  gradient: string;
};

type CartItem = WishlistProduct & {
  quantity: number;
};

const WISHLIST_STORAGE_KEY = "bgs_wishlist_ids";
const CART_STORAGE_KEY = "bgs_cart_items";

const allProducts: WishlistProduct[] = [
  {
    id: 1,
    name: "Royal Celebration Hamper",
    category: "Luxury Hampers",
    occasion: "Birthday",
    price: 3499,
    oldPrice: 3999,
    rating: 4.9,
    badge: "Bestseller",
    gradient: "linear-gradient(145deg,#fffdf7,#ead7b2,#bc8834)",
  },
  {
    id: 2,
    name: "Blush Flower Story",
    category: "Flowers",
    occasion: "Anniversary",
    price: 2199,
    rating: 4.8,
    badge: "Fresh Today",
    gradient: "linear-gradient(145deg,#fffaf7,#ebd0c9,#c17f6c)",
  },
  {
    id: 3,
    name: "Personalised Memory Box",
    category: "Personalised",
    occasion: "Just Because",
    price: 2899,
    oldPrice: 3299,
    rating: 4.9,
    badge: "Made For You",
    gradient: "linear-gradient(145deg,#fff9f5,#e7cec4,#b97861)",
  },
  {
    id: 4,
    name: "Golden Celebration Cake",
    category: "Cakes",
    occasion: "Birthday",
    price: 1899,
    rating: 5,
    badge: "Celebration",
    gradient: "linear-gradient(145deg,#fffaf2,#e8dac1,#b59058)",
  },
  {
    id: 5,
    name: "Executive Signature Box",
    category: "Corporate",
    occasion: "Corporate",
    price: 4299,
    rating: 4.9,
    badge: "Executive Edit",
    gradient: "linear-gradient(145deg,#fffefa,#ded8ce,#9d8a6d)",
  },
  {
    id: 6,
    name: "Forever Rose Keepsake",
    category: "Flowers",
    occasion: "Anniversary",
    price: 2499,
    rating: 4.8,
    gradient: "linear-gradient(145deg,#fff8f7,#e9cfc9,#b77b70)",
  },
  {
    id: 7,
    name: "Coffee & Comfort Edit",
    category: "Luxury Hampers",
    occasion: "Just Because",
    price: 2599,
    rating: 4.7,
    gradient: "linear-gradient(145deg,#fffaf4,#e3d4c2,#a77855)",
  },
  {
    id: 8,
    name: "Wedding Treasure Chest",
    category: "Personalised",
    occasion: "Wedding",
    price: 4999,
    oldPrice: 5499,
    rating: 4.9,
    badge: "Wedding Edit",
    gradient: "linear-gradient(145deg,#fffdf8,#eadfc4,#c5a45f)",
  },
  {
    id: 9,
    name: "Midnight Chocolate Vault",
    category: "Luxury Hampers",
    occasion: "Birthday",
    price: 3199,
    rating: 4.8,
    badge: "Limited",
    gradient: "linear-gradient(145deg,#f7f2ea,#9c8264,#33261e)",
  },
];

function Icon({
  type,
}: {
  type: "heart" | "bag" | "arrow" | "trash" | "spark";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "wishlist-icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "heart") {
    return (
      <svg {...common}>
        <path d="M12 21s-7-4.35-9.4-8.3C.6 9.4 2.15 5 6.2 5c2.2 0 3.45 1.25 4.15 2.35C11.05 6.25 12.3 5 14.5 5c4.05 0 5.6 4.4 3.6 7.7C15.7 16.65 12 21 12 21Z" />
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

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
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

  return (
    <svg {...common}>
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
  );
}

function readWishlistIds(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
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

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);

  useEffect(() => {
    setWishlistIds(readWishlistIds());
    setCartItems(readCart());
  }, []);

  const wishlistProducts = useMemo(
    () => allProducts.filter((product) => wishlistIds.includes(product.id)),
    [wishlistIds]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  function removeFromWishlist(productId: number) {
    setWishlistIds((current) => {
      const next = current.filter((id) => id !== productId);

      window.localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(next)
      );

      return next;
    });
  }

  function addToCart(product: WishlistProduct) {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      const next = existing
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
              : item
          )
        : [...current, { ...product, quantity: 1 }];

      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    setAddedId(product.id);

    window.setTimeout(() => {
      setAddedId(null);
    }, 1300);
  }

  function moveAllToCart() {
    wishlistProducts.forEach((product) => addToCart(product));
  }

  function clearWishlist() {
    setWishlistIds([]);
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify([]));
  }

  return (
    <main className="wishlist-page">
      <section className="wishlist-hero">
        <div className="wishlist-grid-overlay" />

        <div className="wishlist-shell wishlist-hero-grid">
          <div>
            <span className="wishlist-kicker">✦ Your Saved Collection</span>

            <h1>
              Gifts you
              <span>fell in love with.</span>
            </h1>

            <p>
              Keep your favourite discoveries together and move them to your
              cart whenever the moment feels right.
            </p>

            <div className="wishlist-hero-actions">
              <a href="/shop" className="wishlist-primary-link">
                Continue exploring
                <Icon type="arrow" />
              </a>

              <a href="/cart" className="wishlist-cart-link">
                <Icon type="bag" />
                Cart
                <b>{cartCount}</b>
              </a>
            </div>
          </div>

          <div className="wishlist-visual" aria-hidden="true">
            <div className="wishlist-glow" />
            <div className="wishlist-orbit wishlist-orbit-one" />
            <div className="wishlist-orbit wishlist-orbit-two" />

            <div className="wishlist-heart-sculpture">
              <Icon type="heart" />
              <span>BGS</span>
            </div>

            <span className="wishlist-float wishlist-float-one">
              Saved with care
            </span>

            <span className="wishlist-float wishlist-float-two">
              Ready when you are
            </span>
          </div>
        </div>
      </section>

      <section className="wishlist-main">
        <div className="wishlist-shell">
          <header className="wishlist-heading">
            <div>
              <span className="wishlist-kicker">Personal Selection</span>

              <h2>My wishlist</h2>

              <p>
                {wishlistProducts.length}{" "}
                {wishlistProducts.length === 1 ? "gift" : "gifts"} saved
              </p>
            </div>

            {wishlistProducts.length > 0 && (
              <div className="wishlist-heading-actions">
                <button type="button" onClick={clearWishlist}>
                  <Icon type="trash" />
                  Clear all
                </button>

                <button
                  type="button"
                  className="wishlist-move-all"
                  onClick={moveAllToCart}
                >
                  <Icon type="bag" />
                  Move all to cart
                </button>
              </div>
            )}
          </header>

          {wishlistProducts.length > 0 ? (
            <div className="wishlist-grid">
              {wishlistProducts.map((product) => {
                const added = addedId === product.id;

                return (
                  <article className="wishlist-card" key={product.id}>
                    <div
                      className="wishlist-card-visual"
                      style={{ background: product.gradient }}
                    >
                      <div className="wishlist-card-light" />

                      {product.badge && (
                        <span className="wishlist-card-badge">
                          {product.badge}
                        </span>
                      )}

                      <button
                        type="button"
                        className="wishlist-remove"
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label="Remove from wishlist"
                      >
                        <Icon type="trash" />
                      </button>

                      <a
                        href={`/product/${product.id}`}
                        className="wishlist-card-product-link"
                      >
                        <div className="wishlist-card-object">
                          <span>{product.category[0]}</span>
                          <small>BGS</small>
                        </div>
                      </a>
                    </div>

                    <div className="wishlist-card-content">
                      <div className="wishlist-card-meta">
                        <p>{product.category}</p>
                        <span>{product.occasion}</span>
                      </div>

                      <a
                        href={`/product/${product.id}`}
                        className="wishlist-card-title"
                      >
                        <h3>{product.name}</h3>
                      </a>

                      <div className="wishlist-card-rating">
                        <span>★</span>
                        <strong>{product.rating}</strong>
                        <small>Verified</small>
                      </div>

                      <div className="wishlist-card-bottom">
                        <div>
                          <strong>
                            ₹{product.price.toLocaleString("en-IN")}
                          </strong>

                          {product.oldPrice && (
                            <del>
                              ₹{product.oldPrice.toLocaleString("en-IN")}
                            </del>
                          )}
                        </div>

                        <button
                          type="button"
                          className={added ? "is-added" : ""}
                          onClick={() => addToCart(product)}
                        >
                          <Icon type="bag" />
                          {added ? "Added" : "Add to cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">
                <Icon type="heart" />
              </div>

              <span className="wishlist-kicker">Nothing saved yet</span>

              <h2>
                Your wishlist is ready for
                <span>something beautiful.</span>
              </h2>

              <p>
                Browse the collection and tap the heart icon on any product you
                would like to save.
              </p>

              <a href="/shop">
                Explore luxury gifts
                <Icon type="arrow" />
              </a>
            </div>
          )}

          <section className="wishlist-benefits">
            {[
              {
                title: "Save your favourites",
                text: "Keep meaningful discoveries together in one place.",
              },
              {
                title: "Move to cart anytime",
                text: "Add one gift or your complete selection in seconds.",
              },
              {
                title: "Stored on this device",
                text: "Your saved gifts remain available after page reload.",
              },
            ].map((item, index) => (
              <article key={item.title}>
                <div>{String(index + 1).padStart(2, "0")}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}