// ✅ Gerenciador de Sessão Independente
export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'contributor' | 'user';
}

export interface SessionData {
  user: SessionUser | null;
  expiresAt: number;
}

const SESSION_KEY = 'degase_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export const authSession = {
  // ✅ Salvar sessão no localStorage
  setSession(user: SessionUser) {
    const sessionData: SessionData = {
      user,
      expiresAt: Date.now() + SESSION_DURATION,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  },

  // ✅ Recuperar sessão do localStorage
  getSession(): SessionUser | null {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      if (!data) return null;

      const sessionData: SessionData = JSON.parse(data);

      // ✅ Verificar se expirou
      if (sessionData.expiresAt < Date.now()) {
        authSession.clearSession();
        return null;
      }

      return sessionData.user;
    } catch (error) {
      console.error('[authSession] Erro ao recuperar sessão:', error);
      return null;
    }
  },

  // ✅ Limpar sessão
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },

  // ✅ Verificar se está autenticado
  isAuthenticated(): boolean {
    return authSession.getSession() !== null;
  },
};
