"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Building2,
  Check,
  Gift,
  Landmark,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import "../agent.css";

export default function AgentProfilePage() {
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: "BGS Agent",
    email: "agent@bgsluxury.com",
    phone: "+91 98765 43210",
    company: "BGS Luxury",
    city: "New Delhi",
    state: "Delhi",
    bankName: "HDFC Bank",
    accountNumber: "XXXXXXXX4821",
    ifsc: "HDFC0001234",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.localStorage.setItem(
      "bgs_agent_profile",
      JSON.stringify(form),
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1800);
  }

  function logout() {
    window.localStorage.removeItem("bgs_agent_session");
    window.location.href = "/agent/login";
  }

  return (
    <main className="agent-profile-page">
      <header className="agent-profile-topbar">
        <div>
          <Link
            href="/agent/dashboard"
            className="agent-orders-back"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <span className="agent-dashboard-kicker">
            Agent Account
          </span>

          <h1>Profile</h1>

          <p>
            Manage your agent information, payout details and
            account settings.
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

      <section className="agent-profile-layout">
        <aside className="agent-profile-sidebar">
          <div className="agent-profile-main-card">
            <div className="agent-profile-big-avatar">
              BA
            </div>

            <h2>{form.name}</h2>
            <p>{form.email}</p>

            <span className="agent-profile-tier">
              Gold Partner
            </span>

            <div className="agent-profile-agent-id">
              <span>Agent ID</span>
              <strong>BGS-AG-0018</strong>
            </div>
          </div>

          <div className="agent-profile-security">
            <ShieldCheck size={22} />

            <div>
              <strong>Verified Agent</strong>

              <p>
                Your agent account is verified and currently
                active.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="agent-profile-logout"
            onClick={logout}
          >
            <LogOut size={16} />
            Logout Agent Portal
          </button>
        </aside>

        <form
          className="agent-profile-form"
          onSubmit={handleSubmit}
        >
          <section className="agent-profile-section">
            <div className="agent-profile-section-heading">
              <span>
                <UserRound size={18} />
              </span>

              <div>
                <small>Personal Details</small>
                <h2>Agent information</h2>
              </div>
            </div>

            <div className="agent-profile-fields">
              <label>
                <span>Full name</span>

                <div>
                  <UserRound size={16} />

                  <input
                    value={form.name}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </label>

              <label>
                <span>Email address</span>

                <div>
                  <Mail size={16} />

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </label>

              <label>
                <span>Phone number</span>

                <div>
                  <Phone size={16} />

                  <input
                    value={form.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </label>

              <label>
                <span>Company</span>

                <div>
                  <Building2 size={16} />

                  <input
                    value={form.company}
                    onChange={(event) =>
                      updateField(
                        "company",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </label>

              <label>
                <span>City</span>

                <div>
                  <MapPin size={16} />

                  <input
                    value={form.city}
                    onChange={(event) =>
                      updateField(
                        "city",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </label>

              <label>
                <span>State</span>

                <div>
                  <MapPin size={16} />

                  <input
                    value={form.state}
                    onChange={(event) =>
                      updateField(
                        "state",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </label>
            </div>
          </section>

          <section className="agent-profile-section">
            <div className="agent-profile-section-heading">
              <span>
                <Landmark size={18} />
              </span>

              <div>
                <small>Payout Details</small>
                <h2>Bank account</h2>
              </div>
            </div>

            <div className="agent-profile-fields">
              <label>
                <span>Bank name</span>

                <div>
                  <Landmark size={16} />

                  <input
                    value={form.bankName}
                    onChange={(event) =>
                      updateField(
                        "bankName",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </label>

              <label>
                <span>Account number</span>

                <div>
                  <LockKeyhole size={16} />

                  <input
                    value={form.accountNumber}
                    onChange={(event) =>
                      updateField(
                        "accountNumber",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </label>

              <label className="agent-profile-full-field">
                <span>IFSC code</span>

                <div>
                  <Landmark size={16} />

                  <input
                    value={form.ifsc}
                    onChange={(event) =>
                      updateField(
                        "ifsc",
                        event.target.value.toUpperCase(),
                      )
                    }
                  />
                </div>
              </label>
            </div>

            <div className="agent-profile-bank-note">
              <ShieldCheck size={17} />

              <p>
                Payout information should only be changed by
                the authorised account holder.
              </p>
            </div>
          </section>

          <div className="agent-profile-actions">
            <Link href="/agent/dashboard">
              Cancel
            </Link>

            <button type="submit">
              {saved ? (
                <>
                  <Check size={17} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
