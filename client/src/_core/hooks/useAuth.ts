import { useAuthSession } from "@/hooks/useAuthSession";

// ✅ Manter compatibilidade com código existente
export function useAuth(options?: any) {
  return useAuthSession(options);
}
