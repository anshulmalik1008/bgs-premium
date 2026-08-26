import { Suspense } from "react";

import AuthClient from "./AuthClient";
import "./auth.css";

export const dynamic = "force-dynamic";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-page auth-loading-screen">
          <div className="auth-loader" />
          <p>Loading account...</p>
        </main>
      }
    >
      <AuthClient />
    </Suspense>
  );
}

