"use client";

import { useState } from "react";
import "./auth.css";

type AuthMode = "login" | "register";

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
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
            <span className="auth-kicker">✦ Welcome to BGS Luxury</span>

            <h1>
              Thoughtful gifting,
              <span>made personal.</span>
            </h1>

            <p>
              Sign in to manage orders, save favourites and enjoy a more
              personalised gifting experience.
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
          <div className="auth-brand">
            <div className="auth-brand-mark">B</div>

            <div>
              <strong>BGS Luxury</strong>
              <span>Premium Gifting House</span>
            </div>
          </div>

          <div className="auth-switcher">
            <button
              type="button"
              className={mode === "login" ? "is-active" : ""}
              onClick={() => {
                setMode("login");
                setSubmitted(false);
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              className={mode === "register" ? "is-active" : ""}
              onClick={() => {
                setMode("register");
                setSubmitted(false);
              }}
            >
              Create Account
            </button>
          </div>

          {submitted ? (
            <div className="auth-success">
              <div className="auth-success-icon">
                <Icon type="check" />
              </div>

              <span className="auth-kicker">
                {mode === "login" ? "Welcome Back" : "Account Created"}
              </span>

              <h2>
                {mode === "login"
                  ? "You are signed in."
                  : "Your BGS account is ready."}
              </h2>

              <p>
                This is currently a frontend demo. Real authentication will be
                connected when we build the backend.
              </p>

              <a href="/account">
                Open account
                <Icon type="arrow" />
              </a>
            </div>
          ) : (
            <>
              <div className="auth-heading">
                <span className="auth-kicker">
                  {mode === "login" ? "Member Access" : "Join the Circle"}
                </span>

                <h2>
                  {mode === "login"
                    ? "Welcome back."
                    : "Create your account."}
                </h2>

                <p>
                  {mode === "login"
                    ? "Enter your details to continue to your account."
                    : "Save favourites, track orders and unlock private access."}
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {mode === "register" && (
                  <>
                    <label className="auth-field">
                      <span>Full name</span>

                      <div>
                        <Icon type="user" />

                        <input required placeholder="Enter your full name" />
                      </div>
                    </label>

                    <label className="auth-field">
                      <span>Mobile number</span>

                      <div>
                        <Icon type="phone" />

                        <input
                          required
                          inputMode="tel"
                          placeholder="+91 98765 43210"
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
                      placeholder="name@example.com"
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
                      placeholder="Enter password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label="Toggle password visibility"
                    >
                      <Icon type="eye" />
                    </button>
                  </div>
                </label>

                {mode === "login" ? (
                  <div className="auth-options">
                    <label>
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>

                    <button type="button">Forgot password?</button>
                  </div>
                ) : (
                  <label className="auth-terms">
                    <input required type="checkbox" />
                    <span>
                      I agree to the Terms, Privacy Policy and communication
                      preferences.
                    </span>
                  </label>
                )}

                <button type="submit" className="auth-submit">
                  {mode === "login" ? "Sign in securely" : "Create account"}
                  <Icon type="arrow" />
                </button>
              </form>

              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              <div className="auth-social-buttons">
                <button type="button">
                  <span>G</span>
                  Google
                </button>

                <button type="button">
                  <span>A</span>
                  Apple
                </button>
              </div>

              <p className="auth-footer-note">
                {mode === "login"
                  ? "New to BGS Luxury?"
                  : "Already have an account?"}

                <button
                  type="button"
                  onClick={() =>
                    setMode((current) =>
                      current === "login" ? "register" : "login"
                    )
                  }
                >
                  {mode === "login" ? "Create account" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
