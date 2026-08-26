"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Gift,
  Mail,
  Phone,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";

import "../agent.css";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpend: number;
  lastOrder: string;
  status: "Active" | "VIP" | "New";
};

const customers: Customer[] = [
  {
    id: 1,
    name: "Riya Sharma",
    email: "riya@example.com",
    phone: "+91 98765 43210",
    orders: 8,
    totalSpend: 28450,
    lastOrder: "24 Aug 2026",
    status: "VIP",
  },
  {
    id: 2,
    name: "Karan Mehta",
    email: "karan@example.com",
    phone: "+91 98111 22334",
    orders: 5,
    totalSpend: 17490,
    lastOrder: "24 Aug 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Aarav Singh",
    email: "aarav@example.com",
    phone: "+91 99550 11332",
    orders: 3,
    totalSpend: 12899,
    lastOrder: "23 Aug 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    email: "neha@example.com",
    phone: "+91 98989 56565",
    orders: 1,
    totalSpend: 1899,
    lastOrder: "23 Aug 2026",
    status: "New",
  },
];

export default function AgentCustomersPage() {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return customers;

    return customers.filter((customer) =>
      [
        customer.name,
        customer.email,
        customer.phone,
        customer.status,
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [search]);

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.totalSpend,
    0,
  );

  return (
    <main className="agent-customers-page">
      <header className="agent-customers-topbar">
        <div>
          <Link
            href="/agent/dashboard"
            className="agent-orders-back"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <span className="agent-dashboard-kicker">
            Customer Management
          </span>

          <h1>Customers</h1>

          <p>
            Track customer activity, total spend and order history.
          </p>
        </div>

        <Link
          href="/agent/dashboard"
          className="agent-orders-brand"
        >
          <span>
            <Gift size={18} />
          </span>

          <div>
            <strong>BGS Luxury</strong>
            <small>Agent Portal</small>
          </div>
        </Link>
      </header>

      <section className="agent-customer-stats">
        <article>
          <span>
            <UsersRound size={19} />
          </span>

          <div>
            <p>Total Customers</p>
            <strong>{customers.length}</strong>
          </div>
        </article>

        <article>
          <span>
            <UserRound size={19} />
          </span>

          <div>
            <p>VIP Customers</p>
            <strong>
              {
                customers.filter(
                  (customer) => customer.status === "VIP",
                ).length
              }
            </strong>
          </div>
        </article>

        <article>
          <span>₹</span>

          <div>
            <p>Customer Revenue</p>
            <strong>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </strong>
          </div>
        </article>
      </section>

      <section className="agent-customers-container">
        <div className="agent-orders-toolbar">
          <div>
            <span className="agent-dashboard-kicker">
              Customer Directory
            </span>

            <h2>All customers</h2>
          </div>

          <label className="agent-order-search">
            <Search size={16} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search name, email or phone..."
            />
          </label>
        </div>

        <div className="agent-customers-grid">
          {filteredCustomers.map((customer) => (
            <article
              key={customer.id}
              className="agent-customer-card"
            >
              <div className="agent-customer-card-top">
                <div className="agent-customer-avatar">
                  {customer.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <span
                  className={`agent-customer-status agent-customer-status-${customer.status.toLowerCase()}`}
                >
                  {customer.status}
                </span>
              </div>

              <h3>{customer.name}</h3>

              <div className="agent-customer-contact">
                <p>
                  <Mail size={14} />
                  {customer.email}
                </p>

                <p>
                  <Phone size={14} />
                  {customer.phone}
                </p>
              </div>

              <div className="agent-customer-metrics">
                <div>
                  <span>Orders</span>
                  <strong>{customer.orders}</strong>
                </div>

                <div>
                  <span>Total Spend</span>
                  <strong>
                    ₹
                    {customer.totalSpend.toLocaleString(
                      "en-IN",
                    )}
                  </strong>
                </div>

                <div>
                  <span>Last Order</span>
                  <strong>{customer.lastOrder}</strong>
                </div>
              </div>

              <Link
                href={`/agent/customers/${customer.id}`}
                className="agent-customer-open"
              >
                View customer
                <ChevronRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
