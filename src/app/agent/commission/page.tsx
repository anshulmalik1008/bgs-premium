"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  Download,
  Gift,
  Landmark,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import "../agent.css";

type CommissionStatus = "Paid" | "Pending";

type CommissionEntry = {
  id: string;
  orderId: string;
  date: string;
  sale: number;
  rate: number;
  commission: number;
  status: CommissionStatus;
};

const commissionData: CommissionEntry[] = [
  {
    id: "COM-2108",
    orderId: "BGS-1048",
    date: "24 Aug 2026",
    sale: 3499,
    rate: 10,
    commission: 350,
    status: "Pending",
  },
  {
    id: "COM-2107",
    orderId: "BGS-1047",
    date: "24 Aug 2026",
    sale: 4398,
    rate: 10,
    commission: 440,
    status: "Paid",
  },
  {
    id: "COM-2106",
    orderId: "BGS-1046",
    date: "23 Aug 2026",
    sale: 4299,
    rate: 10,
    commission: 430,
    status: "Paid",
  },
  {
    id: "COM-2105",
    orderId: "BGS-1045",
    date: "23 Aug 2026",
    sale: 1899,
    rate: 10,
    commission: 190,
    status: "Paid",
  },
  {
    id: "COM-2104",
    orderId: "BGS-1044",
    date: "22 Aug 2026",
    sale: 5299,
    rate: 10,
    commission: 530,
    status: "Pending",
  },
];

const monthlyData = [
  {
    month: "April",
    sales: 82500,
    commission: 8250,
  },
  {
    month: "May",
    sales: 106800,
    commission: 10680,
  },
  {
    month: "June",
    sales: 129400,
    commission: 12940,
  },
  {
    month: "July",
    sales: 154900,
    commission: 15490,
  },
  {
    month: "August",
    sales: 184750,
    commission: 18475,
  },
];

export default function AgentCommissionPage() {
  const [filter, setFilter] = useState<
    "All" | CommissionStatus
  >("All");

  const filteredEntries = useMemo(() => {
    if (filter === "All") {
      return commissionData;
    }

    return commissionData.filter(
      (entry) => entry.status === filter,
    );
  }, [filter]);

  const totalCommission = commissionData.reduce(
    (total, item) => total + item.commission,
    0,
  );

  const pendingCommission = commissionData
    .filter((item) => item.status === "Pending")
    .reduce(
      (total, item) => total + item.commission,
      0,
    );

  const paidCommission =
    totalCommission - pendingCommission;

  return (
    <main className="agent-commission-page">
      <header className="agent-commission-topbar">
        <div>
          <Link
            href="/agent/dashboard"
            className="agent-orders-back"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <span className="agent-dashboard-kicker">
            Earnings Center
          </span>

          <h1>Commission</h1>

          <p>
            Track earnings, pending settlements and payout
            history.
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

      <section className="agent-commission-summary">
        <article className="agent-commission-hero-card">
          <div className="agent-commission-hero-top">
            <span>
              <WalletCards size={21} />
            </span>

            <p>Available Commission</p>
          </div>

          <strong>
            ₹{paidCommission.toLocaleString("en-IN")}
          </strong>

          <div className="agent-commission-growth">
            <TrendingUp size={15} />
            18.4% growth this month
          </div>

          <button type="button">
            Request payout
            <ArrowUpRight size={16} />
          </button>
        </article>

        <article>
          <span>
            <CircleDollarSign size={20} />
          </span>

          <div>
            <p>Total Commission</p>

            <strong>
              ₹
              {totalCommission.toLocaleString(
                "en-IN",
              )}
            </strong>

            <small>Current payout cycle</small>
          </div>
        </article>

        <article>
          <span>
            <CalendarDays size={20} />
          </span>

          <div>
            <p>Pending</p>

            <strong>
              ₹
              {pendingCommission.toLocaleString(
                "en-IN",
              )}
            </strong>

            <small>Awaiting order completion</small>
          </div>
        </article>

        <article>
          <span>
            <Landmark size={20} />
          </span>

          <div>
            <p>Commission Rate</p>

            <strong>10%</strong>

            <small>Gold Partner tier</small>
          </div>
        </article>
      </section>

      <section className="agent-commission-layout">
        <div className="agent-commission-table-card">
          <div className="agent-section-heading">
            <div>
              <span>Transactions</span>
              <h2>Commission history</h2>
            </div>

            <button
              type="button"
              className="agent-commission-download"
            >
              <Download size={15} />
              Export
            </button>
          </div>

          <div className="agent-commission-filters">
            {(["All", "Paid", "Pending"] as const).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    filter === item
                      ? "active"
                      : ""
                  }
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <div className="agent-commission-table-wrap">
            <table className="agent-commission-table">
              <thead>
                <tr>
                  <th>Commission ID</th>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Sale</th>
                  <th>Rate</th>
                  <th>Commission</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <strong>{entry.id}</strong>
                    </td>

                    <td>{entry.orderId}</td>

                    <td>{entry.date}</td>

                    <td>
                      ₹
                      {entry.sale.toLocaleString(
                        "en-IN",
                      )}
                    </td>

                    <td>{entry.rate}%</td>

                    <td>
                      <strong>
                        ₹
                        {entry.commission.toLocaleString(
                          "en-IN",
                        )}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`agent-commission-status agent-commission-status-${entry.status.toLowerCase()}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="agent-commission-side">
          <article className="agent-monthly-card">
            <span className="agent-dashboard-kicker">
              Performance
            </span>

            <h2>Monthly earnings</h2>

            <div className="agent-monthly-list">
              {monthlyData.map((item) => {
                const width =
                  (item.commission / 18475) * 100;

                return (
                  <div
                    key={item.month}
                    className="agent-month-row"
                  >
                    <div>
                      <strong>{item.month}</strong>

                      <span>
                        ₹
                        {item.sales.toLocaleString(
                          "en-IN",
                        )}{" "}
                        sales
                      </span>
                    </div>

                    <b>
                      ₹
                      {item.commission.toLocaleString(
                        "en-IN",
                      )}
                    </b>

                    <div className="agent-month-bar">
                      <i
                        style={{
                          width: `${width}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="agent-payout-card">
            <span className="agent-dashboard-kicker">
              Payout Account
            </span>

            <h2>Bank settlement</h2>

            <div className="agent-bank-icon">
              <Landmark size={21} />
            </div>

            <p>Primary payout account</p>

            <strong>•••• 4821</strong>

            <small>
              Settlement usually takes 1–3 working
              days.
            </small>

            <Link href="/agent/profile">
              Manage payout details
              <ArrowUpRight size={15} />
            </Link>
          </article>
        </aside>
      </section>
    </main>
  );
}
