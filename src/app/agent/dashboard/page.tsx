"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  ArrowRight,
  ChevronRight,
  CircleDollarSign,
  Gift,
  Menu,
  PackageCheck,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";

import "../agent.css";

const orders = [
  { id: "BGS-1048", customer: "Riya Sharma", product: "Royal Celebration Hamper", amount: 3499, status: "Processing", date: "24 Aug 2026" },
  { id: "BGS-1047", customer: "Karan Mehta", product: "Luxury Flowers", amount: 2199, status: "Delivered", date: "24 Aug 2026" },
  { id: "BGS-1046", customer: "Aarav Singh", product: "Corporate Gift Box", amount: 4299, status: "Confirmed", date: "23 Aug 2026" },
  { id: "BGS-1045", customer: "Neha Kapoor", product: "Designer Cake", amount: 1899, status: "Delivered", date: "23 Aug 2026" },
];

const navItems = [
  { label: "Dashboard", href: "/agent/dashboard" },
  { label: "Orders", href: "/agent/orders" },
  { label: "Customers", href: "/agent/customers" },
  { label: "Commission", href: "/agent/commission" },
  { label: "Profile", href: "/agent/profile" },
];

export default function AgentDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter((order) =>
      [order.id, order.customer, order.product, order.status].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [search]);

  return (
    <main className="agent-dashboard-page">
      <aside className={`agent-sidebar ${sidebarOpen ? "agent-sidebar-open" : ""}`}>
        <div className="agent-sidebar-brand">
          <div className="agent-brand-icon">
            <Gift size={21} />
          </div>

          <div>
            <strong>BGS Luxury</strong>
            <span>Agent Portal</span>
          </div>

          <button
            type="button"
            className="agent-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="agent-sidebar-nav">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={item.label === "Dashboard" ? "agent-nav-link active" : "agent-nav-link"}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <ChevronRight size={15} />
            </Link>
          ))}
        </nav>

        <div className="agent-sidebar-card">
          <Sparkles size={18} />
          <p>Agent Tier</p>
          <h3>Gold Partner</h3>
          <span>Next level at ₹2,50,000 sales</span>

          <div className="agent-tier-bar">
            <i style={{ width: "68%" }} />
          </div>
        </div>

        <div className="agent-sidebar-footer">
          <UserRound size={16} />
          <div>
            <strong>Agent Account</strong>
            <span>Authorised user</span>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="agent-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <section className="agent-dashboard-content">
        <header className="agent-dashboard-header">
          <div className="agent-dashboard-header-left">
            <button
              type="button"
              className="agent-menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div>
              <span className="agent-dashboard-kicker">Agent Workspace</span>
              <h1>Good afternoon.</h1>
            </div>
          </div>

          <div className="agent-dashboard-header-actions">
            <label className="agent-dashboard-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search orders or customers"
              />
            </label>

            <button type="button" className="agent-round-button">
              <Bell size={17} />
              <span />
            </button>

            <Link href="/agent/profile" className="agent-profile-chip">
              <div className="agent-profile-avatar">AM</div>
              <div>
                <strong>Agent</strong>
                <span>Gold Partner</span>
              </div>
            </Link>
          </div>
        </header>

        <section className="agent-dashboard-hero">
          <div>
            <span className="agent-dashboard-pill">
              <Sparkles size={13} />
              Performance Overview
            </span>

            <h2>
              Manage sales,
              <span>customers and earnings.</span>
            </h2>

            <p>
              Track your latest orders, monitor sales and stay updated with your
              commission from one workspace.
            </p>
          </div>

          <div className="agent-hero-performance">
            <span>This month</span>
            <strong>₹1,84,750</strong>
            <p>
              <TrendingUp size={15} />
              18.4% growth
            </p>
          </div>
        </section>

        <section className="agent-stats-grid">
          <article className="agent-stat-card">
            <div className="agent-stat-icon"><ShoppingBag size={20} /></div>
            <p>Total Orders</p>
            <h3>148</h3>
            <span>+12 this week</span>
          </article>

          <article className="agent-stat-card">
            <div className="agent-stat-icon"><PackageCheck size={20} /></div>
            <p>Completed Orders</p>
            <h3>126</h3>
            <span>85% completion</span>
          </article>

          <article className="agent-stat-card">
            <div className="agent-stat-icon"><UsersRound size={20} /></div>
            <p>Customers</p>
            <h3>93</h3>
            <span>+8 this month</span>
          </article>

          <article className="agent-stat-card">
            <div className="agent-stat-icon"><CircleDollarSign size={20} /></div>
            <p>Commission</p>
            <h3>₹18,475</h3>
            <span>10% current rate</span>
          </article>
        </section>

        <section className="agent-dashboard-grid">
          <div className="agent-orders-card">
            <div className="agent-section-heading">
              <div>
                <span>Latest Activity</span>
                <h2>Recent orders</h2>
              </div>

              <Link href="/agent/orders">
                View all
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="agent-orders-table-wrap">
              <table className="agent-orders-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.id}</strong>
                        <span>{order.date}</span>
                      </td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>₹{order.amount.toLocaleString("en-IN")}</td>
                      <td>
                        <span className={`agent-status agent-status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <Link href={`/agent/orders/${order.id}`}>
                          <ChevronRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="agent-side-stack">
            <article className="agent-commission-card">
              <div className="agent-section-heading">
                <div>
                  <span>Earnings</span>
                  <h2>Commission</h2>
                </div>
                <WalletCards size={20} />
              </div>

              <div className="agent-commission-amount">
                <span>Available</span>
                <strong>₹18,475</strong>
              </div>

              <div className="agent-commission-row">
                <span>This month</span>
                <strong>₹11,420</strong>
              </div>

              <div className="agent-commission-row">
                <span>Pending</span>
                <strong>₹3,280</strong>
              </div>

              <Link href="/agent/commission">
                View earnings
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="agent-quick-card">
              <span className="agent-dashboard-kicker">Quick Actions</span>
              <h2>Keep work moving.</h2>

              <Link href="/agent/orders">
                <ShoppingBag size={17} />
                Manage orders
                <ChevronRight size={15} />
              </Link>

              <Link href="/agent/customers">
                <UsersRound size={17} />
                View customers
                <ChevronRight size={15} />
              </Link>
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}
