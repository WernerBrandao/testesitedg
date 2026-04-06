import { useEffect, useState } from 'react';
import { trpc } from "@/lib/trpc";
import { authSession } from "@/lib/auth-session";

export function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ✅ TRPC mutation para login
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      console.log('✅ Login realizado:', data);
      
      // ✅ NOVO: Salvar sessão no localStorage
      authSession.setSession({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });
      
      setUser(data.user);
      
      // Redirecionar baseado no role
      if (data.user.role === 'admin' || data.user.role === 'contributor') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/intranet';
      }
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

  if (loadingUser) return null;

  // ✅ Usuário logado
  if (user) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800">Bem-vindo(a), {user.name ?? user.email}</p>
        <button
          onClick={async () => {
            await trpc.auth.logout.mutate();
            authSession.clearSession();
            setUser(null);
            window.location.reload();
          }}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sair
        </button>
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

    await loginMutation.mutateAsync({ email, password });
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
