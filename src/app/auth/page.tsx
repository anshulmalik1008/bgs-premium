"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useState,
} from "react";

import { useAuth } from "@/hooks/useAuth";
import "./auth.css";

type AuthMode = "login" | "register";

type FormState = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function Icon({
  type,
}: {
  type:
    | "mail"
    | "lock"
    | "user"
    | "phone"
    | "eye"
    | "arrow"
    | "gift"
    | "check";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "auth-icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "lock") {
    return (
      <svg {...common}>
        <rect x="4" y="10" width="16" height="10" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  if (type === "user") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...common}>
        <path d="M7 3h3l1.5 4-2 1.5c1.2 2.5 3.2 4.5 5.7 5.7l1.5-2 4 1.5v3A3.3 3.3 0 0 1 17.4 20C9.9 20 4 14.1 4 6.6A3.6 3.6 0 0 1 7 3Z" />
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

  if (type === "gift") {
    return (
      <svg {...common}>
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M12 9v12M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5V9Z" />
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

  return (
    <svg {...common}>
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

export default function AuthPage() {
  const router = useRouter();

  const {
    user,
    loading: authLoading,
    login,
    register,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState<FormState>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/account");
    }
  }, [authLoading, user, router]);

  function updateField(
    field: keyof FormState,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (message) {
      setMessage("");
      setMessageType("");
    }
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setForm(initialForm);
    setMessage("");
    setMessageType("");
    setShowPassword(false);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (mode === "register") {
      if (form.name.trim().length < 2) {
        setMessage("Valid full name enter karo.");
        setMessageType("error");
        return;
      }

      if (form.password.length < 8) {
        setMessage(
          "Password minimum 8 characters ka hona chahiye.",
        );
        setMessageType("error");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setMessage("Password aur confirm password match nahi karte.");
        setMessageType("error");
        return;
      }
    }

    setSubmitting(true);

    try {
      const result =
        mode === "login"
          ? await login({
              email: form.email,
              password: form.password,
            })
          : await register({
              name: form.name,
              email: form.email,
              phone: form.phone,
              password: form.password,
            });

      setMessage(result.message);
      setMessageType(result.success ? "success" : "error");

      if (result.success) {
        router.push("/account");
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <main className="auth-page auth-loading-screen">
        <div className="auth-loader" />
        <p>Checking your account...</p>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-grid-overlay" />

      <section className="auth-shell auth-layout">
        <div className="auth-visual-panel">
          <div className="auth-visual-glow" />
          <div className="auth-orbit auth-orbit-one" />
          <div className="auth-orbit auth-orbit-two" />
          <div className="auth-orbit auth-orbit-three" />

          <div className="auth-gift-sculpture">
            <Icon type="gift" />
            <span>BGS</span>
          </div>

          <div className="auth-visual-copy">
            <span className="auth-kicker">
              ✦ Welcome to BGS Luxury
            </span>

            <h1>
              Thoughtful gifting,
              <span>made personal.</span>
            </h1>

            <p>
              Sign in to manage orders, save favourites and enjoy a
              personalised luxury gifting experience.
            </p>

            <div className="auth-benefits">
              {[
                "Track every order",
                "Save favourite gifts",
                "Access exclusive launches",
              ].map((item) => (
                <div key={item}>
                  <Icon type="check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <Link href="/" className="auth-brand">
            <div className="auth-brand-mark">B</div>

            <div>
              <strong>BGS Luxury</strong>
              <span>Premium Gifting House</span>
            </div>
          </Link>

          <div className="auth-switcher">
            <button
              type="button"
              className={mode === "login" ? "is-active" : ""}
              onClick={() => switchMode("login")}
            >
              Sign In
            </button>

            <button
              type="button"
              className={mode === "register" ? "is-active" : ""}
              onClick={() => switchMode("register")}
            >
              Create Account
            </button>
          </div>

          <div className="auth-heading">
            <span className="auth-kicker">
              {mode === "login"
                ? "Member Access"
                : "Join the Circle"}
            </span>

            <h2>
              {mode === "login"
                ? "Welcome back."
                : "Create your account."}
            </h2>

            <p>
              {mode === "login"
                ? "Enter your email and password to continue."
                : "Save favourites, manage orders and unlock private access."}
            </p>
          </div>

          {message && (
            <div
              className={`auth-message auth-message-${messageType}`}
              role="alert"
            >
              {messageType === "success" && (
                <Icon type="check" />
              )}

              <span>{message}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "register" && (
              <>
                <label className="auth-field">
                  <span>Full name</span>

                  <div>
                    <Icon type="user" />

                    <input
                      required
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                  </div>
                </label>

                <label className="auth-field">
                  <span>Mobile number</span>

                  <div>
                    <Icon type="phone" />

                    <input
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      inputMode="tel"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </div>
                </label>
              </>
            )}

            <label className="auth-field">
              <span>Email address</span>

              <div>
                <Icon type="mail" />

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="name@example.com"
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Password</span>

              <div>
                <Icon type="lock" />

                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder="Minimum 8 characters"
                  autoComplete={
                    mode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  <Icon type="eye" />
                </button>
              </div>
            </label>

            {mode === "register" && (
              <label className="auth-field">
                <span>Confirm password</span>

                <div>
                  <Icon type="lock" />

                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField(
                        "confirmPassword",
                        event.target.value,
                      )
                    }
                    placeholder="Enter password again"
                    autoComplete="new-password"
                  />
                </div>
              </label>
            )}

            {mode === "login" ? (
              <div className="auth-options">
                <label>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <button type="button">
                  Forgot password?
                </button>
              </div>
            ) : (
              <label className="auth-terms">
                <input required type="checkbox" />

                <span>
                  I agree to the Terms and Privacy Policy.
                </span>
              </label>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={submitting}
            >
              {submitting
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                  ? "Sign in securely"
                  : "Create account"}

              {!submitting && <Icon type="arrow" />}
            </button>
          </form>

          <p className="auth-footer-note">
            {mode === "login"
              ? "New to BGS Luxury?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() =>
                switchMode(
                  mode === "login" ? "register" : "login",
                )
              }
            >
              {mode === "login"
                ? "Create account"
                : "Sign in"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
