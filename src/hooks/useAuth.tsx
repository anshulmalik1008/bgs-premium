"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "CUSTOMER" | "ADMIN";
  createdAt?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  phone?: string;
  password: string;
};

type AuthResult = {
  success: boolean;
  message: string;
  user?: AuthUser;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<AuthResult>;
  register: (data: RegisterInput) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  refreshUser: () => Promise<AuthUser | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function readResponse(response: Response): Promise<AuthResult> {
  try {
    const data = (await response.json()) as AuthResult;

    return {
      success: response.ok && data.success,
      message:
        data.message ||
        (response.ok
          ? "Request successful."
          : "Request complete nahi ho paayi."),
      user: data.user,
    };
  } catch {
    return {
      success: false,
      message: "Server se valid response nahi mila.",
    };
  }
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        setUser(null);
        return null;
      }

      const data = (await response.json()) as AuthResult;

      if (!data.success || !data.user) {
        setUser(null);
        return null;
      }

      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Current user load failed:", error);
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const currentUser = await refreshUser();

        if (!mounted) {
          return;
        }

        setUser(currentUser);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [refreshUser]);

  const login = useCallback(
    async (data: LoginInput): Promise<AuthResult> => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email.trim().toLowerCase(),
            password: data.password,
          }),
        });

        const result = await readResponse(response);

        if (result.success && result.user) {
          setUser(result.user);
        }

        return result;
      } catch (error) {
        console.error("Login failed:", error);

        return {
          success: false,
          message: "Server se connection nahi ho paaya.",
        };
      }
    },
    [],
  );

  const register = useCallback(
    async (data: RegisterInput): Promise<AuthResult> => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            phone: data.phone?.trim() || undefined,
            password: data.password,
          }),
        });

        const result = await readResponse(response);

        if (result.success && result.user) {
          setUser(result.user);
        }

        return result;
      } catch (error) {
        console.error("Registration failed:", error);

        return {
          success: false,
          message: "Server se connection nahi ho paaya.",
        };
      }
    },
    [],
  );

  const logout = useCallback(async (): Promise<AuthResult> => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await readResponse(response);

      if (result.success) {
        setUser(null);
      }

      return result;
    } catch (error) {
      console.error("Logout failed:", error);

      return {
        success: false,
        message: "Logout nahi ho paaya.",
      };
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, loading, login, register, logout, refreshUser],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth ko AuthProvider ke andar use karna zaroori hai.",
    );
  }

  return context;
}
