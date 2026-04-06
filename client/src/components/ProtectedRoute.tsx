import { useAuthSession } from "@/hooks/useAuthSession";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/admin/login",
}: ProtectedRouteProps) {
  const { user, loading } = useAuthSession();

  useEffect(() => {
    if (loading) return;

    // ✅ Se não está autenticado, redirecionar
    if (!user) {
      window.location.href = redirectTo;
      return;
    }

    // ✅ Se requer role específico, verificar
    if (requiredRole && !requiredRole.includes(user.role)) {
      window.location.href = "/";
      return;
    }
  }, [user, loading, requiredRole, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
