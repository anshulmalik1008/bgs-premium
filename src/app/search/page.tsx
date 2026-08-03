"use client";

import { useMemo, useState } from "react";
import "./search.css";

type SearchProduct = {
  id: number;
  name: string;
  category: string;
  occasion: string;
  price: number;
  rating: number;
  badge?: string;
  gradient: string;
};

const products: SearchProduct[] = [
  {
    id: 1,
    name: "Royal Celebration Hamper",
    category: "Luxury Hampers",
    occasion: "Birthday",
    price: 3499,
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
    badge: "Executive",
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
    rating: 4.9,
    badge: "Wedding Edit",
    gradient: "linear-gradient(145deg,#fffdf8,#eadfc4,#c5a45f)",
  },
];

const suggestions = [
  "Luxury Hampers",
  "Birthday Gifts",
  "Anniversary Flowers",
  "Personalised Gifts",
  "Corporate Gifting",
  "Wedding Keepsakes",
];

function Icon({
  type,
}: {
  type: "search" | "arrow" | "bag" | "spark" | "close";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "search-icon",
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

  if (type === "bag") {
    return (
      <svg {...common}>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg {...common}>
        <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      </svg>
    );
  }

  if (type === "close") {
    return (
      <svg {...common}>
        <path d="m6 6 12 12M18 6 6 18" />
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

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Luxury Hampers", "Flowers", "Cakes", "Personalised", "Corporate"];

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized) ||
        product.occasion.toLowerCase().includes(normalized);

      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <main className="search-page">
      <section className="search-hero">
        <div className="search-grid-overlay" />

        <div className="search-shell search-hero-grid">
          <div className="search-copy">
            <span className="search-kicker">
              <Icon type="spark" />
              Discover Something Meaningful
            </span>

            <h1>
              Find the perfect gift,
              <span>beautifully fast.</span>
            </h1>

            <p>
              Search by product, occasion or category and explore a refined
              collection made for every memorable moment.
            </p>

            <label className="search-box">
              <Icon type="search" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search hampers, flowers, cakes or occasions"
                autoFocus
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <Icon type="close" />
                </button>
              )}
            </label>

            <div className="search-suggestions">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="search-visual" aria-hidden="true">
            <div className="search-glow" />
            <div className="search-orbit search-orbit-one" />
            <div className="search-orbit search-orbit-two" />

            <div className="search-sculpture">
              <Icon type="search" />
              <span>BGS</span>
            </div>

            <span className="search-float search-float-one">Smart Discovery</span>
            <span className="search-float search-float-two">Curated Results</span>
          </div>
        </div>
      </section>

      <section className="search-main">
        <div className="search-shell">
          <header className="search-results-heading">
            <div>
              <span className="search-kicker">Search Results</span>

              <h2>
                {query ? `Results for “${query}”` : "Explore all gifts"}
              </h2>

              <p>{results.length} products found</p>
            </div>

            <a href="/cart" className="search-cart-link">
              <Icon type="bag" />
              Cart
            </a>
          </header>

          <div className="search-category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "is-active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {results.length > 0 ? (
            <div className="search-results-grid">
              {results.map((product) => (
                <article className="search-card" key={product.id}>
                  <div
                    className="search-card-visual"
                    style={{ background: product.gradient }}
                  >
                    {product.badge && (
                      <span className="search-card-badge">
                        {product.badge}
                      </span>
                    )}

                    <a
                      href={`/product/${product.id}`}
                      className="search-card-object-link"
                    >
                      <div className="search-card-object">
                        <span>{product.category[0]}</span>
                        <small>BGS</small>
                      </div>
                    </a>
                  </div>

                  <div className="search-card-content">
                    <div className="search-card-meta">
                      <p>{product.category}</p>
                      <span>{product.occasion}</span>
                    </div>

                    <a href={`/product/${product.id}`}>
                      <h3>{product.name}</h3>
                    </a>

                    <div className="search-card-rating">
                      <span>★</span>
                      <strong>{product.rating}</strong>
                    </div>

                    <div className="search-card-bottom">
                      <strong>₹{product.price.toLocaleString("en-IN")}</strong>

                      <a href={`/product/${product.id}`}>
                        View product
                        <Icon type="arrow" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="search-empty">
              <div className="search-empty-icon">
                <Icon type="search" />
              </div>

              <span className="search-kicker">No Results</span>

              <h2>We could not find that gift.</h2>

              <p>
                Try another keyword or browse one of the popular suggestions.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
              >
                View all gifts
                <Icon type="arrow" />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
