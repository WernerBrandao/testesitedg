import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth'; // Assumindo que existe

type Post = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  cover: string;
  highlight: boolean;
  responsible: string;
  visibility: 'site' | 'intranet' | 'both';
  content: string;
  createdAt: Date;
  views: number;
};

type User = {
  id: string;
  name: string;
  role: 'admin' | 'contributor' | 'user';
};

const AdminPosts = () => {
  const { user } = useAuth(); // Usuário logado
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    status: 'draft' as Post['status'],
    cover: '',
    highlight: false,
    responsible: user?.id || '',
    visibility: 'site' as Post['visibility'],
    content: '',
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');

  const { data: posts = [] } = trpc.posts.list.useQuery({ visibility: 'both' });
  const { data: categories = [] } = trpc.categories.list.useQuery();
  const { data: users = [] } = trpc.users.listUsers.useQuery();
  const createMutation = trpc.posts.create.useMutation({
    onSuccess: () => {
      toast.success('Post criado!');
      setShowEditor(false);
      resetForm();
    },
    onError: (error) => toast.error(`Erro: ${error.message}`),
  });
  const updateMutation = trpc.posts.update.useMutation({
    onSuccess: () => {
      toast.success('Post atualizado!');
      setShowEditor(false);
      resetForm();
    },
    onError: (error) => toast.error(`Erro: ${error.message}`),
  });
  const deleteMutation = trpc.posts.delete.useMutation({
    onSuccess: () => toast.success('Post deletado!'),
    onError: (error) => toast.error(`Erro: ${error.message}`),
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Placeholder.configure({ placeholder: 'Digite o conteúdo aqui...' }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const filteredUsers = users.filter(u => u.role === 'admin' || u.role === 'contributor');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Arquivo deve ser menor que 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error('Apenas JPG, PNG ou WebP');
        return;
      }
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadCover = async () => {
    if (!coverFile) return formData.cover;
    const formDataUpload = new FormData();
    formDataUpload.append('file', coverFile);
    const response = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
    if (!response.ok) throw new Error('Upload falhou');
    const { url } = await response.json();
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subtitle || !formData.category || !editor?.getHTML()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    try {
      const coverUrl = await uploadCover();
      const data = { ...formData, cover: coverUrl, content: editor.getHTML() };
      if (editingPost) {
        await updateMutation.mutateAsync({ id: editingPost.id, ...data });
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (error) {
      toast.error('Erro ao salvar post');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      subtitle: post.subtitle || '',
      category: post.category,
      status: post.status,
      cover: post.cover,
      highlight: post.highlight,
      responsible: post.responsible,
      visibility: post.visibility,
      content: post.content,
    });
    setCoverPreview(post.cover);
    editor?.commands.setContent(post.content);
    setShowEditor(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Confirmar exclusão?')) {
      deleteMutation.mutate({ id });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      category: '',
      status: 'draft',
      cover: '',
      highlight: false,
      responsible: user?.id || '',
      visibility: 'site',
      content: '',
    });
    setCoverFile(null);
    setCoverPreview('');
    editor?.commands.setContent('');
    setEditingPost(null);
  };

  const getStatusBadge = (status: Post['status']) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
    };
    const labels = {
      draft: 'Rascunho',
      published: 'Publicado',
      archived: 'Arquivado',
      scheduled: 'Agendado',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>{labels[status]}</span>;
  };

  const getVisibilityLabel = (vis: Post['visibility']) => {
    const labels = { site: 'Site', intranet: 'Intranet', both: 'Ambos' };
    return labels[vis];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--degase-blue-dark)' }}>Gerenciar Posts</h1>
        <Button onClick={() => { setShowEditor(true); resetForm(); }} style={{ backgroundColor: 'var(--degase-blue-dark)' }}>
          <Plus className="w-4 h-4 mr-2" /> Novo Post
        </Button>
      </div>

      {showEditor ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título *</label>
              <Input value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtítulo *</label>
              <Input value={formData.subtitle} onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Responsável</label>
              <select value={formData.responsible} onChange={(e) => setFormData(prev => ({ ...prev, responsible: e.target.value }))} className="w-full p-2 border rounded" required>
                <option value="">Selecione</option>
                {filteredUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Categoria *</label>
              <select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="w-full p-2 border rounded" required>
                <option value="">Selecione</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Capa</label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {coverPreview && <img src={coverPreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Visibilidade</label>
              <select value={formData.visibility} onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value as Post['visibility'] }))} className="w-full p-2 border rounded">
                <option value="site">Site</option>
                <option value="intranet">Intranet</option>
                <option value="both">Ambos</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select value={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Post['status'] }))} className="w-full p-2 border rounded">
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
              <option value="scheduled">Agendado</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" checked={formData.highlight} onChange={(e) => setFormData(prev => ({ ...prev, highlight: e.target.checked }))} className="mr-2" />
              Destaque
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Conteúdo</label>
            <div className="border rounded p-2 bg-white">
              <div className="flex flex-wrap gap-2 mb-2">
                <Button onClick={() => editor?.chain().focus().toggleBold().run()} variant={editor?.isActive('bold') ? 'default' : 'outline'} size="sm">Negrito</Button>
                <Button onClick={() => editor?.chain().focus().toggleItalic().run()} variant={editor?.isActive('italic') ? 'default' : 'outline'} size="sm">Itálico</Button>
                <Button onClick={() => editor?.chain().focus().toggleUnderline().run()} variant={editor?.isActive('underline') ? 'default' : 'outline'} size="sm">Sublinhado</Button>
                <Button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} variant={editor?.isActive('heading', { level: 1 }) ? 'default' : 'outline'} size="sm">H1</Button>
                <Button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} variant={editor?.isActive('heading', { level: 2 }) ? 'default' : 'outline'} size="sm">H2</Button>
                <Button onClick={() => editor?.chain().focus().setTextAlign('left').run()} variant={editor?.isActive({ textAlign: 'left' }) ? 'default' : 'outline'} size="sm">Esquerda</Button>
                <Button onClick={() => editor?.chain().focus().setTextAlign('center').run()} variant={editor?.isActive({ textAlign: 'center' }) ? 'default' : 'outline'} size="sm">Centro</Button>
                <Button onClick={() => editor?.chain().focus().setTextAlign('right').run()} variant={editor?.isActive({ textAlign: 'right' }) ? 'default' : 'outline'} size="sm">Direita</Button>
                <Button onClick={() => {
                  const url = prompt('URL da imagem');
                  if (url) editor?.chain().focus().setImage({ src: url }).run();
                }} size="sm">Imagem</Button>
              </div>
              <EditorContent editor={editor} className="min-h-[200px] p-2" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" style={{ backgroundColor: 'var(--degase-blue-dark)' }}>Salvar</Button>
            <Button type="button" variant="outline" onClick={() => { setShowEditor(false); resetForm(); }}>Cancelar</Button>
          </div>
        </form>
      ) : (
        <table className="w-full bg-white border rounded overflow-hidden">
          <thead className="bg-[var(--degase-blue-dark)] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Responsável</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Views</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center gap-2">
                  {post.highlight && <Star className="w-4 h-4 text-yellow-500" />}
                  {post.title}
                </td>
                <td className="px-4 py-2">{users.find(u => u.id === post.responsible)?.name || 'Desconhecido'}</td>
                <td className="px-4 py-2">{getStatusBadge(post.status)}</td>
                <td className="px-4 py-2">{format(new Date(post.createdAt), 'dd/MM/yyyy')}</td>
                <td className="px-4 py-2"><Eye className="inline w-4 h-4 mr-1" /> {post.views}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button onClick={() => handleEdit(post)} size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                  <Button onClick={() => handleDelete(post.id)} size="sm" variant="destructive"><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPosts;