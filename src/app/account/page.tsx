"use client";

import { useMemo, useState } from "react";
import "./account.css";

type AccountTab =
  | "overview"
  | "orders"
  | "addresses"
  | "wishlist"
  | "profile";

type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped";
  total: number;
  items: number;
  product: string;
  gradient: string;
};

const orders: Order[] = [
  {
    id: "BGS-482913",
    date: "28 Jul 2026",
    status: "Delivered",
    total: 3499,
    items: 1,
    product: "Royal Celebration Hamper",
    gradient: "linear-gradient(145deg,#fffdf7,#ead7b2,#bc8834)",
  },
  {
    id: "BGS-473182",
    date: "14 Jul 2026",
    status: "Shipped",
    total: 2199,
    items: 1,
    product: "Blush Flower Story",
    gradient: "linear-gradient(145deg,#fffaf7,#ebd0c9,#c17f6c)",
  },
  {
    id: "BGS-462701",
    date: "02 Jul 2026",
    status: "Processing",
    total: 2899,
    items: 1,
    product: "Personalised Memory Box",
    gradient: "linear-gradient(145deg,#fff9f5,#e7cec4,#b97861)",
  },
];

function Icon({
  type,
}: {
  type:
    | "user"
    | "bag"
    | "location"
    | "heart"
    | "settings"
    | "arrow"
    | "logout"
    | "edit"
    | "gift";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "account-icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "user") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
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

  if (type === "location") {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
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

  if (type === "settings") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 13.5v-3l-2-.7-.7-1.7.9-1.9-2.1-2.1-1.9.9-1.7-.7L10.5 2h-3l-.7 2.3-1.7.7-1.9-.9L1.1 6.2l.9 1.9-.7 1.7L0 10.5v3l2.3.7.7 1.7-.9 1.9 2.1 2.1 1.9-.9 1.7.7.7 2.3h3l.7-2.3 1.7-.7 1.9.9 2.1-2.1-.9-1.9.7-1.7 2.3-.7Z" transform="translate(2 0) scale(.83)" />
      </svg>
    );
  }

  if (type === "logout") {
    return (
      <svg {...common}>
        <path d="M10 4H5v16h5" />
        <path d="m14 8 4 4-4 4M18 12H9" />
      </svg>
    );
  }

  if (type === "edit") {
    return (
      <svg {...common}>
        <path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z" />
        <path d="m13.5 7 3.5 3.5" />
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

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("overview");

  const stats = useMemo(
    () => [
      { value: "03", label: "Total Orders" },
      { value: "02", label: "Saved Addresses" },
      { value: "08", label: "Wishlist Items" },
    ],
    []
  );

  const tabs: Array<{
    id: AccountTab;
    label: string;
    icon:
      | "user"
      | "bag"
      | "location"
      | "heart"
      | "settings";
  }> = [
    { id: "overview", label: "Overview", icon: "user" },
    { id: "orders", label: "My Orders", icon: "bag" },
    { id: "addresses", label: "Addresses", icon: "location" },
    { id: "wishlist", label: "Wishlist", icon: "heart" },
    { id: "profile", label: "Profile Settings", icon: "settings" },
  ];

  return (
    <main className="account-page">
      <section className="account-hero">
        <div className="account-grid-overlay" />

        <div className="account-shell account-hero-grid">
          <div>
            <span className="account-kicker">✦ My BGS Account</span>

            <h1>
              Your gifting world,
              <span>all in one place.</span>
            </h1>

            <p>
              Track orders, manage saved addresses, revisit favourites and
              keep your profile details up to date.
            </p>
          </div>

          <div className="account-profile-card">
            <div className="account-profile-avatar">AM</div>

            <div>
              <p>Welcome back</p>
              <h2>Anshul Malik</h2>
              <span>Premium Member</span>
            </div>

            <button type="button">
              <Icon type="edit" />
              Edit
            </button>
          </div>
        </div>
      </section>

      <section className="account-main">
        <div className="account-shell account-layout">
          <aside className="account-sidebar">
            <div className="account-sidebar-profile">
              <div className="account-sidebar-avatar">AM</div>

              <div>
                <strong>Anshul Malik</strong>
                <span>anshul@example.com</span>
              </div>
            </div>

            <nav className="account-navigation">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={activeTab === tab.id ? "is-active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon type={tab.icon} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            <button type="button" className="account-logout">
              <Icon type="logout" />
              Log out
            </button>
          </aside>

          <div className="account-content">
            {activeTab === "overview" && (
              <>
                <section className="account-welcome">
                  <div>
                    <span className="account-kicker">Account Overview</span>
                    <h2>Good morning, Anshul.</h2>
                    <p>
                      Here is a quick look at your recent gifting activity.
                    </p>
                  </div>

                  <a href="/shop">
                    Shop new gifts
                    <Icon type="arrow" />
                  </a>
                </section>

                <section className="account-stats">
                  {stats.map((stat) => (
                    <article key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </article>
                  ))}
                </section>

                <section className="account-section">
                  <div className="account-section-heading">
                    <div>
                      <p>Recent Activity</p>
                      <h3>Latest orders</h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("orders")}
                    >
                      View all
                      <Icon type="arrow" />
                    </button>
                  </div>

                  <div className="account-orders-list">
                    {orders.slice(0, 2).map((order) => (
                      <article key={order.id}>
                        <div
                          className="account-order-visual"
                          style={{ background: order.gradient }}
                        >
                          {order.product.slice(0, 1)}
                        </div>

                        <div className="account-order-copy">
                          <p>{order.id}</p>
                          <h4>{order.product}</h4>
                          <span>{order.date}</span>
                        </div>

                        <div className="account-order-status">
                          <span
                            className={`status-${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                          <strong>
                            ₹{order.total.toLocaleString("en-IN")}
                          </strong>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="account-shortcuts">
                  <article>
                    <Icon type="gift" />
                    <h3>Need a gift suggestion?</h3>
                    <p>
                      Let our concierge help you choose something meaningful.
                    </p>
                    <a href="/gift-finder">
                      Open Gift Finder
                      <Icon type="arrow" />
                    </a>
                  </article>

                  <article>
                    <Icon type="heart" />
                    <h3>Return to your favourites</h3>
                    <p>
                      Revisit saved products and move them to your cart.
                    </p>
                    <a href="/wishlist">
                      View Wishlist
                      <Icon type="arrow" />
                    </a>
                  </article>
                </section>
              </>
            )}

            {activeTab === "orders" && (
              <section className="account-section full-section">
                <div className="account-section-heading">
                  <div>
                    <p>Order History</p>
                    <h3>My orders</h3>
                  </div>
                </div>

                <div className="account-orders-list">
                  {orders.map((order) => (
                    <article key={order.id}>
                      <div
                        className="account-order-visual"
                        style={{ background: order.gradient }}
                      >
                        {order.product.slice(0, 1)}
                      </div>

                      <div className="account-order-copy">
                        <p>{order.id}</p>
                        <h4>{order.product}</h4>
                        <span>
                          {order.date} · {order.items} item
                        </span>
                      </div>

                      <div className="account-order-status">
                        <span
                          className={`status-${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                        <strong>
                          ₹{order.total.toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "addresses" && (
              <section className="account-section full-section">
                <div className="account-section-heading">
                  <div>
                    <p>Saved Locations</p>
                    <h3>Delivery addresses</h3>
                  </div>

                  <button type="button">
                    Add new address
                    <Icon type="arrow" />
                  </button>
                </div>

                <div className="account-address-grid">
                  {[
                    {
                      label: "Home",
                      address:
                        "123, Raj Nagar Extension, Ghaziabad, Uttar Pradesh - 201017",
                    },
                    {
                      label: "Office",
                      address:
                        "Sector 62, Noida, Uttar Pradesh - 201309",
                    },
                  ].map((item) => (
                    <article key={item.label}>
                      <div className="account-address-icon">
                        <Icon type="location" />
                      </div>

                      <h4>{item.label}</h4>
                      <p>{item.address}</p>

                      <button type="button">
                        <Icon type="edit" />
                        Edit address
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "wishlist" && (
              <section className="account-section full-section account-linked-panel">
                <div className="account-linked-icon">
                  <Icon type="heart" />
                </div>

                <h3>Your saved gifts are waiting.</h3>

                <p>
                  Open your wishlist to review favourites and add them to cart.
                </p>

                <a href="/wishlist">
                  Open wishlist
                  <Icon type="arrow" />
                </a>
              </section>
            )}

            {activeTab === "profile" && (
              <section className="account-section full-section">
                <div className="account-section-heading">
                  <div>
                    <p>Personal Information</p>
                    <h3>Profile settings</h3>
                  </div>
                </div>

                <div className="account-profile-form">
                  <label>
                    <span>Full name</span>
                    <input defaultValue="Anshul Malik" />
                  </label>

                  <label>
                    <span>Email address</span>
                    <input
                      type="email"
                      defaultValue="anshul@example.com"
                    />
                  </label>

                  <label>
                    <span>Mobile number</span>
                    <input defaultValue="+91 98765 43210" />
                  </label>

                  <label>
                    <span>Date of birth</span>
                    <input type="date" defaultValue="2002-08-14" />
                  </label>

                  <button type="button">
                    Save changes
                    <Icon type="arrow" />
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
