"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

import { useRouter } from "next/navigation";

import "./checkout.css";

type CartItem = {
  id: number;
  name: string;
  title?: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  badge?: string;
  gradient?: string;
  image?: string;
  subtitle?: string;
  quantity: number;
};

type CheckoutForm = {
  fullName: string;
  phone: string;
  email: string;

  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  landmark: string;

  giftMessage: string;
};

type AddressResponse = {
  success: boolean;
  message?: string;

  address?: {
    id: number;
    fullName: string;
    phone: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postalCode: string;
  };
};

type OrderResponse = {
  success: boolean;
  message?: string;

  order?: {
    id: number;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    subtotal: string | number;
    shipping: string | number;
    discount: string | number;
    total: string | number;
    createdAt: string;
  };
};

type RazorpayOrderResponse = {
  success: boolean;
  message?: string;
  payment?: {
    keyId: string;
    razorpayOrderId: string;
    amount: number | string;
    currency: string;
    bgsOrderId: number;
    bgsOrderNumber: string;
  };
};

type VerifyPaymentResponse = {
  success: boolean;
  message?: string;
  order?: OrderResponse["order"];
};

type PincodeResponse = {
  success: boolean;
  message?: string;
  location?: {
    city: string;
    state: string;
    country?: string;
    postOffices?: string[];
  };
};

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number | string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

const CART_STORAGE_KEY = "bgs_cart_items";
const BUY_NOW_STORAGE_KEY = "bgs_buy_now";

