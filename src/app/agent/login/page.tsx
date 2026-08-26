"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Gift,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import "../agent.css";

type AgentLoginResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: "AGENT" | "ADMIN";
  };
};

export default function AgentLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !password.trim()) {
      setError("Email aur password required hain.");
      return;
    }

    setLoading(true);

    try {
      // Authenticate the agent using the backend API.
      const response = await fetch(
        "/api/agent/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email: normalizedEmail,
            password,
            remember,
          }),
        },
      );

      const data =
        (await response.json()) as AgentLoginResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Agent login nahi ho paaya.",
        );
      }

      // Store only non-sensitive display information.
      if (data.user) {
        window.localStorage.setItem(
          "bgs_agent_user",
          JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          }),
        );
      }

      // The real authentication session is stored
      // securely in the HTTP-only cookie by the API.
      router.replace("/agent/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Agent login failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Agent login nahi ho paaya.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="agent-login-page">
      <div className="agent-login-grid" />

      <div className="agent-login-glow agent-login-glow-one" />

      <div className="agent-login-glow agent-login-glow-two" />

      <section className="agent-login-shell">
        <div className="agent-login-showcase">
          <Link href="/" className="agent-brand">
            <div className="agent-brand-icon">
              <Gift
                size={23}
                strokeWidth={1.6}
              />
            </div>

            <div>
              <strong>BGS Luxury</strong>
              <span>Agent Portal</span>
            </div>
          </Link>

          <div className="agent-showcase-copy">
            <div className="agent-premium-pill">
              <Sparkles size={14} />
              Premium Partner Network
            </div>

            <h1>
              Manage gifting.
              <span>Grow relationships.</span>
            </h1>

            <p>
              Access orders, customers, sales and
              commissions from one premium workspace
              designed for BGS Luxury agents.
            </p>

            <div className="agent-feature-list">
              <div>
                <span>
                  <ShieldCheck size={18} />
                </span>

                <div>
                  <strong>
                    Secure Agent Access
                  </strong>

                  <p>
                    Dedicated workspace for authorised
                    sales partners.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  <UserRound size={18} />
                </span>

                <div>
                  <strong>
                    Customer Management
                  </strong>

                  <p>
                    Track customers and gifting
                    requirements easily.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  <Sparkles size={18} />
                </span>

                <div>
                  <strong>
                    Premium Experience
                  </strong>

                  <p>
                    Designed to match the BGS Luxury
                    visual identity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="agent-showcase-footer">
            <span>Private portal</span>
            <span>•</span>
            <span>Authorised access only</span>
          </div>
        </div>

        <div className="agent-login-panel">
          <div className="agent-mobile-brand">
            <div className="agent-brand-icon">
              <Gift size={21} />
            </div>

            <div>
              <strong>BGS Luxury</strong>
              <span>Agent Portal</span>
            </div>
          </div>

          <div className="agent-login-card">
            <div className="agent-login-heading">
              <span className="agent-login-eyebrow">
                Agent Access
              </span>

              <h2>Welcome back.</h2>

              <p>
                Sign in with your authorised agent
                credentials.
              </p>
            </div>

            {error && (
              <div
                className="agent-login-error"
                role="alert"
              >
                {error}
              </div>
            )}

            <form
              className="agent-login-form"
              onSubmit={handleSubmit}
            >
              <label className="agent-field">
                <span>Email address</span>

                <div className="agent-input-wrap">
                  <Mail size={18} />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value,
                      )
                    }
                    placeholder="agent@bgsluxury.com"
                    autoComplete="email"
                    disabled={loading}
                    required
                  />
                </div>
              </label>

              <label className="agent-field">
                <span>Password</span>

                <div className="agent-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value,
                      )
                    }
                    placeholder="Enter password"
                    autoComplete="current-password"
                    disabled={loading}
                    required
                  />

                  <button
                    type="button"
                    className="agent-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value,
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </label>

              <div className="agent-login-options">
                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) =>
                      setRemember(
                        event.target.checked,
                      )
                    }
                    disabled={loading}
                  />

                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="agent-login-submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Signing in..."
                    : "Enter Agent Portal"}
                </span>

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            <div className="agent-login-note">
              <ShieldCheck size={16} />

              <p>
                This portal is restricted to
                authorised BGS Luxury agents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
