import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Mail, Lock, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { authSession } from "@/lib/auth-session";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      // ✅ Redirecionar baseado no role
      if (data.user.role === 'admin' || data.user.role === 'contributor') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/intranet';
      }
    },
    onError: (error: any) => {
      console.error('❌ Erro no login:', error);
      setError(error.message || 'Erro ao fazer login');
      setLoading(false);
    },
  });

  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Preencha e-mail e senha");
      setLoading(false);
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (err: any) {
      console.error('❌ Erro capturado:', err);
      setError(err.message || 'Erro ao fazer login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <Shield size={48} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">DEGASE</h1>
          <p className="text-gray-600">Painel Administrativo</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex gap-2">
            <AlertCircle size={18} className="text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleLocalLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail size={16} className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Lock size={16} className="inline mr-2" />
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
