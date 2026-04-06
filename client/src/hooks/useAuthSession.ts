import { useEffect, useState, useCallback } from "react";
import { authSession, type SessionUser } from "@/lib/auth-session";

type UseAuthSessionOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuthSession(options?: UseAuthSessionOptions) {
  const {
    redirectOnUnauthenticated = false,
    redirectPath = "/admin/login",
  } = options ?? {};

  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Carregar sessão ao montar
  useEffect(() => {
    const sessionUser = authSession.getSession();
    setUser(sessionUser);
    setLoading(false);
  }, []);

  // ✅ Logout
  const logout = useCallback(() => {
    authSession.clearSession();
    setUser(null);
    window.location.href = "/";
  }, []);

  // ✅ Redirecionamento automático
  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (loading) return;
    if (user) return;

    window.location.href = redirectPath;
  }, [redirectOnUnauthenticated, redirectPath, loading, user]);

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    logout,
  };
}
