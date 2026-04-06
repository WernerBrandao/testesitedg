import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MenuItem {
  id: number;
  label: string;
  linkType: "internal" | "external" | "category";
  internalPageId?: number;
  externalUrl?: string;
  parentId?: number;
  sortOrder: number;
  children?: MenuItem[];
}

interface DraggableMenuListProps {
  items: MenuItem[];
  onReorder: (items: MenuItem[]) => Promise<void>;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

export default function DraggableMenuList({
  items,
  onReorder,
  onEdit,
  onDelete,
}: DraggableMenuListProps) {
  const [isLoading, setIsLoading] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id.toString() === active.id);
    const newIndex = items.findIndex((i) => i.id.toString() === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    try {
      setIsLoading(true);

      const newOrder = arrayMove(items, oldIndex, newIndex);

      const reorderedItems = newOrder.map((item, index) => ({
        ...item,
        sortOrder: index,
      }));

      await onReorder(reorderedItems);
      toast.success("Menu reordenado com sucesso");
    } catch (err) {
      toast.error("Erro ao reordenar menu");
    } finally {
      setIsLoading(false);
    }
  };

  function SortableMenuItem({
    item,
    level = 0,
  }: {
    item: MenuItem;
    level?: number;
  }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({ id: item.id.toString() });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      marginLeft: `${level * 20}px`,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`p-3 mb-2 bg-white border rounded-lg transition-colors ${
          isDragging ? "bg-blue-50 border-blue-300" : "border-gray-200"
        }`}
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="cursor-grab active:cursor-grabbing">
              <GripVertical size={16} className="text-gray-400" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-gray-500">
                {item.linkType === "internal" && "Link Interno"}
                {item.linkType === "external" && "Link Externo"}
                {item.linkType === "category" && "Categoria"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(item)}
              disabled={isLoading}
            >
              <Edit2 size={14} />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(item.id)}
              disabled={isLoading}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>

        {item.children && item.children.length > 0 && (
          <div className="mt-2">
            {item.children.map((child) => (
              <SortableMenuItem
                key={child.id}
                item={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-4 rounded-lg bg-gray-50">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhum item de menu criado
            </p>
          ) : (
            items.map((item) => (
              <SortableMenuItem key={item.id} item={item} />
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}