function Icon({
  type,
}: {
  type:
    | "arrow"
    | "bag"
    | "card"
    | "truck"
    | "shield"
    | "check"
    | "location"
    | "gift";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "checkout-icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
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

  if (type === "card") {
    return (
      <svg {...common}>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="3"
        />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </svg>
    );
  }

  if (type === "truck") {
    return (
      <svg {...common}>
        <path d="M3 6h11v10H3Z" />
        <path d="M14 10h4l3 3v3h-7Z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 5 6v5c0 5 3.2 8 7 10 3.8-2 7-5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
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

  return (
    <svg {...common}>
      <rect
        x="3"
        y="9"
        width="18"
        height="12"
        rx="2"
      />
      <path d="M12 9v12M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5V9Z" />
    </svg>
  );
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(
        CART_STORAGE_KEY,
      );

    return raw
      ? (JSON.parse(raw) as CartItem[])
      : [];
  } catch {
    return [];
  }
}

function readBuyNowItem(): CartItem | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw =
      window.localStorage.getItem(
        BUY_NOW_STORAGE_KEY,
      );

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as
      | CartItem
      | {
          productId?: number;
          quantity?: number;
        };

    // The new Buy Now format stores the complete product.
    if (
      "id" in parsed &&
      typeof parsed.id === "number"
    ) {
      return {
        ...parsed,
        quantity:
          typeof parsed.quantity === "number"
            ? parsed.quantity
            : 1,
      } as CartItem;
    }

    // Support the older Buy Now format that stored only the product ID.
    if (
      "productId" in parsed &&
      typeof parsed.productId === "number"
    ) {
      const cartItem = readCart().find(
        (item) =>
          item.id === parsed.productId,
      );

      if (!cartItem) {
        return null;
      }

      return {
        ...cartItem,
        quantity:
          typeof parsed.quantity === "number"
            ? parsed.quantity
            : 1,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [paymentMethod, setPaymentMethod] =
    useState<"online" | "cod">("online");

  const [deliverySlot, setDeliverySlot] =
    useState("standard");

  const [giftWrap, setGiftWrap] =
    useState(true);

  const [billingSame, setBillingSame] =
    useState(true);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [error, setError] =
    useState("");

  const [pincodeLoading, setPincodeLoading] =
    useState(false);

  const [pincodeMessage, setPincodeMessage] =
    useState("");

  const [placedOrder, setPlacedOrder] =
    useState<OrderResponse["order"] | null>(
      null,
    );

  const [form, setForm] =
    useState<CheckoutForm>({
      fullName: "",
      phone: "",
      email: "",

      addressLine: "",
      city: "",
      state: "",
      postalCode: "",
      landmark: "",

      giftMessage: "",
    });

  useEffect(() => {
    // Load the selected Buy Now product or the full shopping cart.
    const params = new URLSearchParams(
      window.location.search,
    );

    const mode = params.get("mode");
    const productId = Number(
      params.get("product"),
    );

    if (
      mode === "buy-now" &&
      Number.isInteger(productId)
    ) {
      const buyNowItem =
        readBuyNowItem();

      if (
        buyNowItem &&
        buyNowItem.id === productId
      ) {
        setCartItems([
          {
            ...buyNowItem,
            quantity: 1,
          },
        ]);

        return;
      }

      const cartItem = readCart().find(
        (item) => item.id === productId,
      );

      if (cartItem) {
        setCartItems([
          {
            ...cartItem,
            quantity: 1,
          },
        ]);

        return;
      }
    }

    setCartItems(readCart());
  }, []);

  useEffect(() => {
  const existingScript =
    document.getElementById(
      "razorpay-checkout",
    );

  if (existingScript) {
    return;
  }

  const script =
    document.createElement(
      "script",
    );

  script.id =
    "razorpay-checkout";

  script.src =
    "https://checkout.razorpay.com/v1/checkout.js";

  script.async = true;

  document.body.appendChild(
    script,
  );

  return () => {
    script.remove();
  };
}, []);


  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const shipping =
    deliverySlot === "express"
      ? 299
      : 0;

  const giftWrapFee =
    giftWrap ? 149 : 0;

  const total =
    subtotal +
    shipping +
    giftWrapFee;

  function updateForm(
    field: keyof CheckoutForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handlePincodeChange(
    value: string,
  ) {
    const pincode = value
      .replace(/\D/g, "")
      .slice(0, 6);

    updateForm("postalCode", pincode);
    setPincodeMessage("");

    if (pincode.length < 6) {
      return;
    }

    setPincodeLoading(true);

    try {
      const response = await fetch(
        `/api/pincode/${pincode}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data =
        (await response.json()) as PincodeResponse;

      if (
        !response.ok ||
        !data.success ||
        !data.location
      ) {
        setPincodeMessage(
          data.message ||
            "PIN code could not be found.",
        );

        return;
      }

      setForm((current) => ({
        ...current,
        city: data.location?.city || "",
        state: data.location?.state || "",
      }));

      setPincodeMessage(
        "City and state filled automatically.",
      );
    } catch (error) {
      console.error(
        "PIN code lookup failed:",
        error,
      );

      setPincodeMessage(
        "PIN code lookup is temporarily unavailable.",
      );
    } finally {
      setPincodeLoading(false);
    }
  }

  async function openRazorpayCheckout(
    order: NonNullable<OrderResponse["order"]>,
  ) {
    const paymentResponse =
      await fetch("/api/payment/create-order", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
        }),
      });

    const paymentData =
      (await paymentResponse.json()) as RazorpayOrderResponse;

    if (
      !paymentResponse.ok ||
      !paymentData.success ||
      !paymentData.payment
    ) {
      throw new Error(
        paymentData.message ||
          "Online payment could not be started.",
      );
    }

    if (!window.Razorpay) {
      throw new Error(
        "Razorpay Checkout is still loading. Please try again.",
      );
    }

    const payment = paymentData.payment;

    await new Promise<void>((resolve, reject) => {
      const razorpay = new window.Razorpay!({
        key: payment.keyId,
        amount: payment.amount,
        currency: payment.currency,
        name: "BGS Luxury",
        description: `Payment for ${payment.bgsOrderNumber}`,
        order_id: payment.razorpayOrderId,

        prefill: {
          name: form.fullName.trim(),
          email: form.email.trim(),
          contact: form.phone.trim(),
        },

        notes: {
          bgsOrderId: String(order.id),
          bgsOrderNumber: order.orderNumber,
        },

        theme: {
          color: "#181512",
        },

        handler: async (
          response: RazorpaySuccessResponse,
        ) => {
          try {
            const verifyResponse =
              await fetch("/api/payment/verify", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  bgsOrderId: order.id,
                  razorpay_order_id:
                    response.razorpay_order_id,
                  razorpay_payment_id:
                    response.razorpay_payment_id,
                  razorpay_signature:
                    response.razorpay_signature,
                }),
              });

            const verifyData =
              (await verifyResponse.json()) as VerifyPaymentResponse;

            if (
              !verifyResponse.ok ||
              !verifyData.success ||
              !verifyData.order
            ) {
              reject(
                new Error(
                  verifyData.message ||
                    "Payment verification failed.",
                ),
              );

              return;
            }

            setPlacedOrder(
              verifyData.order,
            );

            window.localStorage.removeItem(
              CART_STORAGE_KEY,
            );

            window.localStorage.removeItem(
              BUY_NOW_STORAGE_KEY,
            );

            setCartItems([]);
            resolve();
          } catch (error) {
            reject(error);
          }
        },

        modal: {
          ondismiss: () => {
            reject(
              new Error(
                "Payment was cancelled. Your order is still pending.",
              ),
            );
          },
        },
      });

      razorpay.open();
    });
  }

  async function placeOrder(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (placingOrder) {
      return;
    }

    setError("");

    if (cartItems.length === 0) {
      setError(
        "Your cart is empty.",
      );
      return;
    }

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.addressLine.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.postalCode.trim()
    ) {
      setError(
        "Please complete all required checkout fields.",
      );
      return;
    }

    if (
      !/^[1-9][0-9]{5}$/.test(
        form.postalCode.trim(),
      )
    ) {
      setError(
        "Please enter a valid 6-digit PIN code.",
      );
      return;
    }

    setPlacingOrder(true);

    try {
      // Save the delivery address first.
      const addressResponse =
        await fetch("/api/addresses", {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            fullName:
              form.fullName.trim(),

            phone:
              form.phone.trim(),

            line1:
              form.addressLine.trim(),

            line2:
              form.landmark.trim() ||
              undefined,

            city:
              form.city.trim(),

            state:
              form.state.trim(),

            postalCode:
              form.postalCode.trim(),

            country: "India",

            label: "Delivery",
          }),
        });

      const addressData =
        (await addressResponse.json()) as AddressResponse;

      if (
        addressResponse.status === 401
      ) {
        router.push(
          "/auth?redirect=/checkout",
        );

        return;
      }

      if (
        !addressResponse.ok ||
        !addressData.success ||
        !addressData.address
      ) {
        throw new Error(
          addressData.message ||
            "Delivery address could not be saved.",
        );
      }

      // Create the real order in MySQL through the API.
      const orderResponse =
        await fetch("/api/orders", {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            addressId:
              addressData.address.id,

            items: cartItems.map(
              (item) => ({
                productId: item.id,
                quantity:
                  item.quantity,
              }),
            ),

            giftMessage:
              form.giftMessage.trim() ||
              undefined,

            // Gift wrapping is temporarily included
            // with the checkout service/shipping charge.
            shipping:
              shipping +
              giftWrapFee,

            discount: 0,

            paymentType:
              paymentMethod === "cod"
                ? "COD"
                : "ONLINE",
          }),
        });

      const orderData =
        (await orderResponse.json()) as OrderResponse;

      if (
        orderResponse.status === 401
      ) {
        router.push(
          "/auth?redirect=/checkout",
        );

        return;
      }

      if (
        !orderResponse.ok ||
        !orderData.success ||
        !orderData.order
      ) {
        throw new Error(
          orderData.message ||
            "Order could not be created.",
        );
      }

      if (paymentMethod === "cod") {
        // COD orders are confirmed without opening Razorpay.
        setPlacedOrder(
          orderData.order,
        );

        window.localStorage.removeItem(
          CART_STORAGE_KEY,
        );

        window.localStorage.removeItem(
          BUY_NOW_STORAGE_KEY,
        );

        setCartItems([]);
      } else {
        // Online payment is completed through Razorpay Standard Checkout.
        await openRazorpayCheckout(
          orderData.order,
        );
      }
    } catch (error) {
      console.error(
        "Checkout failed:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Order could not be placed.",
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  if (placedOrder) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="checkout-success-card">
            <div className="checkout-success-icon">
              <Icon type="check" />
            </div>

            <span className="checkout-kicker">
              Order Confirmed
            </span>

            <h1>
              Your gift is
              <span>on its way.</span>
            </h1>

            <p>
              Thank you for choosing BGS
              Luxury. Your order has been
              saved successfully and is now
              visible in the order management
              system.
            </p>

            <div className="checkout-success-meta">
              <div>
                <span>Order ID</span>

                <strong>
                  {
                    placedOrder.orderNumber
                  }
                </strong>
              </div>

              <div>
                <span>Amount</span>

                <strong>
                  ₹
                  {Number(
                    placedOrder.total,
                  ).toLocaleString(
                    "en-IN",
                  )}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <strong>
                  {
                    placedOrder.status
                  }
                </strong>
              </div>

              <div>
                <span>Payment</span>

                <strong>
                  {
                    placedOrder.paymentStatus
                  }
                </strong>
              </div>
            </div>

            <div className="checkout-success-actions">
              <a href="/shop">
                Continue shopping
                <Icon type="arrow" />
              </a>

              <a
                href="/track-order"
                className="secondary"
              >
                Track order
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-hero">
        <div className="checkout-shell">
          <span className="checkout-kicker">
            ✦ Secure Checkout
          </span>

          <h1>
            Complete your
            <span>
              gifting experience.
            </span>
          </h1>

          <p>
            Enter delivery details, choose
            your preferred payment method
            and review your order before
            placing it.
          </p>
        </div>
      </section>

      <form
        className="checkout-main"
        onSubmit={placeOrder}
      >
        <div className="checkout-shell checkout-layout">
          <div className="checkout-form-column">
            <section className="checkout-panel">
              <div className="checkout-panel-heading">
                <div className="checkout-step-number">
                  01
                </div>

                <div>
                  <p>Contact Details</p>

                  <h2>
                    Who should receive order
                    updates?
                  </h2>
                </div>
              </div>

              <div className="checkout-fields two-column">
                <label>
                  <span>Full name</span>

                  <input
                    required
                    value={
                      form.fullName
                    }
                    onChange={(event) =>
                      updateForm(
                        "fullName",
                        event.target
                          .value,
                      )
                    }
                    placeholder="Enter full name"
                  />
                </label>

                <label>
                  <span>
                    Mobile number
                  </span>

                  <input
                    required
                    inputMode="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateForm(
                        "phone",
                        event.target
                          .value,
                      )
                    }
                    placeholder="+91"
                  />
                </label>

                <label className="full">
                  <span>
                    Email address
                  </span>

                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateForm(
                        "email",
                        event.target
                          .value,
                      )
                    }
                    placeholder="name@example.com"
                  />
                </label>
              </div>
            </section>

            <section className="checkout-panel">
              <div className="checkout-panel-heading">
                <div className="checkout-step-number">
                  02
                </div>

                <div>
                  <p>
                    Delivery Address
                  </p>

                  <h2>
                    Where should we deliver
                    the gift?
                  </h2>
                </div>
              </div>

              <div className="checkout-fields two-column">
                <label className="full">
                  <span>
                    Address line
                  </span>

                  <input
                    required
                    value={
                      form.addressLine
                    }
                    onChange={(event) =>
                      updateForm(
                        "addressLine",
                        event.target
                          .value,
                      )
                    }
                    placeholder="House number, street and area"
                  />
                </label>

                <label>
                  <span>City</span>

                  <input
                    required
                    value={form.city}
                    onChange={(event) =>
                      updateForm(
                        "city",
                        event.target
                          .value,
                      )
                    }
                    placeholder="City"
                  />
                </label>

                <label>
                  <span>State</span>

                  <input
                    required
                    value={form.state}
                    onChange={(event) =>
                      updateForm(
                        "state",
                        event.target
                          .value,
                      )
                    }
                    placeholder="State"
                  />
                </label>

                <label>
                  <span>PIN code</span>

                  <input
                    required
                    inputMode="numeric"
                    maxLength={6}
                    value={
                      form.postalCode
                    }
                    onChange={(event) =>
                      void handlePincodeChange(
                        event.target.value,
                      )
                    }
                    placeholder="201001"
                  />

                  {pincodeLoading && (
                    <small
                      style={{
                        display: "block",
                        marginTop: "6px",
                      }}
                    >
                      Finding location...
                    </small>
                  )}

                  {!pincodeLoading &&
                    pincodeMessage && (
                      <small
                        style={{
                          display: "block",
                          marginTop: "6px",
                        }}
                      >
                        {pincodeMessage}
                      </small>
                    )}
                </label>

                <label>
                  <span>Landmark</span>

                  <input
                    value={
                      form.landmark
                    }
                    onChange={(event) =>
                      updateForm(
                        "landmark",
                        event.target
                          .value,
                      )
                    }
                    placeholder="Optional landmark"
                  />
                </label>
              </div>

              <label className="checkout-checkbox">
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={(event) =>
                    setBillingSame(
                      event.target.checked,
                    )
                  }
                />

                <span>
                  Billing address is same as
                  delivery address
                </span>
              </label>
            </section>

            <section className="checkout-panel">
              <div className="checkout-panel-heading">
                <div className="checkout-step-number">
                  03
                </div>

                <div>
                  <p>
                    Delivery Preference
                  </p>

                  <h2>
                    Choose how quickly it
                    should arrive.
                  </h2>
                </div>
              </div>

              <div className="checkout-options">
                <button
                  type="button"
                  className={
                    deliverySlot ===
                    "standard"
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    setDeliverySlot(
                      "standard",
                    )
                  }
                >
                  <Icon type="truck" />

                  <div>
                    <strong>
                      Standard delivery
                    </strong>

                    <span>
                      2–4 business days
                    </span>
                  </div>

                  <b>Free</b>
                </button>

                <button
                  type="button"
                  className={
                    deliverySlot ===
                    "express"
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    setDeliverySlot(
                      "express",
                    )
                  }
                >
                  <Icon type="truck" />

                  <div>
                    <strong>
                      Express delivery
                    </strong>

                    <span>
                      Priority handling
                    </span>
                  </div>

                  <b>₹299</b>
                </button>
              </div>

              <label className="checkout-gift-wrap">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(event) =>
                    setGiftWrap(
                      event.target.checked,
                    )
                  }
                />

                <Icon type="gift" />

                <div>
                  <strong>
                    Luxury gift wrapping
                  </strong>

                  <span>
                    Premium box, ribbon and
                    message card
                  </span>
                </div>

                <b>₹149</b>
              </label>

              {giftWrap && (
                <div className="checkout-payment-fields">
                  <label>
                    <span>
                      Gift message
                    </span>

                    <input
                      value={
                        form.giftMessage
                      }
                      onChange={(event) =>
                        updateForm(
                          "giftMessage",
                          event.target
                            .value,
                        )
                      }
                      maxLength={250}
                      placeholder="Write a personal message..."
                    />
                  </label>
                </div>
              )}
            </section>

            <section className="checkout-panel">
              <div className="checkout-panel-heading">
                <div className="checkout-step-number">
                  04
                </div>

                <div>
                  <p>Payment</p>

                  <h2>
                    Select a secure payment
                    method.
                  </h2>
                </div>
              </div>

              <div className="checkout-payment-methods">
                <button
                  type="button"
                  className={
                    paymentMethod === "online"
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    setPaymentMethod("online")
                  }
                >
                  <Icon type="card" />

                  <div>
                    <strong>
                      Pay Online with Razorpay
                    </strong>

                    <span>
                      UPI, cards, netbanking and other enabled methods
                    </span>
                  </div>

                  <i />
                </button>

                <button
                  type="button"
                  className={
                    paymentMethod === "cod"
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    setPaymentMethod("cod")
                  }
                >
                  <Icon type="truck" />

                  <div>
                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when the eligible order is delivered
                    </span>
                  </div>

                  <i />
                </button>
              </div>

              {paymentMethod === "online" && (
                <div className="checkout-payment-fields">
                  <p
                    style={{
                      margin: 0,
                      fontSize: "11px",
                      lineHeight: 1.7,
                      color: "rgba(24,21,18,.55)",
                    }}
                  >
                    Your UPI, card and banking details are entered securely
                    inside Razorpay Checkout after you place the order.
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="checkout-summary">
            <div className="checkout-summary-heading">
              <Icon type="bag" />

              <div>
                <p>Your Order</p>

                <h2>
                  {cartItems.length} selected
                  gifts
                </h2>
              </div>
            </div>

            <div className="checkout-items">
              {cartItems.length > 0 ? (
                cartItems.map(
                  (item) => (
                    <article
                      key={item.id}
                    >
                      <div
                        className="checkout-item-visual"
                        style={
                          item.image
                            ? {
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }
                            : {
                                background:
                                  item.gradient ||
                                  "linear-gradient(145deg,#fffdf7,#ead7b2,#bc8834)",
                              }
                        }
                      >
                        {!item.image &&
                          item.category.slice(
                            0,
                            1,
                          )}
                      </div>

                      <div>
                        <p>
                          {
                            item.category
                          }
                        </p>

                        <h3>
                          {item.name}
                        </h3>

                        <span>
                          Qty:{" "}
                          {
                            item.quantity
                          }
                        </span>
                      </div>

                      <strong>
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN",
                        )}
                      </strong>
                    </article>
                  ),
                )
              ) : (
                <div className="checkout-empty-cart">
                  <p>
                    Your cart is empty.
                  </p>

                  <a href="/shop">
                    Return to shop
                  </a>
                </div>
              )}
            </div>

            <div className="checkout-summary-lines">
              <div>
                <span>Subtotal</span>

                <strong>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN",
                  )}
                </strong>
              </div>

              <div>
                <span>Delivery</span>

                <strong>
                  {shipping === 0
                    ? "Complimentary"
                    : `₹${shipping.toLocaleString(
                        "en-IN",
                      )}`}
                </strong>
              </div>

              <div>
                <span>
                  Gift wrapping
                </span>

                <strong>
                  {giftWrapFee === 0
                    ? "Not selected"
                    : `₹${giftWrapFee.toLocaleString(
                        "en-IN",
                      )}`}
                </strong>
              </div>
            </div>

            <div className="checkout-total">
              <span>Total payable</span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN",
                )}
              </strong>
            </div>

            {error && (
              <div
                className="checkout-error"
                style={{
                  marginBottom: "14px",
                  border:
                    "1px solid rgba(170,70,55,.15)",
                  borderRadius: "14px",
                  background:
                    "rgba(170,70,55,.06)",
                  padding:
                    "11px 13px",
                  color: "#974b3d",
                  fontSize: "9px",
                  lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="checkout-place-order"
              disabled={
                cartItems.length === 0 ||
                placingOrder
              }
            >
              {placingOrder
                ? paymentMethod === "online"
                  ? "Opening secure payment..."
                  : "Placing order..."
                : paymentMethod === "online"
                  ? "Place order & pay securely"
                  : "Place COD order"}

              {!placingOrder && (
                <Icon type="arrow" />
              )}
            </button>

            <div className="checkout-trust">
              <div>
                <Icon type="shield" />
                <span>
                  Secure encrypted checkout
                </span>
              </div>

              <div>
                <Icon type="gift" />
                <span>
                  Luxury presentation assured
                </span>
              </div>

              <div>
                <Icon type="location" />
                <span>
                  Delivery tracking included
                </span>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}