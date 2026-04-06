import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { LogIn, LogOut } from 'lucide-react';
import { trpc } from "@/lib/trpc";
import { authSession } from "@/lib/auth-session";

export function LoginBar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [, navigate] = useLocation();

  // ✅ TRPC mutation para login
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      console.log('✅ Login realizado:', data);
      
      // ✅ AÇÃO 9: Salvar sessão no localStorage
      authSession.setSession({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });
      
      setUser(data.user);
      setEmail('');
      setPassword('');
      setError('');
      
      // ✅ AÇÃO 8: Abrir /admin ou /intranet em nova aba
      if (data.user.role === 'admin' || data.user.role === 'contributor') {
        window.open('/admin', '_blank');
      } else {
        window.open('/intranet', '_blank');
      }
      
      // ✅ AÇÃO 9: Atualizar LoginBar com dados do usuário
      // Permanecer na página inicial
      window.location.href = '/';
    },
    onError: (error: any) => {
      console.error('❌ Erro no login:', error);
      setError(error.message || 'Erro ao fazer login');
      setIsLoading(false);
    },
  });

  // ✅ Verificar sessão ao carregar (usando localStorage em vez de TRPC)
  useEffect(() => {
    const checkAuth = () => {
      try {
        const sessionUser = authSession.getSession();
        if (sessionUser) {
          setUser(sessionUser);
        }
      } catch (error) {
        console.log('Usuário não autenticado');
      } finally {
        setLoadingUser(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ AÇÃO 9: Listener para mudanças de sessão em outras abas
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'degase_session') {
        const sessionUser = authSession.getSession();
        if (sessionUser) {
          setUser(sessionUser);
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loadingUser) return null;

  // ✅ Usuário logado - AÇÃO 9: Exibir dados do usuário
  if (user) {
    return (
      <div className="w-full" style={{ backgroundColor: '#000080' }}>
        <div className="container py-2 flex justify-between items-center text-white text-sm">
          <div className="flex items-center gap-2">
            <LogIn size={16} />
            <span>Bem-vindo(a), <strong>{user.name ?? user.email}</strong></span>
          </div>

          <div className="flex items-center gap-4">
            {user.role === 'admin' || user.role === 'contributor' ? (
              <button
                onClick={() => window.open('/admin', '_blank')}
                className="underline hover:opacity-80 transition-opacity"
                title="Abrir painel administrativo em nova aba"
              >
                Ir para o Painel
              </button>
            ) : (
              <button
                onClick={() => window.open('/intranet', '_blank')}
                className="underline hover:opacity-80 transition-opacity"
                title="Abrir intranet em nova aba"
              >
                Ir para a Intranet
              </button>
            )}

            {/* ✅ AÇÃO 1: Corrigir botão SAIR */}
            <button
              onClick={async () => {
                try {
                  // Fazer logout no servidor
                  await trpc.auth.logout.mutate();
                } catch (error) {
                  console.error('Erro ao fazer logout no servidor:', error);
                }
                
                // Limpar sessão do localStorage
                authSession.clearSession();
                
                // Limpar estado local
                setUser(null);
                setEmail('');
                setPassword('');
                setError('');
                
                // Redirecionar para home
                window.location.href = '/';
              }}
              className="underline hover:opacity-80 transition-opacity flex items-center gap-1"
              title="Encerrar sessão"
            >
              <LogOut size={14} />
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Formulário de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Preencha e-mail e senha');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('E-mail inválido');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Chamar TRPC mutation
      await loginMutation.mutateAsync({ 
        email: email.trim(), 
        password 
      });
    } catch (err: any) {
      console.error('❌ Erro capturado:', err);
      setError(err.message || 'Erro ao fazer login');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full" style={{ backgroundColor: '#000080' }}>
      <div className="container">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-2 py-2">
          <div className="flex items-center gap-2 text-white text-sm font-medium hidden md:flex">
            <LogIn size={16} />
            <span>Acesso à Intranet:</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-1.5 text-sm w-full md:w-40 rounded"
              style={{ backgroundColor: '#FFFFFF', color: '#333333' }}
              disabled={isLoading}
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-1.5 text-sm w-full md:w-40 rounded"
              style={{ backgroundColor: '#FFFFFF', color: '#333333' }}
              disabled={isLoading}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white hover:opacity-90 transition-opacity w-full md:w-auto rounded disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          {error && (
            <div className="text-xs text-red-300 w-full text-center md:text-left">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
