"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, occasions, products, type Product } from "./shopData";
import "./shop.css";

type CartItem = Product & {
  quantity: number;
};

const CART_STORAGE_KEY = "bgs_cart_items";
const WISHLIST_STORAGE_KEY = "bgs_wishlist_ids";

function Icon({
  type,
}: {
  type:
    | "search"
    | "heart"
    | "bag"
    | "arrow"
    | "filter"
    | "eye"
    | "close";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "shop-icon",
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

  if (type === "filter") {
    return (
      <svg {...common}>
        <path d="M4 6h16M7 12h10M10 18h4" />
      </svg>
    );
  }

  if (type === "eye") {
    return (
      <svg {...common}>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(CART_STORAGE_KEY);
    return value ? (JSON.parse(value) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function readWishlist(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    return value ? (JSON.parse(value) as number[]) : [];
  } catch {
    return [];
  }
}

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  useEffect(() => {
    setCartItems(readCart());
    setWishlist(readWishlist());
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let list = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesOccasion =
        occasion === "All" || product.occasion === occasion;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.occasion.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesOccasion && matchesSearch;
    });

    if (sort === "low") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [category, occasion, search, sort]);

  function addToCart(product: Product) {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);

      const nextItems = existingItem
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
              : item
          )
        : [...current, { ...product, quantity: 1 }];

      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(nextItems)
      );

      return nextItems;
    });

    setAddedProductId(product.id);

    window.setTimeout(() => {
      setAddedProductId(null);
    }, 1400);
  }

  function toggleWishlist(productId: number) {
    setWishlist((current) => {
      const nextWishlist = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];

      window.localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(nextWishlist)
      );

      return nextWishlist;
    });
  }

  function resetFilters() {
    setCategory("All");
    setOccasion("All");
    setSearch("");
    setSort("featured");
  }

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="shop-hero-grid-overlay" />

        <div className="shop-shell shop-hero-grid">
          <div className="shop-hero-copy">
            <span className="shop-kicker">✦ The BGS Collection</span>

            <h1>
              Gifts curated for
              <span>beautiful moments.</span>
            </h1>

            <p>
              Explore premium hampers, flowers, cakes and personalised gifts
              crafted to make every celebration feel thoughtful and memorable.
            </p>

            <label className="shop-search">
              <Icon type="search" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search gifts, occasions or categories"
                aria-label="Search products"
              />

              {search && (
                <button
                  type="button"
                  className="shop-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <Icon type="close" />
                </button>
              )}
            </label>

            <div className="shop-hero-actions">
              <a href="#shop-products" className="shop-primary-link">
                Explore collection
                <Icon type="arrow" />
              </a>

              <Link href="/cart" className="shop-secondary-link">
                View cart
                <span>{cartCount}</span>
              </Link>
            </div>
          </div>

          <div className="shop-visual" aria-hidden="true">
            <div className="shop-visual-glow" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="hero-gift">
              <span>BGS</span>
              <small>LUXURY</small>
            </div>

            <span className="float-tag tag-one">Luxury Hampers</span>
            <span className="float-tag tag-two">Personalised Gifts</span>
            <span className="float-tag tag-three">Premium Flowers</span>
            <span className="float-tag tag-four">Same Day Delivery</span>
          </div>
        </div>
      </section>

      <section className="shop-main" id="shop-products">
        <div className="shop-shell">
          <header className="shop-heading">
            <div>
              <span className="shop-kicker">Curated Catalogue</span>
              <h2>Shop the collection</h2>
              <p>
                {visibleProducts.length} premium{" "}
                {visibleProducts.length === 1 ? "gift" : "gifts"} found
              </p>
            </div>

            <div className="shop-actions">
              <button
                type="button"
                className="mobile-filter-button"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Icon type="filter" />
                Filters
              </button>

              <Link href="/cart" className="cart-chip">
                <Icon type="bag" />

                <span>Cart</span>

                <b>{cartCount}</b>
              </Link>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </header>

          <div className="shop-layout">
            <aside
              className={`filters ${
                mobileFiltersOpen ? "filters-mobile-open" : ""
              }`}
            >
              <div className="filters-mobile-header">
                <div>
                  <strong>Filters</strong>
                  <span>Refine your collection</span>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <Icon type="close" />
                </button>
              </div>

              <div className="filter-title">
                <Icon type="filter" />

                <div>
                  <strong>Discover your gift</strong>
                  <span>Choose category and occasion</span>
                </div>
              </div>

              <div className="filter-group">
                <h3>Categories</h3>

                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={category === item ? "active" : ""}
                    onClick={() => setCategory(item)}
                  >
                    <span>{item}</span>

                    <b>
                      {item === "All"
                        ? products.length
                        : products.filter(
                            (product) => product.category === item
                          ).length}
                    </b>
                  </button>
                ))}
              </div>

              <div className="filter-group">
                <h3>Occasion</h3>

                {occasions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={occasion === item ? "active" : ""}
                    onClick={() => setOccasion(item)}
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="clear-filter-button"
                onClick={resetFilters}
              >
                Clear all filters
              </button>

              <button
                type="button"
                className="apply-filter-button"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {visibleProducts.length} products
              </button>
            </aside>

            {mobileFiltersOpen && (
              <button
                type="button"
                className="filter-backdrop"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filter panel"
              />
            )}

            <div className="products-section">
              <div className="active-filters">
                <span>Category: {category}</span>
                <span>Occasion: {occasion}</span>

                {(category !== "All" ||
                  occasion !== "All" ||
                  search.trim()) && (
                  <button type="button" onClick={resetFilters}>
                    Reset
                  </button>
                )}
              </div>

              {visibleProducts.length > 0 ? (
                <div className="products-grid">
                  {visibleProducts.map((product) => {
                    const liked = wishlist.includes(product.id);
                    const added = addedProductId === product.id;

                    return (
                      <article className="product-card" key={product.id}>
                        <div
                          className="product-visual"
                          style={{ background: product.gradient }}
                        >
                          <div className="product-light" />

                          {product.badge && (
                            <span className="badge">{product.badge}</span>
                          )}

                          <button
                            type="button"
                            className={`wish ${liked ? "liked" : ""}`}
                            onClick={() => toggleWishlist(product.id)}
                            aria-label={
                              liked
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                          >
                            <Icon type="heart" />
                          </button>

                          <Link
                            href={`/product/${product.id}`}
                            className="product-visual-link"
                            aria-label={`Open ${product.name}`}
                          >
                            <div className="product-object">
                              <span>{product.category[0]}</span>
                              <small>BGS</small>
                            </div>
                          </Link>

                          <Link
                            href={`/product/${product.id}`}
                            className="quick-view-link"
                          >
                            <Icon type="eye" />
                            Quick View
                          </Link>
                        </div>

                        <div className="product-info">
                          <div className="product-meta">
                            <p>{product.category}</p>
                            <span>{product.occasion}</span>
                          </div>

                          <Link
                            href={`/product/${product.id}`}
                            className="product-title-link"
                          >
                            <h3>{product.name}</h3>
                          </Link>

                          <div className="rating">
                            <span>★</span>
                            <strong>{product.rating}</strong>
                            <small>Verified</small>
                          </div>

                          <div className="product-bottom">
                            <div className="product-price">
                              <strong>
                                ₹{product.price.toLocaleString("en-IN")}
                              </strong>

                              {product.oldPrice && (
                                <del>
                                  ₹
                                  {product.oldPrice.toLocaleString("en-IN")}
                                </del>
                              )}
                            </div>

                            <button
                              type="button"
                              className={`add-cart-button ${
                                added ? "added" : ""
                              }`}
                              onClick={() => addToCart(product)}
                            >
                              <Icon type="bag" />

                              {added ? "Added" : "Add"}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="shop-empty">
                  <div className="shop-empty-icon">✦</div>

                  <h3>No matching gifts found</h3>

                  <p>
                    Try changing your search, category or occasion filters.
                  </p>

                  <button type="button" onClick={resetFilters}>
                    View all gifts
                    <Icon type="arrow" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
