"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Filter,
  Gift,
  Package,
  RefreshCw,
  Search,
  ShoppingBag,
  Truck,
  UserRound,
} from "lucide-react";

import "../agent.css";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

type ApiProduct = {
  id: number;
  name: string;
  slug?: string;
  images?: unknown;
  price?: string | number;
};

type ApiOrderItem = {
  id: number;
  quantity: number;
  price: string | number;
  productId: number;
  product: ApiProduct;
};

type ApiUser = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
};

type ApiOrder = {
  id: number;
  orderNumber: string;

  status: OrderStatus;
  paymentStatus: PaymentStatus;

  subtotal: string | number;
  shipping: string | number;
  discount: string | number;
  total: string | number;

  giftMessage?: string | null;
  paymentId?: string | null;

  userId: number;
  addressId: number;

  user: ApiUser;

  items: ApiOrderItem[];

  createdAt: string;
  updatedAt: string;
};

type OrdersResponse = {
  success: boolean;
  message?: string;
  orders?: ApiOrder[];
};

const filters = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

type FilterType = (typeof filters)[number];

function statusLabel(status: OrderStatus | FilterType) {
  if (status === "ALL") {
    return "All";
  }

  return (
    status.charAt(0) +
    status.slice(1).toLowerCase()
  );
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function money(value: string | number) {
  return Number(value || 0).toLocaleString("en-IN");
}

export default function AgentOrdersPage() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<FilterType>("ALL");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [updatingOrderId, setUpdatingOrderId] =
    useState<number | null>(null);

  const loadOrders = useCallback(
    async (silent = false) => {
      if (!silent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      try {
        const response = await fetch("/api/orders", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data =
          (await response.json()) as OrdersResponse;

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Orders load nahi ho paaye.",
          );
        }

        setOrders(data.orders ?? []);
      } catch (error) {
        console.error(
          "Agent orders load failed:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Orders load nahi ho paaye.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  async function updateStatus(
    orderId: number,
    status: OrderStatus,
  ) {
    setUpdatingOrderId(orderId);
    setError("");

    const previousOrders = orders;

    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order,
      ),
    );

    try {
      const response = await fetch(
        `/api/orders/${orderId}`,
        {
          method: "PATCH",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Status update nahi ho paaya.",
        );
      }

      if (data.order) {
        setOrders((current) =>
          current.map((order) =>
            order.id === orderId
              ? data.order
              : order,
          ),
        );
      }
    } catch (error) {
      console.error(
        "Order status update failed:",
        error,
      );

      setOrders(previousOrders);

      setError(
        error instanceof Error
          ? error.message
          : "Order status update nahi ho paaya.",
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }

  const filteredOrders = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return orders.filter((order) => {
      const productNames = order.items
        .map((item) => item.product?.name || "")
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        order.orderNumber
          .toLowerCase()
          .includes(query) ||
        order.user?.name
          ?.toLowerCase()
          .includes(query) ||
        order.user?.email
          ?.toLowerCase()
          .includes(query) ||
        productNames.includes(query);

      const matchesFilter =
        filter === "ALL" ||
        order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  const totalValue = useMemo(
    () =>
      orders.reduce(
        (total, order) =>
          total + Number(order.total),
        0,
      ),
    [orders],
  );

  const processingCount = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.status === "PROCESSING",
      ).length,
    [orders],
  );

  const deliveredCount = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.status === "DELIVERED",
      ).length,
    [orders],
  );

  return (
    <main className="agent-orders-page">
      <header className="agent-orders-topbar">
        <div>
          <Link
            href="/agent/dashboard"
            className="agent-orders-back"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <span className="agent-dashboard-kicker">
            Real Order Management
          </span>

          <h1>Orders</h1>

          <p>
            Orders shown here are loaded from
            your MySQL database.
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

      <section className="agent-order-stats">
        <article>
          <span>
            <ShoppingBag size={19} />
          </span>

          <div>
            <p>Total Orders</p>
            <strong>{orders.length}</strong>
          </div>
        </article>

        <article>
          <span>
            <Package size={19} />
          </span>

          <div>
            <p>Processing</p>
            <strong>{processingCount}</strong>
          </div>
        </article>

        <article>
          <span>
            <Truck size={19} />
          </span>

          <div>
            <p>Delivered</p>
            <strong>{deliveredCount}</strong>
          </div>
        </article>

        <article>
          <span>₹</span>

          <div>
            <p>Total Order Value</p>

            <strong>
              ₹{money(totalValue)}
            </strong>
          </div>
        </article>
      </section>

      <section className="agent-orders-container">
        <div className="agent-orders-toolbar">
          <div>
            <span className="agent-dashboard-kicker">
              Database Orders
            </span>

            <h2>Customer orders</h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label className="agent-order-search">
              <Search size={16} />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search order, customer or product..."
              />
            </label>

            <button
              type="button"
              onClick={() =>
                void loadOrders(true)
              }
              disabled={refreshing}
              title="Refresh orders"
              style={{
                width: "48px",
                height: "48px",
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(24,21,18,.07)",
                borderRadius: "999px",
                background: "#181512",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />
            </button>
          </div>
        </div>

        {error && (
          <div
            style={{
              marginTop: "18px",
              border:
                "1px solid rgba(170,70,55,.15)",
              borderRadius: "14px",
              background:
                "rgba(170,70,55,.06)",
              padding: "12px 14px",
              color: "#974b3d",
              fontSize: "9px",
            }}
          >
            {error}
          </div>
        )}

        <div className="agent-order-filters">
          <div className="agent-filter-label">
            <Filter size={14} />
            Filter
          </div>

          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={
                filter === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {statusLabel(item)}

              <span>
                {item === "ALL"
                  ? orders.length
                  : orders.filter(
                      (order) =>
                        order.status === item,
                    ).length}
              </span>
            </button>
          ))}
        </div>

        <div className="agent-orders-list">
          {loading ? (
            <div className="agent-orders-empty">
              <RefreshCw
                size={28}
                className="animate-spin"
              />

              <h3>Loading orders...</h3>

              <p>
                MySQL database se orders fetch
                ho rahe hain.
              </p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="agent-orders-empty">
              <Search size={28} />

              <h3>No orders found</h3>

              <p>
                Abhi database me matching order
                nahi hai.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const firstItem =
                order.items?.[0];

              const remainingItems =
                Math.max(
                  0,
                  order.items.length - 1,
                );

              return (
                <article
                  key={order.id}
                  className="agent-order-row"
                >
                  <div className="agent-order-number">
                    <span>
                      <ShoppingBag
                        size={17}
                      />
                    </span>

                    <div>
                      <strong>
                        {order.orderNumber}
                      </strong>

                      <small>
                        {formatDate(
                          order.createdAt,
                        )}
                      </small>
                    </div>
                  </div>

                  <div className="agent-order-customer">
                    <span>
                      <UserRound size={15} />
                    </span>

                    <div>
                      <strong>
                        {order.user?.name ||
                          "Customer"}
                      </strong>

                      <small>
                        {order.user?.email ||
                          "—"}
                      </small>
                    </div>
                  </div>

                  <div className="agent-order-product">
                    <small>Product</small>

                    <strong>
                      {firstItem?.product
                        ?.name ||
                        "Product"}
                    </strong>

                    <span>
                      Qty{" "}
                      {firstItem?.quantity ??
                        1}

                      {remainingItems > 0
                        ? ` + ${remainingItems} more`
                        : ""}
                    </span>
                  </div>

                  <div className="agent-order-amount">
                    <small>Amount</small>

                    <strong>
                      ₹{money(order.total)}
                    </strong>

                    <small>
                      {order.paymentStatus}
                    </small>
                  </div>

                  <div className="agent-order-status-control">
                    <small>Status</small>

                    <select
                      value={order.status}
                      disabled={
                        updatingOrderId ===
                        order.id
                      }
                      onChange={(event) =>
                        void updateStatus(
                          order.id,
                          event.target
                            .value as OrderStatus,
                        )
                      }
                      className={`agent-status-select status-${order.status.toLowerCase()}`}
                    >
                      <option value="PENDING">
                        Pending
                      </option>

                      <option value="CONFIRMED">
                        Confirmed
                      </option>

                      <option value="PROCESSING">
                        Processing
                      </option>

                      <option value="SHIPPED">
                        Shipped
                      </option>

                      <option value="DELIVERED">
                        Delivered
                      </option>

                      <option value="CANCELLED">
                        Cancelled
                      </option>
                    </select>
                  </div>

                  <Link
                    href={`/agent/orders/${order.id}`}
                    className="agent-order-open"
                  >
                    <ChevronRight
                      size={18}
                    />
                  </Link>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}