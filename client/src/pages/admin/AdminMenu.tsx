import React, { useState, useMemo } from 'react';
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type MenuItem = {
  id: number;
  label: string;
  linkType?: "internal" | "external";
  internalPageId?: number;
  externalUrl?: string;
  parentId?: number;
  sortOrder: number;
  openInNewTab: boolean;
  isColumnTitle: boolean;
};

type FormData = {
  label: string;
  linkType: "internal" | "external";
  internalPageId?: number;
  externalUrl?: string;
  parentId?: number;
  sortOrder: number;
  openInNewTab: boolean;
  isColumnTitle: boolean;
};

function SortableItem({ 
  item, 
  onEdit, 
  onDelete,
  allItems
}: { 
  item: MenuItem; 
  onEdit: (item: MenuItem) => void; 
  onDelete: (id: number) => void;
  allItems: MenuItem[];
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const parentItem = item.parentId 
    ? allItems.find(i => i.id === item.parentId)
    : null;

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-2 border rounded">
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {parentItem && (
            <span className="text-xs text-gray-500">
              {parentItem.label} /
            </span>
          )}
          <p className="font-medium">{item.label}</p>
        </div>
        <p className="text-sm text-gray-500">
          {item.isColumnTitle ? "Título de Coluna" : (item.linkType === "internal" ? "Interno" : "Externo")}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => onDelete(item.id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function AdminMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<FormData>({
    label: "",
    linkType: "internal",
    internalPageId: undefined,
    externalUrl: "",
    parentId: undefined,
    sortOrder: 0,
    openInNewTab: false,
    isColumnTitle: false,
  });

  const { data: menuItems = [], refetch: refetchMenu } = trpc.menu.list.useQuery({});
  const { data: pages = [] } = trpc.pages.list.useQuery({});

  const createMutation = trpc.menu.create.useMutation({
    onSuccess: () => {
      toast.success("Item criado com sucesso!");
      refetchMenu();
      setIsModalOpen(false);
      resetForm();
    },
    onError: (error) => toast.error(`Erro ao criar: ${error.message}`),
  });

  const updateMutation = trpc.menu.update.useMutation({
    onSuccess: () => {
      toast.success("Item atualizado com sucesso!");
      refetchMenu();
      setIsModalOpen(false);
      resetForm();
    },
    onError: (error) => toast.error(`Erro ao atualizar: ${error.message}`),
  });

  const deleteMutation = trpc.menu.delete.useMutation({
    onSuccess: () => {
      toast.success("Item deletado com sucesso!");
      refetchMenu();
    },
    onError: (error) => toast.error(`Erro ao deletar: ${error.message}`),
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = menuItems.findIndex((item) => item.id === active.id);
      const newIndex = menuItems.findIndex((item) => item.id === over.id);
      const reorderedItems = arrayMove(menuItems, oldIndex, newIndex);
      reorderedItems.forEach((item, index) => {
        updateMutation.mutate({ id: item.id, sortOrder: index });
      });
    }
  };

  const resetForm = () => {
    setFormData({
      label: "",
      linkType: "internal",
      internalPageId: undefined,
      externalUrl: "",
      parentId: undefined,
      sortOrder: 0,
      openInNewTab: false,
      isColumnTitle: false,
    });
    setEditingItem(null);
  };

  const handleSubmit = () => {
    if (!formData.label.trim()) {
      toast.error("Label é obrigatório");
      return;
    }

    if (!formData.isColumnTitle) {
      if (formData.linkType === "internal" && !formData.internalPageId) {
        toast.error("Página interna é obrigatória para links internos");
        return;
      }
      if (formData.linkType === "external" && !formData.externalUrl.trim()) {
        toast.error("URL externa é obrigatória para links externos");
        return;
      }
    }

    const payload = {
      label: formData.label,
      linkType: formData.isColumnTitle ? "external" : formData.linkType,
      internalPageId: formData.internalPageId,
      externalUrl: formData.isColumnTitle ? "https://rj.gov.br/degase" : formData.externalUrl,
      parentId: formData.parentId || null,
      sortOrder: formData.sortOrder,
      openInNewTab: formData.openInNewTab,
      isColumnTitle: formData.isColumnTitle,
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      linkType: item.linkType || "internal",
      internalPageId: item.internalPageId,
      externalUrl: item.externalUrl || "",
      parentId: item.parentId,
      sortOrder: item.sortOrder,
      openInNewTab: item.openInNewTab,
      isColumnTitle: item.isColumnTitle,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja deletar este item?")) {
      deleteMutation.mutate({ id });
    }
  };

  const parentOptions = useMemo(() => {
    return menuItems.map((item) => ({ value: item.id.toString(), label: item.label }));
  }, [menuItems]);

  const pageOptions = useMemo(() => {
    return pages.map((page) => ({ value: page.id.toString(), label: page.title }));
  }, [pages]);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Menu</CardTitle>
          <CardDescription>Adicione, edite e reordene itens do menu.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => { resetForm(); setIsModalOpen(true); }} className="mb-4">
            Adicionar Item
          </Button>

          {menuItems.length === 0 ? (
            <p className="text-gray-500">Nenhum item de menu encontrado. Adicione o primeiro item.</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={menuItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <SortableItem 
                      key={item.id} 
                      item={item} 
                      onEdit={handleEdit} 
                      onDelete={handleDelete}
                      allItems={menuItems}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingItem ? "Editar Item" : "Adicionar Item"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* ✅ PRIMEIRO: É título de coluna */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isColumnTitle"
                    checked={formData.isColumnTitle}
                    onCheckedChange={(checked) => {
                      setFormData({ 
                        ...formData, 
                        isColumnTitle: !!checked,
                        linkType: !!checked ? "external" : formData.linkType,
                        externalUrl: !!checked ? "https://rj.gov.br/degase" : formData.externalUrl,
                      })
                    }}
                  />
                  <label htmlFor="isColumnTitle" className="text-sm font-medium">É título de coluna</label>
                </div>

                {/* SEGUNDO: Label */}
                <div>
                  <label htmlFor="label" className="block text-sm font-medium mb-1">Label *</label>
                  <Input
                    id="label"
                    placeholder="Digite o label"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  />
                </div>

                {/* ✅ OCULTAR quando isColumnTitle = true */}
                {!formData.isColumnTitle && (
                  <>
                    {/* Tipo de Link */}
                    <div>
                      <label htmlFor="linkType" className="block text-sm font-medium mb-1">Tipo de Link *</label>
                      <Select
                        value={formData.linkType}
                        onValueChange={(value: "internal" | "external") => setFormData({ ...formData, linkType: value })}
                      >
                        <SelectTrigger id="linkType">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="internal">Interno</SelectItem>
                          <SelectItem value="external">Externo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Página Interna */}
                    {formData.linkType === "internal" && (
                      <div>
                        <label htmlFor="internalPageId" className="block text-sm font-medium mb-1">Página Interna *</label>
                        <Select
                          value={formData.internalPageId?.toString() || ""}
                          onValueChange={(value) => setFormData({ ...formData, internalPageId: parseInt(value) })}
                        >
                          <SelectTrigger id="internalPageId">
                            <SelectValue placeholder="Selecione uma página" />
                          </SelectTrigger>
                          <SelectContent>
                            {pageOptions.map((page) => (
                              <SelectItem key={page.value} value={page.value}>
                                {page.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* URL Externa */}
                    {formData.linkType === "external" && (
                      <div>
                        <label htmlFor="externalUrl" className="block text-sm font-medium mb-1">URL Externa *</label>
                        <Input
                          id="externalUrl"
                          placeholder="https://exemplo.com"
                          value={formData.externalUrl}
                          onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Pai (opcional) */}
                    <div>
                      <label htmlFor="parentId" className="block text-sm font-medium mb-1">Pai (opcional)</label>
                      <Select
                        value={formData.parentId?.toString() || ""}
                        onValueChange={(value) => setFormData({ ...formData, parentId: value ? parseInt(value) : undefined })}
                      >
                        <SelectTrigger id="parentId">
                          <SelectValue placeholder="Selecione um pai" />
                        </SelectTrigger>
                        <SelectContent>
                          {parentOptions.map((parent) => (
                            <SelectItem key={parent.value} value={parent.value}>
                              {parent.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Abrir em nova aba */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="openInNewTab"
                    checked={formData.openInNewTab}
                    onCheckedChange={(checked) => setFormData({ ...formData, openInNewTab: !!checked })}
                  />
                  <label htmlFor="openInNewTab" className="text-sm font-medium">Abrir em nova aba</label>
                </div>

                {/* Botão Salvar */}
                <Button onClick={handleSubmit} disabled={createMutation.isLoading || updateMutation.isLoading}>
                  {editingItem ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}