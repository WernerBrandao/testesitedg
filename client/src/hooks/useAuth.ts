import { useAuthSession } from "./useAuthSession";

// ✅ Manter compatibilidade com código existente
export function useAuth(options?: any) {
  return useAuthSession(options);
}
