import { Button } from '@/components/ui/button';
import { Newspaper, Users, Video, Building, FileText, Briefcase, Download, Eye, AlertTriangle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { data: posts } = trpc.posts.list.useQuery();
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: documents } = trpc.documents.list.useQuery();
  const { data: videos } = trpc.videos.list.useQuery();
  const { data: units } = trpc.units.list.useQuery();
  const { data: services } = trpc.services.getAll.useQuery();

  // Contador Notícias: Todos os posts (não só published)
  const newsCount = posts?.length || 0;
  const categoriesCount = categories?.length || 0;
  const documentsCount = documents?.length || 0;
  const videosCount = videos?.length || 0;
  const unitsCount = units?.length || 0;
  const servicesCount = services?.length || 0;

  // Rascunhos para alerta
  const drafts = posts?.filter(p => p.status === 'draft') || [];

  // Últimas 5 Notícias (todos)
  const last5Posts = posts?.slice(-5).reverse() || [];

  // Últimos 5 Documentos
  const last5Documents = documents?.slice(-5).reverse() || [];

  // Últimos 5 Serviços
  const last5Services = services?.slice(-5).reverse() || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--degase-blue-dark)' }}>Dashboard Administrativo</h1>

      {/* Stats Grid - Adicionado Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4" style={{ borderLeftColor: 'var(--degase-blue-light)' }}>
          <Newspaper className="h-8 w-8 text-blue-500 mb-2" />
          <p className="text-sm text-gray-600">Notícias</p>
          <p className="text-2xl font-bold">{newsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4" style={{ borderLeftColor: 'var(--degase-blue-light)' }}>
          <Users className="h-8 w-8 text-green-500 mb-2" />
          <p className="text-sm text-gray-600">Categorias</p>
          <p className="text-2xl font-bold">{categoriesCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4" style={{ borderLeftColor: 'var(--degase-blue-light)' }}>
          <FileText className="h-8 w-8 text-purple-500 mb-2" />
          <p className="text-sm text-gray-600">Documentos</p>
          <p className="text-2xl font-bold">{documentsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4" style={{ borderLeftColor: 'var(--degase-blue-light)' }}>
          <Video className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-sm text-gray-600">Vídeos</p>
          <p className="text-2xl font-bold">{videosCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4" style={{ borderLeftColor: 'var(--degase-blue-light)' }}>
          <Building className="h-8 w-8 text-orange-500 mb-2" />
          <p className="text-sm text-gray-600">Unidades</p>
          <p className="text-2xl font-bold">{unitsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4" style={{ borderLeftColor: 'var(--degase-blue-light)' }}>
          <Briefcase className="h-8 w-8 text-teal-500 mb-2" />
          <p className="text-sm text-gray-600">Serviços</p>
          <p className="text-2xl font-bold">{servicesCount}</p>
        </div>
      </div>

      {/* Alerta de Rascunhos */}
      {drafts.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
          <p className="text-yellow-800">Existem {drafts.length} rascunho(s) pendente(s).</p>
        </div>
      )}

      {/* Últimas 5 Notícias Publicadas */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--degase-blue-dark)' }}>Últimas 5 Notícias Publicadas</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Autor</th>
              <th className="px-4 py-2 text-left">Visibilidade</th>
              <th className="px-4 py-2 text-left">Views</th>
            </tr>
          </thead>
          <tbody>
            {last5Posts.map((post) => (
              <tr key={post.id} className="border-b">
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2">{format(new Date(post.createdAt), 'dd/MM/yyyy')}</td>
                <td className="px-4 py-2">{post.author || 'Desconhecido'}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${post.visibility === 'both' ? 'bg-blue-100 text-blue-800' : post.visibility === 'site' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {post.visibility === 'both' ? 'Ambos' : post.visibility === 'site' ? 'Site' : 'Intranet'}
                  </span>
                </td>
                <td className="px-4 py-2">{post.views || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Últimos 5 Documentos Adicionados */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--degase-blue-dark)' }}>Últimos 5 Documentos Adicionados</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Visibilidade</th>
              <th className="px-4 py-2 text-left">Downloads</th>
            </tr>
          </thead>
          <tbody>
            {last5Documents.map((doc) => (
              <tr key={doc.id} className="border-b">
                <td className="px-4 py-2">{doc.name}</td>
                <td className="px-4 py-2">{format(new Date(doc.createdAt), 'dd/MM/yyyy')}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${doc.visibility === 'both' ? 'bg-blue-100 text-blue-800' : doc.visibility === 'site' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {doc.visibility === 'both' ? 'Ambos' : doc.visibility === 'site' ? 'Site' : 'Intranet'}
                  </span>
                </td>
                <td className="px-4 py-2">{doc.downloads || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Últimos 5 Serviços Adicionados */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--degase-blue-dark)' }}>Últimos 5 Serviços Adicionados</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Visibilidade</th>
              <th className="px-4 py-2 text-left">Cliques</th>
            </tr>
          </thead>
          <tbody>
            {last5Services.map((service) => (
              <tr key={service.id} className="border-b">
                <td className="px-4 py-2">{service.name}</td>
                <td className="px-4 py-2">{format(new Date(service.createdAt), 'dd/MM/yyyy')}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${service.visibility === 'both' ? 'bg-blue-100 text-blue-800' : service.visibility === 'site' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {service.visibility === 'both' ? 'Ambos' : service.visibility === 'site' ? 'Site' : 'Intranet'}
                  </span>
                </td>
                <td className="px-4 py-2">{service.clicks || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card de Auditoria */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--degase-blue-dark)' }}>Auditoria (Estrutura Base)</h2>
        <p className="text-gray-600">Card vazio para implementação futura de auditoria.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;